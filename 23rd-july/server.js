// Import packages
const express = require("express");
const cors = require("cors");

// Create Express application
const app = express();


// Enable CORS
app.use(cors());


// Allow JSON data from client
app.use(express.json());


// Sample student data
let students = [
    {
        id: 1,
        name: "Anitha",
        department: "AI",
        mark: 85
    },
    {
        id: 2,
        name: "Kavya",
        department: "Computer Science",
        mark: 90
    }
];


// GET API - Send JSON data to client

app.get("/students", (req,res)=>{

    res.json(students);

});


// POST API - Receive JSON data from client

app.post("/students",(req,res)=>{


    let newStudent = {

        id: students.length + 1,

        name: req.body.name,

        department: req.body.department,

        mark: req.body.mark

    };


    students.push(newStudent);


    res.json({

        message:"Student added successfully",

        student:newStudent

    });


});



// Start Server

app.listen(3000,()=>{

    console.log("Server running on port 3000");

});
