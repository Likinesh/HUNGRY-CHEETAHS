const express = require('express');
const axios = require('axios');
const http = require('http');

const app = express();
const port = 3000;

app.use(express.static("public"));

const url='https://api.spaceflightnewsapi.net/v4/articles';

app.get("/",function(req,res){
  res.render("index.ejs");
})

app.get('/iss-location', async (req, res) => {
  try {
    const response1 = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
    const result1 = response1.data;
    const lat = result1.latitude;
    const long = result1.longitude;
    const response2 = await axios.get('https://api.wheretheiss.at/v1/coordinates/'+lat+','+long);
    const result2 = response2.data;
    const response3 = await axios.get('http://api.open-notify.org/astros.json');
    const result3 = response3.data;
    const response4 = await axios.get('https://api.opencagedata.com/geocode/v1/json?q='+lat+'+'+long+'&key=cb12bd847e3b46a39e84c8d862bbe65a')
    const result4 = response4.data;
    res.render("iss-location.ejs",{data:result1 , area:result2 , members:result3,place:result4});  
  } catch (error) {
    console.error('Error fetching ISS information:', error.message);
    res.status(500).send('Error fetching ISS information');
  }
});

app.get('/NASA-APOD', async (req, res) => {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
      const result = response.data;
      res.render("NASA-APOD.ejs",{data:result});
    } catch (error) {
      console.error('Error fetching APOD information:', error.message);
      res.status(500).send('Error fetching APOD information');
    }
  });

app.get("/space-news",async(req,res)=>{
  try {
    const response1 = await axios.get(`https://api.spaceflightnewsapi.net/v4/info`);
    const result1 = response1.data;
    const response2 = await axios.get(`https://api.spaceflightnewsapi.net/v4/reports`);
    const result2 = response2.data;
    res.render("space-news.ejs",{data1:result1 ,data2:result2});
  } catch (error) {
    console.error('Error fetching SpaceFlight API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
});

app.get("/ISRO-info",async(req,res)=>{
    res.render("ISRO_API_data.ejs");
})

app.get("/ISRO-customer-satellites",async(req,res)=>{
  try{
    const response1 = await axios.get(`https://isro.vercel.app/api/customer_satellites`);
    const result1 = response1.data;
    res.render("ISRO-customer-satellites.ejs",{data1:result1});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

app.get("/ISRO-data",async(req,res)=>{
  try{
    const response1 = await axios.get(`https://isro.vercel.app/api/spacecrafts`);
    const result1 = response1.data;
    const response2 = await axios.get(`https://isro.vercel.app/api/centres`);
    const result2 = response2.data;
    res.render("ISRO-Centre.ejs",{data1:result1 ,data2:result2});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

app.get("/ISRO-stats-l",async(req,res)=>{
  try{
    const response = await axios.get(`https://services.isrostats.in/api/launches`);
    const result = response.data;
    res.render("ISRO-stats-launches.ejs",{data:result});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

app.get("/ISRO-stats-sc",async(req,res)=>{
  try{
    const response = await axios.get(`https://services.isrostats.in/api/spacecraft`);
    const result = response.data;
    res.render("ISRO-stats-spacecrafts.ejs",{data:result});
  }
  catch(error){
    console.error('Error fetching ISRO API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
})

app.get("/next-launch",async(req,res)=>{
  try {
    const response = await axios.request("https://fdo.rocketlaunch.live/json/launches/next/5");
    const result = response.data;
    res.render("next-launch.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/mars-weather",async(req,res)=>{
  try {
    const response = await axios.request("https://api.maas2.apollorion.com");
    const result = response.data;
    res.render("mars-temp.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-starlink",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/starlink");
    const result = response.data;
    res.render("spacex-starlink.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-history",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/history");
    const result = response.data;
    res.render("spacex-history.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-ships",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/ships");
    const result = response.data;
    res.render("spacex-ships.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-crew",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/crew");
    const result = response.data;
    res.render("spacex-crew.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-landpads",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/landpads");
    const result = response.data;
    res.render("spacex-landpads.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-rockets",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/rockets");
    const result = response.data;
    res.render("spacex-rockets.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/spacex-launchpads",async(req,res)=>{
  try {
    const response = await axios.request("https://api.spacexdata.com/v4/launchpads");
    const result = response.data;
    res.render("spacex-launchpads.ejs",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/contact",async(req,res)=>{
  res.render("contact-us.ejs")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
