/* 

*/

// IMPORTS 
const fs = require('fs');
require('dotenv').config();
const express = require('express');

const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } =  require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

// GLOBAL VARIABLES
const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';
const port = process.env.API_SERVER_PORT || 3000;

let db;

let aboutMessage = 'Issue Tracker API 1.0';

// GRAPHQL RESOLVERS AND FUNCTIONS

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
        return value.toISOString();
    },
    parseValue(value) {
        //return new Date(value);
        const dateValue = new Date(value);
        return isNaN(dateValue) ? undefined : dateValue;
    },
    parseLiteral(ast) {
        //return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
        if (ast.kind == Kind.STRING) {
            const value = new Date(ast.value);
            return isNaN(value) ? undefined : value;
        }
    },
});

const resolvers = {
    Query: {
        about: () => aboutMessage,
        issueList,
    },
    Mutation: {
        setAboutMessage,
        issueAdd,
    },
    GraphQLDate,
};

function validateIssue(_, { issue }) {
    const errors = [];
    if (issue.title.length < 3) {
        errors.push('Field "title" must be at least 3 characters long.');
    }
    if (issue.status == 'Assigned' && !issue.owner) {
        errors.push('Field "owner" is required when status is "Assigned".');
    }
    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', {errors});
    }
}

function setAboutMessage(_, { message }) {
    return aboutMessage = message;
}

async function issueList() {
    //return issuesDB;
    const issues = await db.collection('issues').find({}).toArray();
    return issues;
}

async function getNextSequence(name) {
    const result = await db.collection('counters').findOneAndUpdate(
        {_id: name },
        {$inc: {current: 1}},
        {returnOriginal: false},
    );
    //console.log(JSON.stringify(result));
    return result.value.current;
}

async function issueAdd(_, { issue }) {
    validateIssue(_, {issue});
    issue.created =  new Date();
    //issue.id = issuesDB.length + 1;
    //if (issue.status == undefined) issue.status = 'New';
    //issuesDB.push(issue);
    //return issue;
    issue.id = await getNextSequence('issues');
    const result = await db.collection('issues').insertOne(issue);
    const savedIssue = await db.collection('issues').findOne({_id: result.insertedId});
    return savedIssue;
}

// FUNCTION TO CONNECT TO MONGODB

async function connectToDb() {
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();
    console.log('Connected to MongoDB at', url);
    db = client.db();
}

// CREATE GRAPHQL SERVER

const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

// EXPRESS APP

const app = express();

const enableCors = (process.env.ENABLE_CORS || 'true') == 'true';
console.log('CORS setting:', enableCors);
// add graphql Middleware to express app
server.applyMiddleware({ app, path: '/graphql', cors: enableCors});

(async function () {
    try {
        await connectToDb();
        app.listen(port, function() {
        console.log(`API server started on port ${port}`);
        });
    } catch (err) {
        console.log('ERROR:', err);
    }
})();