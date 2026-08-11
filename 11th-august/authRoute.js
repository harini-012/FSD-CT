const express = require("express");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middleware");

const router = express.Router();
 
const JWT_SECRET = "mysecretkey";
 
// Dummy user
const user = {
	id: 101,
	username: "student",
	password: "1234"
};
 
// LOGIN
router.post("/login", (req, res) => {
 
	const { username, password } = req.body;
 
	if (
    	username !== user.username ||
    	password !== user.password
	) {
    	return res.status(401).json({
        	message: "Invalid username or password"
    	});
	}
 
	const token = jwt.sign(
    	{
        	id: user.id,
        	username: user.username
    	},
    	JWT_SECRET,
    	{
        	expiresIn: "1h"
    	}
	);
 
	res.json({
    	message: "Login successful",
    	token: token
	});
});
 router.get("/profile", authenticateToken, (req, res) => {
 
	res.json({
    	message: "Welcome to your profile",
    	user: req.user
	});
 
});

 
module.exports = router;

