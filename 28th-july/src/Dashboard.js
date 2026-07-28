import {useContext} from "react";

import {UserContext} from "./UserContext";


function Dashboard(){


const {user}=useContext(UserContext);



return(

<div>


<h2>Dashboard</h2>


{

user ?

<p>
Hello {user.name},
Welcome to Dashboard
</p>


:

<p>
Access Denied. Please Login
</p>

}


</div>

);


}


export default Dashboard;
