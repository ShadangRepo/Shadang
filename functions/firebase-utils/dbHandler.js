const { DocumentNotExistMessage, BatchOperationSuccessMessage } = require("../utils/constants");
const firebase = require("./firebaseConfig");
const {
    getFirestore,
    collection,
    getDocs,
    where,
    query,
    doc,
    getDoc,
    addDoc,
    writeBatch,
    updateDoc,
    Timestamp,
    setDoc
} = require('firebase/firestore');
const db = getFirestore(firebase);

const create = (tableName, data) => {
    return new Promise(async (resolve) => {
        const tableRef = collection(db, tableName);
        let dataToCreate = { ...data, createdAt: Timestamp.fromDate(new Date()), updatedAt: Timestamp.fromDate(new Date()) };
        delete dataToCreate.id;
        const docRef = await addDoc(tableRef, dataToCreate);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            resolve({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
        } else {
            resolve({ success: false, message: DocumentNotExistMessage });
        }
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
        const tableRef = collection(db, tableName);
        data.forEach(async (element) => {
            delete element.id;
            //this code needs to optimize. this is not batch operation. Firebase provides batch writes, but not batch create.need to check documentation.
            await addDoc(tableRef, { ...element, updatedAt: Timestamp.fromDate(new Date()), createdAt: Timestamp.fromDate(new Date()) });
        });
        resolve({ success: true, data: {}, message: BatchOperationSuccessMessage })
    })
}

const batchSet = (tableName, data) => {
    //data is expected to be array of objects
    //set will change only one key in object
    return new Promise(async (resolve) => {
        const batch = writeBatch(db);
        data.forEach(async (element) => {
            let docRef = doc(db, tableName, element.id);
            let dataToset = { ...element, updatedAt: Timestamp.fromDate(new Date()) };
            delete dataToset.id;
            delete dataToset.createdAt;
            batch.set(docRef, dataToset, { merge: true })
        });
        await batch.commit();
        resolve({ success: true, data: {}, message: BatchOperationSuccessMessage })
    })
}

const conditionBasedReadAll = (tableName, lhs, condition, rhs) => {
    return new Promise(async (resolve) => {
        const tableRef = collection(db, tableName);
        const q = query(tableRef, where(lhs, condition, rhs));

        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() })
        });
        resolve({ success: true, data: data });
    })
}

const update = async (tableName, id, payload) => {
    return new Promise(async (resolve) => {
        try {
            const docRef = doc(db, tableName, id);
            let dataToUpdate = { ...payload, updatedAt: Timestamp.fromDate(new Date()) }
            delete dataToUpdate.createdAt;
            delete dataToUpdate.id;
            await setDoc(docRef, dataToUpdate, { merge: true });
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
    conditionBasedReadAll,
    readDocBasedOnId,
    update,
    batchSet
}