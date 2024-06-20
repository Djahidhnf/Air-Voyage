import express, { json, response } from "express";
import bodyParser from "body-parser";
import { resolveInclude } from "ejs";
import axios from "axios";

const app = express();
const port = 3000;
const apiURL = 'https://test.api.amadeus.com/v2';
const token = '8a7sAbmTZ2j7ytccHSILOijx9o2w';


let passwordConfirmed = false;
let newAccount = {
    email: '',
    password: ''
};

app.use(bodyParser.urlencoded({ extended: true }));

function passwordIdentical (req, res, next) {
    if (req.body['password'] === req.body['passwordConfirmation']) {
        newAccount.email = req.body['Email'];
        newAccount.password = req.body['password'];
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
    res.render('signup.ejs');
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




//API

//getting flights
app.get("/flights", async (req, res) => {
    const search = {
        originLocationCode: req.query.departure,
        destinationLocationCode: req.query.destination,
        departureDate: req.query['dep-date'],
        // returnDate: req.query['ret-date'] || null,
        adults: 1,
        nonStop: true,
        max: 10
    };
    console.log('\n--------------');
    console.log(search);
    console.log('\n');
    try {
        const response = await axios.get(apiURL+"/shopping/flight-offers", {headers: {Authorization: `Bearer ${token}`}, params: search});
        const result = response.data.data;
        let flights = result.map(flight => {
            flight = flight.itineraries[0].segments[0];
            return {
                depCode: flight.departure.iataCode,
                depTime: flight.departure.at.replace('T', ' '),
                ariCode: flight.arrival.iataCode,
                ariTime: flight.arrival.at.replace('T', ' '),
                durationtime: flight.duration.slice(2),
                carrierCode: flight.carrierCode,
                airCraftCode: flight.aircraft.code
            }
        })
        
        console.log(flights);
        res.render('index.ejs', {flights: flights});
    } catch (error) {
        console.log("error");
    }
})
