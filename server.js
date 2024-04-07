import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3100;

app.use('/signup', (req, res, next) => {
    res.send("account created.");
    next();
});

app.use('/login', (req, res, next) => {
    res.redirect('/');
    next();
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/account', (req, res) => {
    res.render('account.ejs')
})

app.post('/signup', (req, res) => {
    res.sendStatus(201);
})

app.post('/login', (req, res) => {
    res.sendStatus(202);
})