import {auth} from './firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth";


export function Authorize(){
    
    //Signup
    const registerUser = async(fullname,email,password) =>{

        const defaultprofileimg = "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjkzNy1hZXctMTY1LnBuZw.png"

        try{

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;      

            // console.log(user);

            updateProfile(user, {
                displayName: fullname, 
                photoURL: defaultprofileimg
            }).then(() => {

                // set name to localstorage
                setLocalName(fullname);

                // Redirect to index.html 
                window.location.href = "../index.html";

            })



        }catch(err){
            console.error("Error registration users : " , err);
        }

    }

    // Signin 
    const loginUser = (email,password) =>{

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {

            // console.log(userCredential.user);

            // set name to localstorage
            setLocalName(userCredential.user);
       
            //Redirect to index.html
            window.location.href = "../index.html";
        
        })
        .catch((error) => {
            console.error("Error registration users : " , error.message);
        });

    }

    //Signout
    const logoutUser = () =>{

        signOut(auth)
        .then(() => {

            // unset name from local storage
            unsetLocalName();


            window.location.href = "../signin.html";
        }).catch((error) => {
            console.error("Error logging our = " ,error.message);
        });

    }

    //Reset Password
    const resetPassword = async(email,msg) =>{

        try{

            await sendPasswordResetEmail(auth, email);
            msg.textContent = "Password reset send. Please check your inbox.";
            msg.style.color = "green";
            msg.style.fontSize = "11px";

        }catch{
            console.error("Error sending password reset email = " ,error.message);

            msg.textContent = `Error :${error.message}`;
            msg.style.color = "red";
            msg.style.fontSize = "11px";
        }
    
    }

    //Google Signin
    const googleLogin = () =>{

        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
        .then((result) => {

            // console.log(result);

            // set name to localstorage
            setLocalName(result.user.displayName);

            //Redirect to index.html
           window.location.href = "../index.html";

        }).catch((error) => {
            console.error("Error with Google Sign-in : " , error.message);
        });

    }

    //Auth Check
    const isLogin = () =>{

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                return true;
            } else {
                window.location.href = "../signin.html";
            }
        });
    }

    // Get User Info 
    const getUser = (callback) =>{

        // callback("Hello Sir");

        onAuthStateChanged(auth, (userdata) => {
            if (userdata) {
                callback(userdata);
            }
        });

    }

    const setLocalName = (userdata)=>{
        localStorage.setItem('username',userdata.displayName);
    }

    const unsetLocalName = ()=>{
        localStorage.removeItem('username');
    }

    return {registerUser,loginUser,logoutUser,resetPassword,googleLogin,isLogin,getUser}
}


// 5FT 