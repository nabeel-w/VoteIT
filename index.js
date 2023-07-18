require('dotenv').config();
const express = require("express");
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const PORT=process.env.PORT || 5000;

const app = express();
const corsOptions = {origin: ['http://localhost:3000']};
app.use(cors(corsOptions));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);
const secretKey = process.env.JWT_SECRET;

app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://127.0.0.1:27017/voteDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
    name: String,
    phoneNumber: String,
});
const User = new mongoose.model("User", userSchema);
async function storeUser(name,phoneNumber,res){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPhone = await bcrypt.hash(phoneNumber, salt);
        const user= new User({
            name: name,
            phoneNumber: hashedPhone
        });
        const foundUser = await User.find({},{phoneNumber: 1});
        if(foundUser.length > 0){
            for (let index = 0; index < foundUser.length; index++) {
                let result= await bcrypt.compare(phoneNumber,foundUser[index].phoneNumber)
                //console.log(result);
                if(result){
                    throw new Error("User already exists.");
                }
            }  
        }
        await user.save();
        res.status(200).json({message:'User Created'});          
        
    }catch(error){
        console.log('Error storing user:', error);
        res.status(500).json({message:'This number is already registred'});
    }
}
async function getName(phoneNumber){
    const foundUser = await User.find({});
    if(foundUser.length > 0){
        for (let index = 0; index < foundUser.length; index++) {
            let result= await bcrypt.compare(phoneNumber,foundUser[index].phoneNumber)
            //console.log(result);
            if(result){
                return foundUser[index];
            }
        }
    }
    throw new Error("Number Not Registered");
}
async function generateOTP(id,phoneNumber,res){
    let otp = String(Math.floor(100000 + Math.random() * 900000));
    const salt = await bcrypt.genSalt(10);
    const OTP = await bcrypt.hash(otp, salt);
    const token = jwt.sign({ id, OTP }, secretKey, { expiresIn: '5m' });
    client.messages.create({
        body: `Your verification code is: ${otp}`,
        to:phoneNumber,
        messagingServiceSid:process.env.MESSAGING_SERVICE_SID
    }).then(()=>{
        res.status(200).json({token});
    })
}

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader
    //console.log(token);
  
    if (!token) {
      return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.decoded = decoded;
      next();
    });
  }

app.post("/register",(req, res)=>{
    const uname= req.body.name;
    const uphoneNumber=req.body.phoneNumber;
    storeUser(uname,uphoneNumber,res);
});
app.post("/login",async function(req,res){
    const phoneNumber=req.body.phoneNumber;
    getName(phoneNumber)
    .then(user=>{
        const id= user._id;
        //console.log(id);
        generateOTP(id,phoneNumber,res);
    })
    .catch(error=>{
        console.log(error);
        res.status(404).json({ message:"Number Not Found" });
    })

})
app.post("/verify",verifyToken,(req,res)=>{
    const inputOTP=req.body.otp;
    const { id, OTP } = req.decoded;
    //console.log(id,OTP,inputOTP);
    bcrypt.compare(inputOTP, OTP)
    .then(result=>{
        //console.log(result);
        if(result){
            //console.log("Success");
            res.sendStatus(200);
        }else{
            res.sendStatus(401)
        }
    })

})
app.post("/verifyToken",verifyToken,(req,res)=>{});


app.listen(PORT, ()=> {console.log(`Server started on port ${PORT}.`)});