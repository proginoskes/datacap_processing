# Datacap Systems Evaluation

This is the evaluation for a full-stack developer role at Datacap Systems in Philadelphia, PA.
The program is based around measuring the performance of different transaction processing fee
schemes from three companies: TSYS, First Data, and EVO. I had 24 hours to complete this app
using a language of my choice. Three languages are preferred for this assignment: C#, Java,
and C++. I considered using C++, but decided I wanted to work on building this into a full-stack
web application. It would have been possible to do this in C++, but without many of the
conveniences of the Node.js environment. Instead of the three preferred languages, I chose
to do this assignment in JavaScript. This will allow me to more quickly and thoroughly express
my understanding of full-stack development and the creation of applications which combine
many layers of the web development stack.

## My Stack

I use a PERN stack for this project. That is to say, I implement a Postgres-based database, an Express.js
server, a React.js front-end model, and run all of this in a Node.js environment. I find the ability to 
use relational databases provided by PostgreSQL and Sequelize to far outweigh the elasticity of 
the more common MongoDB/Document-based model. Express.js is one of the quickest-to-implement server 
frameworks I have had the pleasure of using. React makes producing a GUI very simple and easy to manage,
and Node.js provides all of these in a concise and easily-deployable package.

## My Deliverable

The application is available to be built locally. To build it, you will need PostgreSQL and Node.js.
To install PostgreSQL, either use the installer available on the PostgreSQL [official site](https://www.postgresql.org/download/windows/), or use the commands below. These commands will only work if you have installed chocolatey, which you can get [here](https://chocolatey.org/install).

```
choco install postgresql14 --params '/Password:password /Port:5432' --ia '--enable-components server,commandlinetools'
```

If you do not have node, you can install it with `choco install nodejs` or by going to the official
nodejs [site](https://nodejs.org/en/download/). To install the rest of the dependencies simply run:
```
npm install
```

Once everything is installed, create two terminal instances. In one, start the terminal with
`npm start`. Then, in the other terminal, run `npm test:api`. The output is messy, but it shows
the appropriate behavior for the assignment.

## The Database

My database is fairly simple. I store Providers and Transactions in separate tables. The Provider table
begins in this exact state:
```
ID  NAME        SMALL_PCT   SMALL_FLAT  LARGE_PCT   LARGE_FLAT
1   TSYS        0.01        0.10        0.02        0.10
2   First Data  0.0125      0.08        0.01        0.90
3   EVO         0.011       0.09        0.015       0.20
```
For our purposes, we assume that these numbers will remain the same for the execution of our program.
However, we may implement functionality that allows authorized users the ability to edit these rates.

The Transactions table contains only ID's | which are equal to the 'refNo' specified in the XML files
| and amounts | which are also taken from the XML files. The transaction table looks like this:
```
ID      AMOUNT
<refNo> <amount>
```

## The Entrypoints

Queries to the server will allow requests that:
- add a sale
- void an existing transaction by refNo and value
- retrieve the ranked providers and their total revenues
- retrieve the existing transactions

This will enable both the passive rendering of rankings and the active addition of data.

