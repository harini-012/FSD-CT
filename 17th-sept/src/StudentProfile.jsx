import { useState } from "react";
import { auth } from "./firebase";

function StudentProfile() {
  const [name, setName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");

  const saveStudent = async () => {
    try {
      // Check login
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      // Get Firebase token
      const token = await user.getIdToken();

      // Send data to Express backend
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify({
          name: name,
          registerNo: registerNo,
          department: department,
          year: Number(year)
        })
      });

      // Read server response
      const text = await response.text();

      console.log("STATUS:", response.status);
      console.log("SERVER RESPONSE:", text);

      // Check server error
      if (!response.ok) {
        throw new Error(text || "Failed to save student");
      }

      // Convert JSON response
      const data = JSON.parse(text);

      console.log("Student saved:", data);

      alert("Student profile saved successfully!");

      // Clear form
      setName("");
      setRegisterNo("");
      setDepartment("");
      setYear("");

    } catch (error) {
      console.error("ERROR:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Student Profile</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Register Number"
        value={registerNo}
        onChange={(e) => setRegisterNo(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveStudent}>
        Save Student
      </button>
    </div>
  );
}

export default StudentProfile;