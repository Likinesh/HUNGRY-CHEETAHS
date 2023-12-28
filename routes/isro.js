const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get("/ISRO-info",(req,res)=>{
    res.render("ISRO_API_data");
})

router.get("/ISRO-customer-satellites",async(req,res)=>{
  try{
    const response1 = await axios.get(`https://isro.vercel.app/api/customer_satellites`);
    const result1 = response1.data;
    res.render("ISRO-customer-satellites",{data1:result1});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

router.get("/ISRO-data",async(req,res)=>{
  try{
    const response1 = await axios.get(`https://isro.vercel.app/api/spacecrafts`);
    const result1 = response1.data;
    const response2 = await axios.get(`https://isro.vercel.app/api/centres`);
    const result2 = response2.data;
    res.render("ISRO-Centre",{data1:result1 ,data2:result2});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

router.get("/ISRO-stats-l",async(req,res)=>{
  try{
    const response = await axios.get(`https://services.isrostats.in/api/launches`);
    const result = response.data;
    res.render("ISRO-stats-launches",{data:result});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

router.get("/ISRO-stats-sc",async(req,res)=>{
  try{
    const response = await axios.get(`https://services.isrostats.in/api/spacecraft`);
    const result = response.data;
    res.render("ISRO-stats-spacecrafts",{data:result});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

module.exports = router;