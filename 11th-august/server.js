const express = require("express");
const authRoutes = require("./authRoute");
 
const app = express();
 
app.use(express.json());
 
app.use("/api/auth", authRoutes);
 
app.get("/", (req, res) => {
	res.json({
    	message: "JWT API is running"
	});
});
 
app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
