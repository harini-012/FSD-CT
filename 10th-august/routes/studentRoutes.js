const express = require("express");

const router = express.Router();

// Temporary in-memory database
let students = [
    {
        id: 1,
        name: "Anu",
        email: "anu@gmail.com",
        course: "B.Sc Computer Science with AI"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@gmail.com",
        course: "B.Sc Computer Science with AI"
    },
    {
        id: 3,
        name: "Divya",
        email: "divya@gmail.com",
        course: "B.Sc Computer Science with AI"
    }
];

// ==========================================
// GET ALL STUDENTS
// GET /api/students
// ==========================================

router.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });

});


// ==========================================
// GET STUDENT BY ID
// GET /api/students/:id
// ==========================================

router.get("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({
            success: false,
            message: "Student not found"
        });

    }

    res.status(200).json({
        success: true,
        data: student
    });

});


// ==========================================
// CREATE STUDENT
// POST /api/students
// ==========================================

router.post("/", (req, res) => {

    const { name, email, course } = req.body;

    // Validation
    if (!name || !email || !course) {

        return res.status(400).json({
            success: false,
            message: "Name, email and course are required"
        });

    }

    // Create new student
    const newStudent = {

        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,

        name: name,
        email: email,
        course: course

    };

    students.push(newStudent);

    res.status(201).json({

        success: true,

        message: "Student created successfully",

        data: newStudent

    });

});


// ==========================================
// UPDATE STUDENT
// PUT /api/students/:id
// ==========================================

router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { name, email, course } = req.body;

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    if (!name || !email || !course) {

        return res.status(400).json({

            success: false,

            message: "Name, email and course are required"

        });

    }

    students[studentIndex] = {

        id: id,

        name: name,

        email: email,

        course: course

    };

    res.status(200).json({

        success: true,

        message: "Student updated successfully",

        data: students[studentIndex]

    });

});


// ==========================================
// PARTIAL UPDATE
// PATCH /api/students/:id
// ==========================================

router.patch("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(
        student => student.id === id
    );

    if (!student) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    // Update only provided fields

    if (req.body.name) {
        student.name = req.body.name;
    }

    if (req.body.email) {
        student.email = req.body.email;
    }

    if (req.body.course) {
        student.course = req.body.course;
    }

    res.status(200).json({

        success: true,

        message: "Student partially updated",

        data: student

    });

});


// ==========================================
// DELETE STUDENT
// DELETE /api/students/:id
// ==========================================

router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {

        return res.status(404).json({

            success: false,

            message: "Student not found"

        });

    }

    const deletedStudent =
        students.splice(studentIndex, 1)[0];

    res.status(200).json({

        success: true,

        message: "Student deleted successfully",

        data: deletedStudent

    });

});

module.exports = router;
