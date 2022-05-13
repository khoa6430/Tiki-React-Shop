import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { onValue, ref } from 'firebase/database';
import { db } from '../firebase';
import logouser from '../../src/img/logouser.png';
const userApi = {
    getMe:()=>{
        //TODO : CALL API to get current user 
        return new Promise((resolve,reject)=>{
            // reject(new Error('MY CUSTOM ERROR'));
            // return;
            //Wait 500ms -> return result
            setTimeout (()=>{
                const currentUser = firebase.auth().currentUser;

                resolve({
                    id:currentUser.uid,
                    name:currentUser.displayName,
                    email:currentUser.email,
                    photoUrl: currentUser.photoURL,
                    addressUser : '',
                    phoneUser :null
                },50)
            },50);

        })
    },
    getMe2(userLogin){
        //TODO : CALL API to get current user 
        return new Promise((resolve,reject)=>{
            // reject(new Error('MY CUSTOM ERROR'));
            // return;
            //Wait 500ms -> return result
            setTimeout (()=>{
                // var currentUser;
                // async function getUserCurent() {
                //     await onValue(
                //       ref(db, `/list-user`),
                //       (snapshot) => {
                //         const data = snapshot.val();
                //         if (data != null) {
                //           Object.values(data).map((item) => {

                //           });   
                    
                //         }
                //       },
                //       {
                //         onlyOnce: true,
                //       }
                //     );
                //   }
                //   getUserCurent();
                resolve({
                    id:userLogin.id,
                    name:userLogin.name,
                    email:userLogin.email,
                    photoUrl: userLogin.photoURL,
                    addressUser : {logouser},
                    phoneUser :null
                },50)
                
            },50);

        })
    }
}

export default userApi;