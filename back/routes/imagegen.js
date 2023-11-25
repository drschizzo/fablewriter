var express = require('express');
var openailib = require('openai');
var fakestory = require('../fakedata/fakestory.json');
require('dotenv').config()

var process = require('process');
var os=require('os');
var router = express.Router();

console.log(process.env.OPENAI_API_KEY);

const openai = new openailib({
    apiKey: process.env.OPENAI_API_KEY,
});

/* GET users listing. */
router.get('/', async function(req, res) {
    const prompt = req.query.prompt;
    const demo = req.query.demo;
    var image_url;
    if (demo) {
        image_url='';
    }
    else {
        
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "256x256",
          });
          image_url = image.data;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(image_url);
    res.end();
      
});

module.exports = router;

