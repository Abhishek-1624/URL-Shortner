const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ShortUrl = require('./models/shortUrl');


mongoose.connect('mongodb://localhost/urlShortner')
const app = express();
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));


app.get("/",async  function(req,res){
    const shortUrls = await ShortUrl.find();
    res.render("index",{shortUrls:shortUrls})
});
app.post("/shortUrls",async function(req,res){
    await ShortUrl.create({fullUrl:req.body.fullUrl});
    res.redirect("/");
});
app.get("/:shortUrl", async function(req,res){
    const shortUrl =  await ShortUrl.findOne({short:req.params.shortUrl});
    if(shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.fullUrl);
});
app.listen(5000,function(){
    console.log("The server is running on port 5000");
});