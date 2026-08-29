const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/college")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const Student = mongoose.model("Student", {
    name: String,
    age: Number,
    course: String
});

// CREATE
app.post("/students", async (req, res) => {

    const student = new Student(req.body);

    await student.save();

    res.json(student);
});

// READ ALL
app.get("/students", async (req, res) => {

    const students = await Student.find();

    res.json(students);
});

// READ ONE
app.get("/students/:id", async (req, res) => {

    const student = await Student.findById(req.params.id);

    res.json(student);
});

// UPDATE
app.put("/students/:id", async (req, res) => {

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(student);
});

// DELETE
app.delete("/students/:id", async (req, res) => {

    await Student.findByIdAndDelete(req.params.id);

    res.json({
        message: "Student deleted"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
