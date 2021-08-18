const firebase = require("./firebaseConfig");
const db = firebase.firestore();

const create = (tableName, data) => {
    return new Promise((resolve) => {
        const collection = db.collection(tableName);
        collection.add(data).then(docRef => {
            resolve({ success: true, data: { id: docRef.id } })
        }).catch(err => {
            resolve({ success: false, message: err })
        });
    })
}

const conditionBassedReadOne = (tableName, lhs, condition, rhs, lhs2, condition2, rhs2) => {
    // lhs and rhs are left hand side and right hand side of condition
    // lhs2, condition2, rhs2 are optional parameters
    // condition is string that can be any of <,>,<=,>=,==,!=,in, not-in,array-contains-any,array-contains. 
    // Reference https://firebase.google.com/docs/firestore/query-data/queries

    return new Promise((resolve) => {
        const collection = db.collection(tableName);
        let query = collection.where(lhs, condition, rhs)

        // append optional condition if exist. this will make logical AND operation
        if (lhs2 && condition2 && rhs2) {
            query = query.where(lhs2, condition2, rhs2)
        }

        query.get()
            .then((querySnapshot) => {
                const firstRecord = { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() }
                resolve({ success: true, data: firstRecord })
            }).catch(err => {
                resolve({ success: false, message: "User not found" })
            });
    })
}

module.exports = {
    create,
    conditionBassedReadOne
}