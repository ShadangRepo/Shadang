const { DocumentNotExistMessage } = require("../utils/constants");
const firebase = require("./firebaseConfig");
const { getFirestore, collection, getDocs, where, query, doc, getDoc } = require('firebase/firestore');
const db = getFirestore(firebase);

const create = (tableName, data) => {
    return new Promise((resolve) => {
        const collection = collection(db, tableName);
        collection.add({ ...data, createdAt: firebase.firestore.Timestamp.fromDate(new Date()) }).then(docRef => {
            docRef.get().then((querySnapshot) => {
                resolve({ success: true, data: { id: docRef.id, ...querySnapshot.data() } })
            }).catch(error => {
                resolve({ success: false, message: `${error}` })
            })

        }).catch(err => {
            resolve({ success: false, message: `${err}` })
        });
    })
}

const readDocBasedOnId = async (tableName, id) => {
    return new Promise(async (resolve) => {
        try {
            const docRef = doc(db, tableName, id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                resolve({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
            } else {
                resolve({ success: false, message: DocumentNotExistMessage });
            }
        } catch (err) {
            resolve({ success: false, message: `${err}` })
        }
    })
}

const conditionBasedReadOne = (tableName, lhs, condition, rhs) => {
    // lhs and rhs are left hand side and right hand side of condition
    // lhs2, condition2, rhs2 are optional parameters
    // condition is string that can be any of <,>,<=,>=,==,!=,in, not-in,array-contains-any,array-contains. 
    // Reference https://firebase.google.com/docs/firestore/query-data/queries

    return new Promise(async (resolve) => {
        const tableRef = collection(db, tableName);
        let q = query(tableRef, where(lhs, condition, rhs))

        let response = [];
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log("doc", doc)
            // doc.data() is never undefined for query doc snapshots
            response.push({ id: doc.id, ...doc.data() })
        });
        if (response.length > 0) {
            resolve({ success: true, data: response[0] })
        } else {
            resolve({ success: false, message: DocumentNotExistMessage })
        }
    })
}

const batchCreate = (tableName, data) => {
    //data is expected to be array of objects
    return new Promise((resolve) => {
        var batch = db.batch()
        data.forEach((doc) => {
            var docRef = db.collection(tableName).doc(); //automatically generate unique id
            batch.set(docRef, doc);
        });
        batch.commit().then(() => {
            resolve({ success: true, data: {}, message: "Records created successfully" })
        }).catch(err => {
            resolve({ success: false, message: `${err}` })
        });
    })
}

const conditionBassedReadAll = (tableName, lhs, condition, rhs, lhs2, condition2, rhs2) => {
    // lhs and rhs are left hand side and right hand side of condition
    // lhs2, condition2, rhs2 are optional parameters
    // condition is string that can be any of <,>,<=,>=,==,!=,in, not-in,array-contains-any,array-contains. 
    // Reference https://firebase.google.com/docs/firestore/query-data/queries

    return new Promise((resolve) => {
        const collection = db.collection(tableName);
        let query = collection;

        // append optional condition if exist. this will make logical AND operation
        if (lhs && condition && rhs) {
            query = query.where(lhs, condition, rhs)
        }
        if (lhs2 && condition2 && rhs2) {
            query = query.where(lhs2, condition2, rhs2)
        }


        query.get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    resolve({ success: true, data: [] })
                } else {
                    let data = [];
                    querySnapshot.forEach(doc => {
                        data.push({ id: doc.id, ...doc.data() })
                    });
                    resolve({ success: true, data: data })
                }
            }).catch(err => {
                resolve({ success: false, message: `${err}` })
            });
    })
}

const update = async (tableName, id, payload) => {
    return new Promise(async (resolve) => {
        try {
            const query = db.collection(tableName).doc(id);
            await query.update(payload);
            resolve({ success: true, data: { id } })
        } catch (err) {
            resolve({ success: false, message: `${err}` })
        }
    })
}

module.exports = {
    create,
    conditionBasedReadOne,
    batchCreate,
    conditionBassedReadAll,
    readDocBasedOnId,
    update
}