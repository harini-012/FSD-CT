import { UserProvider } from "./UserContext";

import Login from "./Login";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";


function App(){


return(

<UserProvider>


    <Navbar />

    <Login />

    <Dashboard />


</UserProvider>


);


}


export default App;
