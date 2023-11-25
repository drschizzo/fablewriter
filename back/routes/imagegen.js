var express = require('express');
var openailib = require('openai');
var fakestory = require('../fakedata/fakestory.json');
require('dotenv').config()

var process = require('process');
var os=require('os');
var fs = require('fs');

var router = express.Router();

console.log(process.env.OPENAI_API_KEY);

const openai = new openailib({
    apiKey: process.env.OPENAI_API_KEY,
});

router.get('/', async function(req, res) {
    const prompt = req.query.prompt;
    const demo = req.query.demo;

    // check if prompt is already in file formatted as "prompt : image_url"
    // if so, return the corresponding image url
    var data = fs.readFileSync('gendb', 'utf8');
    var lines = data.split("\n");
    var image_url = "";
    for (var i=0; i<lines.length; i++) {
        var line = lines[i];
        var colon_index = line.indexOf(":");
        var prompt_in_file = line.substring(0, colon_index);
        if (prompt_in_file == prompt) {
            image_url = line.substring(colon_index+1);
            res.setHeader('Content-Type', 'application/json');
            res.send(image_url);
            res.end();

            return;
        }
    }
    
    
    console.log("prompt : " + prompt);
    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt + '. dans le style d\'une illustration de livre pour enfants.This scene is reminiscent of a children\'s book illustration, filled with whimsy and innocent charm.',
        n: 1,
        size: "1024x1024",
    });
    image_url = image.data[0].url;

    // append url and prompt to file
    fs.appendFile("gendb", prompt + ":" + image_url+ "\n", function(err) {
        if (err) {
            console.error(err);
        }
    });

    res.setHeader('Content-Type', 'text/plain');
    res.send(image_url);
    res.end();
});

module.exports = router;

