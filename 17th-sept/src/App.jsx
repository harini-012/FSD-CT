import Register from "./Register";
import Login from "./Login";
import StudentProfile from "./StudentProfile";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function App() {
  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <Register />

      <hr />

      <Login />

      <hr />

      <StudentProfile />

      <hr />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default App;