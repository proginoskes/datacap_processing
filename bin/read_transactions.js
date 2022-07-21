#!/usr/bin/env node

const fs = require('fs');
const xml2js = require('xml2js');
const request = require('request');

const parser = new xml2js.Parser();
let data_for_api_call;

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


const readfiles_to_server = async () => {
    await request({
        method: 'DELETE',
        url:'http://localhost:3000/transaction',
    },(err, res) => {
        if(err) return console.error(err.message)
        console.log(res.body)
    })

    fs.readFile(__dirname + '/raw_data/Transactions_Sales.xml', (err,data) => {
        parser.parseString(data, (err, res) => {
            data_for_api_call =  res.transactions.tran.map((transact) => {
                const formatted_transact = {
                    "type": transact.type[0],
                    "amount": Number(transact.amount[0]),
                    "ref_no": transact.refNo[0]
                }
                return formatted_transact;
            })
            data_for_api_call.forEach(async (query) => {
                await request({
                    method: 'POST',
                    url:'http://localhost:3000/transaction',
                    headers : {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(query)
                }, (err, res) => {
                    if(err) return console.error(err.message)
                    console.log(res.body)
                })
            })
    
            request({
                method: 'GET',
                url:'http://localhost:3000/processor'
            }, (err, res) => {
                if(err) return console.error(err.message)
                console.log(res.body)
            })
        })
    })
    
    await sleep(3000);

    fs.readFile(__dirname + '/raw_data/Transactions_Voids.xml', (err,data) => {
        parser.parseString(data, (err, res) => {
            data_for_api_call = res.transactions.tran.map((transact) => {
                const formatted_transact = {
                    "type": transact.type[0],
                    "amount": Number(transact.amount[0]),
                    "ref_no": transact.refNo[0]
                }
                return formatted_transact;
            })
            data_for_api_call.forEach(async (query) => {
                await request({
                    method: 'POST',
                    url:'http://localhost:3000/transaction',
                    headers : {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(query)
                }, (err, res) => {
                    if(err) return console.error(err.message)
                    console.log(res.body)
                })
            })
    
            request({
                method: 'GET',
                url:'http://localhost:3000/processor'
            }, (err, res) => {
                if(err) return console.error(err.message)
                console.log(res.body)
            })
        })
    })
}

readfiles_to_server()