'use strict';

const {Sequelize, sequelize} = require('../service/db');

let processors = {};
let transactions = {};

// creation (only for transaction)
transactions.create = async (req, res) => {
    try {
        const body = req.body;
        console.log(body);
        let transact;
        switch(body.type){
            case 'Sale': 
                transact = await db.Transaction.create({
                    "ref_no": body.ref_no,
                    "amount": body.amount
                })
                break;
            case 'Void':
                transact = await db.sequelize.query(
                    `DELETE FROM transactions\n` +
                    `WHERE ref_no=${body.ref_no} AND amount=${body.amount}`
                )
                break;
            default:
        }

        res.send(transact);
    } catch (err) {
        res.sendStatus(401);
    }
}

processors.retrieve = async (req, res) => {
    try {
        let all_processors = await db.sequelize.query(
            'SELECT * FROM processor'
        );
        let all_transactions = await db.sequelize.query(
            'SELECT * FROM transactions'
        );
        all_processors[0] = all_processors[0].map((proc) => {
            proc.revenue = all_transactions[0].reduce((rev, tran) => {
                if(tran.amount < 50){
                    return rev + (proc.small_flat + tran.amount * proc.small_pct)
                } else {
                    return rev + (proc.large_flat + tran.amount * proc.large_pct)
                }
            },0)
            return proc;
        })
        all_processors[0] = all_processors[0].sort((a,b) => (b.revenue - a.revenue))
        res.send(all_processors[0]);
    } catch (err) {
        console.log("Error is Processor: " + err);
        res.sendStatus(400);
    }
};

transactions.retrieve = async (req, res) => {
    try {
        const refNo = req.query.refNo;
        let transact;
        if(refNo){
            transact = await db.sequelize.query(
                'SELECT * FROM transactions\n' +
                `WHERE ref_no=${refNo}\n`
            );
        } else {
            transact = await db.sequelize.query(
                'SELECT * FROM transactions\n' +
                'ORDER BY ref_no'
            );
        }
        res.send(transact[0]);
    } catch (err) {
        console.log("Error is Transaction: " + err);
        res.sendStatus(400);
    }
};

transactions.delete = async ( req, res ) => {
    try{
        const transactId = req.query.transact_id;
        let del;
        if(transactId){
            del = await db.sequelize.query(
                'DELETE FROM transactions\n' +
                `WHERE id=${transactId}`,
            );
        } else {
            del = await db.sequelize.query(
                `DELETE FROM transactions`
            )
        }
        res.send(del[0])
    } catch(err){
        console.log("Error is Delete" + err);
        res.sendStatus(400);
    }
}

module.exports = { 
    processors,
    transactions
}