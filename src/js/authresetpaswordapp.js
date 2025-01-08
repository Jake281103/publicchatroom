import { Authorize } from "./authorize";

//UI

const resetPasswordform = document.getElementById('resetpasswordform');
const msg = document.getElementById('msg');


//Register
resetPasswordform.addEventListener('submit',(e)=>{
    e.preventDefault();

    const resetemail = document.getElementById('resetemail').value.trim();


    const {resetPassword} = Authorize();
    resetPassword(resetemail,msg)

});




