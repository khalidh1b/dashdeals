const admin = require('firebase-admin');
const serviceAccount = require('./dashdeals-8226d-firebase-adminsdk-4xidd-ba62189299.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;