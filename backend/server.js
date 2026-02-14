const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const shop = require('./models/Shop');
const Appointment = require('./models/appointment');
const barberRoutes = require("./routes/barberRoutes");
require('./config/db');

const auth = require('./middlewares/auth');
const barberLoginRoute = require('./routes/shopLogin');
const clientLoginRoute = require('./routes/LoginClient');

const barberRegisterRoute = require('./routes/regisbarber');
const clientRegisterRoute = require('./routes/regisClient');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.use("/api/barbers", barberRoutes);
app.use("/shop",barberRegisterRoute)

app.use("/client",clientLoginRoute);
app.use("/client",clientRegisterRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'index.html'));
});

app.get('/shop/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'login.html'));
});
app.use('/shop', barberLoginRoute);

app.get("/client/login",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'loginClient.html'));
})
app.use('/client', clientLoginRoute);

app.get('/shop/registration', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'registration.html'));
});
app.use('/barber', barberRegisterRoute);

app.get("/client/registration",(req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'regisClient.html'));
})
app.use('/client', clientRegisterRoute);

app.get('/shop/dashboard',auth("shop"),(req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'shopDashboard.html'));
});

app.get('/logout',(req,res)=>{
    res.clearCookie("token");
    res.redirect("/");
});

app.get('/shops', async (req, res) => {
    try {
        const shops = await shop.find().select("-password");
        res.json(shops);
    } catch (error) {
        res.status(500).send("Error fetching barbers");
    }
});
app.get('/appointment/:id', auth("client"), (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'html', 'appointment.html'));
});

app.post('/appointment/:id', auth("client"), async (req,res)=>{

    const { date, time } = req.body;

    const barberId = req.params.id;
    const clientId = req.user.id;

    const exists = await Appointment.findOne({
        barber: barberId,
        date,
        time
    });

    if(exists){
        return res.send("Slot already booked!");
    }

    const newAppointment = new Appointment({
        barber: barberId,
        client: clientId,
        date,
        time
    });

    await newAppointment.save();

    res.send("Booking Successful");
});

app.get("/me", (req,res)=>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.json({loggedIn:false});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        res.json({
            loggedIn:true,
            role:decoded.role,
            id:decoded.id
        });

    }catch(err){
        res.json({loggedIn:false});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
