const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body; 

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ wiadomosc: err });

        const user = new User({
            name, 
            email,
            password: hash,
        });

        user.save()
            .then(() => res.status(201).json({ wiadomosc: "dodano użytkownika o id: " + user._id }))
            .catch(err => res.status(500).json({ wiadomosc: "Błąd zapisu użytkownika", error: err }));
    });
});


router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });
            }

            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) return res.status(500).json({ wiadomosc: err });
                if (!result) return res.status(401).json({ wiadomosc: "Błąd autoryzacji" });

                const token = jwt.sign(
                    { id: user._id, email: user.email }, 
                    process.env.JWT_KEY,
                    { expiresIn: "1d" }
                );
                
                res.status(200).json({ token });  
            });
        })
        .catch(err => res.status(500).json({ wiadomosc: "Błąd serwera", error: err.message }));
});

module.exports = router;
