const firebase = require("./firebaseConfig");
const db = firebase.firestore();

const create = (tableName, data) => {
    return new Promise((resolve) => {
        const collection = db.collection(tableName);
        collection.add(data).then(docRef => {
            resolve({ success: true, id: docRef.id })
        }).catch(err => {
            resolve({ success: false, message: err })
        });
    })
}

module.exports = {
    create
}