import {useContext} from "react";

import {UserContext} from "./UserContext";


function Navbar(){


const {user}=useContext(UserContext);



return(

<div>


<h3>

{
user ?

"Welcome "+user.name

:

"Please Login"

}


</h3>


</div>

);


}


export default Navbar;

