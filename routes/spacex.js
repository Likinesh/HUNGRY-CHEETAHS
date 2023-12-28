const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get("/spacex-info",(req,res)=>{
    try {
      res.render("spacex_API_data");
    } catch (error) {
      console.error(error);
    }
  })
  
  let i=3526;
  router.get("/spacex-starlink",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/starlink");
      const result = response.data;
      res.render("spacex-starlink",{data:result,num:i})
    } catch (error) {
      console.error(error);
    }
  })
  
  router.post('/starlink-next', async(req, res) => {
    if (i-301>=0) {
      i-=301;
    }
    else{
      i=300;
    }
     res.redirect('/spacex-starlink');
  });
  
  router.post('/starlink-prev', async(req, res) => {
    if (i+301<3526) {
      i+=301;
    }
    else{
      i=3526;
    }
     res.redirect('/spacex-starlink');
  });
  
  router.get("/spacex-history",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/history");
      const result = response.data;
      res.render("spacex-history",{data:result})
    } catch (error) {
      console.error(error);
    }
  })
  
  router.get("/spacex-ships",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/ships");
      const result = response.data;
      res.render("spacex-ships",{data:result})
    } catch (error) {
      console.error(error);
    }
  })
  
  router.get("/spacex-crew",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/crew");
      const result = response.data;
      res.render("spacex-crew",{data:result})
    } catch (error) {
      console.error(error);
    }
  })
  
  router.get("/spacex-landpads",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/landpads");
      const result = response.data;
      res.render("spacex-landpads",{data:result})
    } catch (error) {
      console.error(error);
    }
  })
  
  router.get("/spacex-rockets",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/rockets");
      const result = response.data;
      res.render("spacex-rockets",{data:result})
    } catch (error) {
      console.error(error);
    }
  })
  
  router.get("/spacex-launchpads",async(req,res)=>{
    try {
      const response = await axios.request("https://api.spacexdata.com/v4/launchpads");
      const result = response.data;
      res.render("spacex-launchpads",{data:result})
    } catch (error) {
      console.error(error);
    }
  })
module.exports = router;