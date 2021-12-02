import firebase from 'firebase/app';
import 'firebase/firestore'
require('firebase/auth')
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC-Hzg9riy9kFC8Zt2H2kPNtbRAO7B4OGg",
    authDomain: "vue-organizer-e5780.firebaseapp.com",
    projectId: "vue-organizer-e5780",
    storageBucket: "vue-organizer-e5780.appspot.com",
    messagingSenderId: "406815648252",
    appId: "1:406815648252:web:465c3685bf1ac7fc592a79",
    measurementId: "G-Y9199HZCKH"
};

const initFirebase = firebase.initializeApp(firebaseConfig).firestore();
const timestamp =  firebase.firestore.FieldValue.serverTimestamp;

export {timestamp, initFirebase};

export default class Firebase {

    register = async (email, password, login)=> {
        await firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(data => {
                initFirebase.collection('users').doc(data.user.uid)
                    .set({
                        participationEvents: []
                    });
                data.user
                    .updateProfile({
                        displayName: login
                    })
                    .then(() => {});
            })

    }

    login = async (email, password)=> {
        return await firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(data => {
                console.log(data.user.uid);
               return {
                   email: data.user.email,
                   login: data.user.displayName,
                   id: data.user.uid,
               }
            })

    }

    getAllEvents = async ()=> {
        return await initFirebase.collection('events').get().then(snapshot => {
            const data = [];
            snapshot.forEach(doc => {

                data.push(doc.data())
            })
            return data;
        })
    }

    getEventByID = async (eventID)=> {
        return await initFirebase.collection('events')
            .where('id', '==', eventID)
            .get().then(snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                data.push(doc.data())
            })
            return data;
        })
    }

    addEvent = async (newEventObj, type)=> {
        if(type === 'add'){
            await initFirebase.collection('events').doc().set({...newEventObj})
        }
        else if(type === 'change'){
            await initFirebase.collection('events')
                .where('id','==',newEventObj.id)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(async(doc) => {
                        const eventsRef = initFirebase.collection('events').doc(doc.id);
                        await eventsRef.update({...newEventObj});
                    });
                });

        }

    }

    deleteEvent = async(id)=> {
        const query = initFirebase.collection('events').where('id','==',id);
        await query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        });
    }

    addParticipationEvent = async (userID, eventID)=> {
        const usersRef = initFirebase.collection('users').doc(userID);
        await usersRef.update({
            participationEvents: firebase.firestore.FieldValue.arrayUnion(eventID)
        });
    }

    removeParticipationEvent = async (userID, eventID)=> {
        const usersRef = initFirebase.collection('users').doc(userID);
        await usersRef.update({
            participationEvents: firebase.firestore.FieldValue.arrayRemove(eventID)
        });
    }

    getParticipationEvent = async (userID)=> {
        const usersRef = initFirebase.collection('users').doc(userID);
        return await usersRef.get().then(snapshot => snapshot.data())
    }

    addImageToStorage = async (file, imgName)=> {
        const fileExt = file.match(/(?<=data:image\/)(.*?)(?=;)/m)[0];
        const fullName = `images/${imgName}.${fileExt}`;
        const storageRef = firebase.storage().ref(fullName);
        return await storageRef
            .putString(file.split(',')[1], "base64", {contentType: `image/${fileExt}`})
            .then(() => {
                return storageRef.getDownloadURL()
                    .then((url) => url)
            })

    }
}
