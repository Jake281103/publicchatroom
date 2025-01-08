import "@fortawesome/fontawesome-free/css/all.css";
import { Authorize } from "./authorize";


//UI

const signinform = document.getElementById('signinform');
const googleLoginbtn = document.getElementById('googleLoginbtn');


//Register
signinform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const signinemail = document.getElementById('signinemail').value.trim();
    const singninpassword = document.getElementById('signinpassword').value.trim();

    const {authorize} = Authorize();
    loginUser(signinemail,singninpassword)
});


//Google Login
googleLoginbtn.addEventListener('click',(e)=>{
    e.preventDefault();

    const {googleLogin} = Authorize();
    googleLogin();
    
});

