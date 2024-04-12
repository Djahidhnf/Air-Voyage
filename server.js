import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3100;
let passwordConfirmed = false;


app.use(bodyParser.urlencoded({ extended: true }));

function passwordIdentical (req, res, next) {
    if (req.body['password'] === req.body['passwordConfirmation']) {
        passwordConfirmed = true;
    } else {
        passwordConfirmed = false;
    }
    next();
}

app.use(passwordIdentical);
app.use(express.static('public'));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/signup', (req, res) => {
    res.render('signup.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs');
})

app.post('/signup', (req, res) => {
    if (passwordConfirmed) {
        res.sendStatus(201); 
    } else {
        res.render('signup.ejs')
    }
})

app.post('/login', (req, res) => {
    res.sendStatus(202);
})