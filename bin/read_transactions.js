#!/usr/bin/env node

const fs = require('fs');
const xml2js = require('xml2js');
const axios = require('axios').default;

const parser = new xml2js.Parser();

const url = 'http://localhost:3000';

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

const delete_sales = async () =>{
    return axios.delete(`${url}/transaction`);
}

const send_transactions = async (path) =>{
    const sales_data_raw = fs.readFileSync(__dirname + path);
    const sales_data = await new Promise((resolve, reject) => {
        parser.parseString(sales_data_raw, (err, data) => {
            res = data.transactions.tran.map(transact => ({
                "type": transact.type[0],
                "amount": Number(transact.amount[0]),
                "ref_no": transact.refNo[0]
            }))
            if (err) reject(err);
            else resolve(res);
        })
    })

    console.log(sales_data);
    sales_data.map(async (sale) => {
        const sale_response = await axios.post(`${url}/transaction`, sale)
        console.log(sale_response.data);
    })

    const provider_data = await axios.get(`${url}/processor`);
    console.log(provider_data.data);

    return provider_data;
}

const run_transactions = async () => {
    await delete_sales();
    await send_transactions('/raw_data/Transactions_Sales.xml');
    await send_transactions('/raw_data/Transactions_Voids.xml');
}

run_transactions()
