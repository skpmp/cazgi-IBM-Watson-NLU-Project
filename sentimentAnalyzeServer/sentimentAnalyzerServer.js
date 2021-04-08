const express = require('express');
const app = new express();


// Create instance of Natural Language Understanding
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new 

    NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    //    Create NLU Instance    
    const nlu = getNLUInstance();
    //    Holder for passes variables
    const urlinputs = {
        "url": req.query.url,
        "features": {
            'emotion': {}
        }
    }; 
    // Call analyze function in NLU 
    nlu.analyze(urlinputs)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
    })
        .catch(err => {
            console.log('error', err);
    })            
});

app.get("/url/sentiment", (req,res) => {
    //    Create NLU Instance    
    const nluinstance = getNLUInstance();
    //    Holder for passes variables
    const urlinputs = {
        "url": req.query.url,
        "features": {
            'sentiment': {}
        }
    }; 
    // Call analyze function in NLU 
    nluinstance.analyze(urlinputs)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
    })
        .catch(err => {
            console.log('error', err);
    })            
});

app.get("/text/emotion", (req,res) => {
    //    Create NLU Instance    
    const nluinstance = getNLUInstance();
    //    Holder for passes variables
    const urlinputs = {
        "url": req.query.url,
        "features": {
            'emotion': {}
        }
    }; 
    // Call analyze function in NLU 
    nluinstance.analyze(urlinputs)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
    })
        .catch(err => {
            console.log('error', err);
    })            
});

app.get("/text/sentiment", (req,res) => {
    //    Create NLU Instance    
    const nluinstance = getNLUInstance();
    //    Holder for passes variables
    const urlinputs = {
        "url": req.query.url,
        "features": {
            'sentiment': {}
        }
    }; 
    // Call analyze function in NLU 
    nluinstance.analyze(urlinputs)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
    })
        .catch(err => {
            console.log('error', err);
    })            
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

