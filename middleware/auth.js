const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Brak autoryzacji" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("Decoded token:", decoded); 
        req.user = decoded; 
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        return res.status(401).json({ message: "Błąd autoryzacji" });
    }
};
