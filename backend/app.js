// import module express
const express = require("express");
// import module body parser
const bodyParser = require("body-parser");
// import mongoose module
const mongoose = require("mongoose");
// connect Express with DB
mongoose.connect("mongodb://127.0.0.1:27017/sportMaiDB");

// import bcrypt module
const bcrypt = require("bcrypt");
// import jwt module
const jwt = require("jsonwebtoken");
// import session module
const session = require("express-session");

// create Express app
const app = express();
// import axios
const axios = require("axios");
//import muter
const multer = require("multer");
//import path
const path = require("path");


// bodyParser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );

    next();
});

// Session Configuration
const secretKey = "croco24";
app.use(
    session({
        secret: secretKey,
    })

);
//shortCutPath == backend/images
app.use('/shortCutPath', express.static(path.join('backend/uplods')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (isValid) {
    cb(null, 'backend/uplods')
    }
    },
    filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
    extension;
    cb(null, imgName);
    }
    });
// Models Importation
const Match = require("./models/match");
const User = require("./models/user");
const Team = require("./models/team");
const Player = require("./models/player");
// Static DB
let matches = [
    { id: 0, teamOne: "EST", teamTwo: "CA", scoreOne: 5, scoreTwo: 0 },
    { id: 1, teamOne: "TPMZB", teamTwo: "CA", scoreOne: 8, scoreTwo: 0 },
    { id: 2, teamOne: "ST", teamTwo: "CA", scoreOne: 1, scoreTwo: 0 },
];

// Here BL: Add Match
app.post("/matches", (req, res) => {
    console.log("Here into BL: Add Match", req.body);
    let matchObj = new Match(req.body);
    matchObj.save();
    res.json({ message: "match added" });
});

// Here BL: Get All Matches
app.get("/matches", (req, res) => {
    Match.find().then((docs) => {
        console.log("Here Matches docs", docs);
        res.json({ matches: docs });
    });
});

// Here BL : Get Match By Id
app.get("/matches/:id", (req, res) => {
    console.log("Here into BL : Get Match By ID", req.params.id);
    Match.findById(req.params.id).then((doc) => {
        console.log("Here doc", doc);
        res.json({ match: doc });
    });
});

// Here BL : Delete Match By ID
app.delete("/matches/:id", (req, res) => {
    console.log("Here into delete", req.params.id);
    Match.deleteOne({ _id: req.params.id }).then((deleteResponse) => {
        console.log("Here response after delete", deleteResponse);
        if (deleteResponse.deletedCount == 1) {
            res.json({ message: "Success" });
        } else {
            res.json({ message: "Error" });
        }
    });
});

// Here BL: Edit Match
app.put("/matches", (req, res) => {
    console.log("Here into BL: Edit Match", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        console.log("Here response", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ message: "Edited With Success" });
        } else {
            res.json({ message: "Error" });
        }
    });
});

// Here Business Logic : Add Team
app.post("/api/teams", (req, res) => {
    console.log("Here into BL: Add Team", req.body);
    let teamObj = new Team(req.body);
    teamObj.save();
    res.json({ isAdded: true });
});

// Here BL: Get All Teams
app.get("/api/teams", (req, res) => {
    Team.find().then((docs) => {
        console.log("Here docs", docs);
        res.json({ teams: docs });
    });
});

// Here Business Logic : Add Player
app.post("/api/players", (req, res) => {
    Team.findById(req.body.tId).then((team) => {
        if (!team) {
            res.json({ msg: "Team Not Found" });
        } else {
            let player = new Player({
                name: req.body.name,
                age: req.body.age,
                nbr: req.body.nbr,
                position: req.body.position,
                teamId: team._id,
            });
            player.save((err, doc) => {
                if (err) {
                    res.json({ msg: "Player not saved" });
                } else {
                    team.playersId.push(doc);
                    team.save();
                    res.json({ msg: "Player saved with success" });
                }
            });
        }
    });
});

// Here BL: Get All Players
app.get("/api/players", (req, res) => {
    Player.find().then((docs) => {
        console.log("Here docs", docs);
        res.json({ players: docs });
    });
});

// Here into BL: Signup
app.post("/api/users/signup",  multer({ storage: storage }).single('img'), (req, res) => {
    // console.log("Here into signup", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("Here crypted pwd", cryptedPwd);
        req.body.pwd = cryptedPwd;
        req.body.avatar =  `http://localhost:3000/shortCutPath/${req.file.filename }`;
        const user = new User(req.body);
        user.save();
        res.json({ msg: "Signup With Success" });
    });
});

// Here into BL: Login
app.post("/api/users/login", (req, res) => {
    console.log("Here into BL: Login", req.body);
    User.findOne({ email: req.body.email }).then((doc) => {
        console.log("Here doc", doc);
        if (!doc) {
            res.json({ msg: "Check Your Email" });
        } else {
            // Doc exist
            bcrypt.compare(req.body.pwd, doc.pwd).then((pwdResult) => {
                console.log("Here pwdResult", pwdResult);
                if (!pwdResult) {
                    res.json({ msg: "Check Your Pwd" });
                } else {
                    let userToSend = {
                        role: doc.role,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        tel: doc.tel,
                        avatar:doc.avatar
                    };
                    // Encoder userToSend
                    const token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" });
                    console.log("here into Login with success", token);
                    res.json({ msg: "Welcome", user: token });
                }
            });
        }
    });
});

// Here into BL : Get All Teams with Players
app.get("/api/teamsPlayers", (req, res) => {
    console.log("Here into BL : Get ALl Teams with Players");
    Team.find()
        .populate("playersId")
        .then((teamDocs) => {
            console.log("Here team docs", teamDocs);
            res.json({ teams: teamDocs });
        });
});

// Here into BL : Get All Players with Team information
app.get("/api/playersWithTeamInfo", (req, res) => {
    console.log("Here into BL : Get ALl Players with team info");
    Player.find().populate("teamId").then((players) => {
        res.json({ players: players });
    });
});
// serach weather
app.post('/weather', (req, res) => {
    console.log("here obj", req.body);
    let key = '3884f47a4a214b2a2e415333671a83d1';
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${key}`
    axios.get(apiURL).then(
        (apiResponse) => {
            console.log('here reponse from api', apiResponse.data);
            let weatherResponse = {
                temp: apiResponse.data.main.temp,
                humidity: apiResponse.data.main.humidity,
                pressure: apiResponse.data.main.pressure,
                speed: apiResponse.data.speed,
                description: apiResponse.data.weather[0].description
            }
            res.json({ apiRes: weatherResponse });
        }
    )

})


module.exports = app; // make app exportable