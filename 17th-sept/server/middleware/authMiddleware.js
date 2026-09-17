const { getAuth } = require("firebase-admin/auth");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No authorization header"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        message: "Invalid authorization format"
      });
    }

    const token = parts[1];

    const decodedToken = await getAuth().verifyIdToken(token);

    req.user = decodedToken;

    console.log("User authenticated:", decodedToken.uid);

    next();

  } catch (error) {
    console.log("Token verification error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired Firebase token"
    });
  }
};

module.exports = verifyToken;