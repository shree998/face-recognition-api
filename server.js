const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./Controllers/Register.js');
const signin = require('./Controllers/SignIn.js');
const profile = require('./Controllers/Profile.js');
const image = require('./Controllers/Image.js');


const postgres = knex({
	client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'smartbrain' 
  }
}); 

//console.log(postgres.select('*').from('user'));

app.use(cors());

app.use(bodyParser.json());


app.get('/',(req,res)=>{
	postgres.select('*').from('users')
	.then(user=>{
			res.send(user);
	})
	.catch(err => res.status(400).json('Cannot find a single user'));
	
})  
 
app.post('/signin',(req,res) => {signin.handleSignIn(req,res,postgres,bcrypt)});

app.post('/register', (req,res) => {register.handleRegister(req,res,postgres,bcrypt)}); 
	

app.get('/profile/:id',(req,res) =>{profile.displayProfile(req,res, postgres)});

app.put('/image',(req, res) => {image.handleImage(req, res, postgres)});
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {  
  console.log(`app is running on port ${process.env.PORT}`)});