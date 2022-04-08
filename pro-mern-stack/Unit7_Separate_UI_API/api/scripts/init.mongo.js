

db.issues.remove({});

const issuesDB = [
    {
        id: 1, status: 'New', owner: 'Sid', effort: 5,
        created: new Date('2020-02-06'), due: undefined,
        title: 'Give Bilbo a bath',
    },
    {
        id: 2, status: 'Assigned', owner: 'Julia', effort: 14,
        created: new Date('2020-02-8'), due: new Date('2020-02-18'),
        title: 'Take Honeybee to the vet',
    }
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.counters.remove({_id: 'issues'});
db.counters.insert({_id: 'issues', current: count});

db.issues.createIndex({id: 1}, {unique: true});
db.issues.createIndex({status: 1});
db.issues.createIndex({owner: 1});
db.issues.createIndex({created: 1});
