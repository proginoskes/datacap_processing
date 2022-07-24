#!/usr/bin/env node

const fs = require('fs');
const { parse, resolve } = require('path');
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
    try {
        let sales_data = await new Promise((resolve, reject) => {
            parser.parseString(sales_data_raw, (err, data) => {
                res = data.transactions.tran.map(transact => ({
                    "type": transact.type[0],
                    "amount": Number(transact.amount[0]),
                    "ref_no": Number(transact.refNo[0])
                }))
                if (err) reject(err);
                else resolve(res);
            })
        })
        console.log(sales_data);
        try{
            await Promise.all(
                sales_data.map(async (transact) => {
                    try{
                        await axios.post(`${url}/transaction`, transact)
                        try{
                            const transaction = await axios.get(`${url}/transaction?refNo=${transact.ref_no}`);
                            if(transaction.data[0]){
                                console.log(`ref no: ${transaction.data[0].ref_no}, amount: ${transaction.data[0].amount};`)
                            } else {
                                console.log(`TRANSACTION ${transact.ref_no} DELETED`)
                            }
                        } catch (err) {
                            console.log(err.message);
                        }
                    } catch (err) {
                        console.log(err.message);
                    }
                })
            )

            try {
                const provs = await axios.get(`${url}/processor`)
                console.log(provs.data)
            } catch (err) {
                console.log(err.message)
            }
        } catch (err) { 
            console.log(err.message)
        }    
    } catch (err) {
        console.log(err.message);
    }
}

const run_transactions = async () => {
    try{
        await delete_sales();
        try {
            console.log("##### SALES #####");
            await send_transactions('/raw_data/Transactions_Sales.xml');
            try{
                console.log("##### VOIDS #####");
                await send_transactions('/raw_data/Transactions_Voids.xml');
            } catch (err) {
                console.log(err.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    } catch (err) {
        console.log(err.message);
    }

    
}

run_transactions()
