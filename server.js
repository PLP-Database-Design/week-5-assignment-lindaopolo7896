const express=require('express');
const app=express();
const mysql=require('mysql2');
const cors=require('cors');
const dotenv=require('dotenv');
const { dot } = require('node:test/reporters');

app.use(cors());
app.use(express.json());
dotenv.config();
const db=mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});


db.connect((err) => {
  if(err) {
      console.log('Error connecting to the database');
  } else {
      console.log('Connected to the database',db.threadId);
  }
})

//QUESTION 1
app.get('/patients', (req, res) => {
  const sql='SELECT patient_id,first_name,last_name,date_of_birth FROM patients';
  db.query(sql,(err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
      res.json(result);
  });
  });

//QUESTION 2
app.get('/providers',(req,res)=>{
  const sql='SELECT first_name,last_name,provider_specialty FROM providers';
  db.query(sql,(err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
      res.json(result);
  });
});

//QUESTION 3
app.get('/patientname',(req,res)=>{
  const sql='SELECT first_name FROM patients';
  db.query(sql,(err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
      res.json(result);
  });
});

//QUESTION 4
app.get('/providerspecialty',(req,res)=>{
  const sql='SELECT provider_specialty FROM providers';
  db.query(sql,(err,result)=>{
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
      res.json(result);
  });
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
