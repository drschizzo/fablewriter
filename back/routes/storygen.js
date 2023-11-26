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
    var jsonresp;
    console.log("prompt : " + prompt);
    console.log("demo : " + demo);
    if (demo==='true') {
        console.log("demo mode");
        jsonresp=fakestory;
    }
    else {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Tu es un bot qui raconte des histoires. 
                    L'utilisateur va te passer une serie d'information 
                    et à partir de cela tu dois generer une histoire 
                    composée d'une quinzaine de phrases. 
                    Chaque phrase doit etre associé à une description 
                    d'une illustration qui pourrait illustrer la phrase.
                    La description doit etre tres précise et doit
                    permettre à un illustrateur de dessiner l'illustration
                    sans avoir besoin de plus d'information et s assurer une
                    cohérence de style et de représentation entre les illustrations.
                    Chaque description dont contenir des informations precises sur le
                    style graphique de l'illustration et d'un nom d'artiste qui
                    pourrait illustrer cette phrase. L'artiste doit etre le meme 
                    pour toutes les phrases de l'histoire et doit etre repeté dans chaque description.
                    Tu continues à generer des phrases jusqu'à ce que
                    tu aies atteint la limite de 15 phrases.
                    Tu formateras ton histoire en JSON ayant exactement la forme suivante:
                    {
                        story:[
                        {text: "phrase1",desc: "description1" },
                        {text: "phrase2",desc: "description2" },
                        ...
                        ]
                    }
                    `,
                },
                { role: "user", content: prompt },
            ],
        // model: "gpt-3.5-turbo-1106",
        model:"gpt-4-1106-preview",
        response_format: { type: "json_object" },
            //max_tokens: 4096,
        });
        jsonresp=completion.choices[0].message.content;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonresp);
    res.end();
      
});

module.exports = router;

