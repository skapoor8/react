const  { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb://localhost/issuetracker';

function testWithCallbacks(callback) {
    console.log('\n--- testWithCallbacks ---');
    const client  = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function(err, client) {
        if (err) {
            callback(err);
            return;
        }
        console.log('Connected to MongoDB', url);

        const db = client.db();
        const collection = db.collection('employees');

        const employee = {id: 2, name: 'B. Fallback', age: 81 };
        collection.insertOne(employee, function(err, result) {
            if (err) {
                client.close();
                callback(err);
                return;
            }
            console.log('Result of insert:\n', result.insertedId);
            collection.find({ _id: result.insertedId}).toArray(function(err, docs) {
                if (err) {
                    client.close();
                    callback(err);
                    return;
                }
                console.log('Result of find:\n', docs);
                client.close();
                callback(err);
            });
        });
    });
}

testWithCallbacks(function(err) {
    if (err) {
        console.log(err);
    }
    testWithAsync();
});

async function testWithAsync() {
    console.log('\n--- testWithAsync ---');
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});
    try {
        await client.connect();
        console.log('Connected to MongoDB', url);
        const db = client.db();
        const collection = db.collection('employees');

        const employee = { id: 3, name: 'C. Senor', age: 16 };
        const result = await collection.insertOne(employee);
        console.log('Result of insert:\n', result.insertedId);
        const docs = await collection.find({ _id: result.insertedId }).toArray();
        console.log('Result of find:\n', docs);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}