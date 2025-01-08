import{A as n}from"./authorize-BQuTIKn-.js";import"./authcheck-lg-bFmzB.js";/* empty css             */function m(e){return{userInfoEle:t=>{const i=t.uid,s=t.email,l=t.displayName,r=t.photoURL,o=t.metadata.creationTime;dateFns.format(new Date(o),"dd MMMM yyyy");const c=`
            
                <img
            src="${r}"
            width="80"
            alt="porfile icon"
            />

            <p>UID : ${i}</p>
            <p>Display Name : ${l} </p>
            <p>Email : ${s}</p>
            <p>Created At : ${o}</p>
        `;e.innerHTML=c}}}const u=document.getElementById("userinfo"),p=document.getElementById("logoutbtn"),d=n(),a=m(u);d.getUser(e=>{console.log(e),a.userInfoEle(e)});p.addEventListener("click",()=>{const{logoutUser:e}=n();e()});
