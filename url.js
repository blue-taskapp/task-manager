const GCClient = require("gcal");
const dir = './credentials.json';
const client = new GCClient(dir);
console.log(client.authUrl());
console.log('hello');