import {useContext,useState} from "react";

import {UserContext} from "./UserContext";


function Login(){


const {setUser}=useContext(UserContext);



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");



function handleLogin(){


    if(email==="admin@gmail.com" 
       && password==="1234"){


        setUser({

            name:"Geetha",

            email:email

        });


        alert("Login Successful");


    }

    else{

        alert("Invalid Login");

    }


}



return(

<div>


<h2>Login</h2>


<input

type="email"

placeholder="Email"

onChange={(e)=>
setEmail(e.target.value)}

/>


<br/>


<input

type="password"

placeholder="Password"

onChange={(e)=>
setPassword(e.target.value)}

/>


<br/>


<button onClick={handleLogin}>

Login

</button>


</div>


);


}


export default Login;

