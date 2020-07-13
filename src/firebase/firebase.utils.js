import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBX7Ux4zlRSiAC1CVy9yEz-GkyJFMSVDOE",
    authDomain: "neosoft-ecom-db.firebaseapp.com",
    databaseURL: "https://neosoft-ecom-db.firebaseio.com",
    projectId: "neosoft-ecom-db",
    storageBucket: "neosoft-ecom-db.appspot.com",
    messagingSenderId: "132233522390",
    appId: "1:132233522390:web:0c62987347714e8dcf6d77",
    measurementId: "G-KJZL28QCGG"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
      if(!userAuth) {
          return;
      }
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();

      if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
          });
        } catch(err) {
          console.log("Error creating user", err);
        }
      }

      return userRef;

    //   console.log(firestore.doc('/users/ajdsjhdjhjs'));
  };

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      console.log(newDocRef);

      batch.set(newDocRef, obj);
    });

    return await batch.commit();
  }

  export const convertCollectionSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(documentObj => {
      const {title, items} = documentObj.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: documentObj.id,
        title, 
        items
      }
    })

    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    },{})
  }


  export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
      }, reject)
    });
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;
