
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.post("/",function(req,res){
    const apiKey = "";
    const query = req.body.cityName;
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+query+"&aqi=no";
    https.get(url, function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data) // converting from compact JSON to JS object
            const temp = weatherData.current.temp_c;
            const text = weatherData.current.condition.text;
            const icon = weatherData.current.condition.icon;
            const imageURL = "https:"+icon;
            // console.log(imageURL)
            res.write("<h1>The temperature in "+query+" is "+temp+"degrees celcius</h1><h2>The weather condition is "+text+"</h2><img src='"+imageURL+"'>");
            res.send()
        })
    })
})



app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})


app.listen(3000,function(){
    console.log("Server is running on port 3000");
})