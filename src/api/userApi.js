import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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
    }
}

export default userApi;