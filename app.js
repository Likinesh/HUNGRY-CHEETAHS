const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const isro = require('./routes/isro');
const spacex = require('./routes/spacex')
const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use("",isro);
app.use("",spacex);

app.get("/",(req,res)=>{
  res.render("index");
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
    res.render("iss-location",{data:result1 , area:result2 , members:result3,place:result4});  
  } catch (error) {
    console.error('Error fetching ISS information:', error.message);
    res.status(500).send('Error fetching ISS information');
  }
});

app.get('/NASA-APOD', async (req, res) => {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
      const result = response.data;
      res.render("NASA-APOD",{data:result});
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
    res.render("space-news",{data1:result1 ,data2:result2});
  } catch (error) {
    console.error('Error fetching SpaceFlight API information:', error.message);
    res.status(500).send('Error fetching space news');
  }
});

app.get("/next-launch",async(req,res)=>{
  try {
    const response = await axios.request("https://fdo.rocketlaunch.live/json/launches/next/5");
    const result = response.data;
    res.render("next-launch",{data:result})
  } catch (error) {
    console.error(error);
  }
})

app.get("/mars-weather",async(req,res)=>{
  try {
    const response = await axios.request("https://api.maas2.apollorion.com");
    const result = response.data;
    res.render("mars-temp",{data:result})
  } catch (error) {
    console.error(error);
  }
})

let e_date='';
app.get("/mars-rover",async(req,res)=>{
  try {
    if (e_date==='') {
      const response = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&sol=4000");
      const result = response.data;
      res.render("mars-rover-img",{data:result});  
    }
    else{
      const response = await axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY&earth_date="+e_date);
      const result = response.data;
      res.render("mars-rover-img",{data:result});
    }
  } catch (error) {
    console.error(error);
  }
})

app.post("/mars-rover-date",(req,res)=>{
    e_date=req.body.edate;
    res.redirect("/mars-rover");
});

app.get("/quiz",(req,res)=>{
  res.render("quiz");
})

let planet_name=null;
app.get("/solar-system",async(req,res)=>{
  if (planet_name===null) {
    const response1 = await axios.request("https://api.le-systeme-solaire.net/rest/knowncount");
    const result1 = response1.data;
    res.render("solar-system",{data:result1,solar:null});
  }
  try {
    const options = {
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/planets?name='+planet_name,
      headers: {
         'X-Api-Key': 'tRtAPplmWukhtiPoolga5Q==5p7NOagUHP5IloQa'
      },
    };
    const response1 = await axios.request("https://api.le-systeme-solaire.net/rest/knowncount");
    const result1 = response1.data;
    const response2 = await axios.request(options);
    const result2 = response2.data;
    let rad=(result2[0].radius)*69911;
    res.render("solar-system",{data:result1 , solar:result2, radi:rad})
  } catch (error) {
    console.error(error);
  }
});

app.post("/solar-system",(req,res)=>{
  planet_name=req.body.planet;
  res.redirect('/solar-system');
  
})

let url = "https://api.spaceflightnewsapi.net/v4/articles";
app.get("/space-articles",async(req,res)=>{
  const response = await axios.request(url);
  const result =response.data;
  res.render("space-articles",{data:result});
});

app.post("/space-articles-prev",async(req,res)=>{
  const response = await axios.request(url);
  const result = response.data;
  url=result.previous;
  res.redirect("/space-articles");
  
});

app.post("/space-articles-next",async(req,res)=>{
  const response = await axios.request(url);
  const result = response.data;
  url= result.next;
  res.redirect("/space-articles");
})

let url1 = "https://api.spaceflightnewsapi.net/v4/blogs";
app.get("/space-blogs",async(req,res)=>{
  const response = await axios.request(url1);
  const result =response.data;
  res.render("space-blogs",{data:result});
});

app.post("/space-blogs-prev",async(req,res)=>{
  const response = await axios.request(url1);
  const result = response.data;
  url1=result.previous;
  res.redirect("/space-blogs");
  
});

app.post("/space-blog-next",async(req,res)=>{
  const response = await axios.request(url1);
  const result = response.data;
  url1= result.next;
  res.redirect("/space-blogs");
})

let url2 = "https://api.spaceflightnewsapi.net/v4/reports";
app.get("/space-reports",async(req,res)=>{
  const response = await axios.request(url2);
  const result =response.data;
  res.render("space-reports",{data:result});
});

app.post("/space-reports-prev",async(req,res)=>{
  const response = await axios.request(url2);
  const result = response.data;
  url1=result.previous;
  res.redirect("/space-reports");
  
});

app.post("/space-reports-next",async(req,res)=>{
  const response = await axios.request(url2);
  const result = response.data;
  url1= result.next;
  res.redirect("/space-reports");
})

app.get('/moons',async(req,res)=>{
  res.render("moon-d")
})

app.get("/about",(req,res)=>{
  res.render("about");
})

app.get("/contact",(req,res)=>{
  res.render("contact-us");
})

app.get("/Links",(req,res)=>{
  res.render("common-links.ejs");
})

app.post("/Links",(req,res)=>{
  res.redirect("/Links");
})

app.get("/celestial",(req,res)=>{
  res.render("celestial");
})

app.post('/sendmail',async(req,res)=>{
  let name =req.body.name;
  let mail =req.body.mail;
  let doubt = req.body.query;

  let testaccount = await nodemailer.createTestAccount();

  let transporter = await nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8be94564c6efe9",
      pass: "134001e0c60db6"
    },
  })
  let info =transporter.sendMail({
      from: name + " " + mail,    
      to: "likithkskommareddy@gmail.com",  
      subject: "Query regarding Space Explorer",    
      text: doubt
  })
  console.log((await info).messageId)
  res.redirect("/contact")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
