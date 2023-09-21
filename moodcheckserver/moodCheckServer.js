const express = require('express');
const app = new express();

/*This tells the server to use the client 
folder for all static resources*/
app.use(express.static('client'));

/*This tells the server to allow cross origin references*/
const cors_app = require('cors');
app.use(cors_app());

//
const dotenv = require('dotenv'); // 1. import dotenv
dotenv.config(); // 2. call config()

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

function getNLUInstance() {
    /*Create the NLU instance and return it from IBM .
    You can refer to https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#features-examples
    to gather more instructions on how to use this service.*/
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1'); // 3. create instance by importing NaturalLanguageUnderstandingV1 
    const { IamAuthenticator } = require('ibm-watson/auth'); // 4. create instance by importing the Ibmauthenticator

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({ // 5. create instance by passing the apikey and service url
        version: '2021-08-01', 
        authenticator: new IamAuthenticator ({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding; // 6. return the instance
}


//The default endpoint for the webserver
app.get("/",(req,res)=>{
    res.render('index.html');
  });

//Define an endpoint for emotion analysis ending with /url/emotion
app.get("/url/emotion", (req, res) => {
    // Extract the URL from the client's request
    let urlToAnalyze = req.query.url;

    // Prepare parameters for emotion analysis
    const analyzeParams = {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1 // Analyze only the most relevant keyword
            }
        }
    }

    // Create an instance of the IBM Watson Natural Language Understanding service
    const naturalLanguageUnderstanding = getNLUInstance();

    // Perform emotion analysis on the content at the specified URL using the parameters of the analyzeParams object
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Extract emotional attributes of the most relevant keyword
            const emotionData = analysisResults.result.keywords[0].emotion;

            // Send the emotional data as a JSON response to the client
            return res.json(emotionData);
        })
        .catch(err => {
            // Handle errors and send an error response to the client
            return res.status(500).json({ error: "Could not perform desired operation", message: err.message });
        });
});

 
//Define an endpoint for sentiment analysis ending with /url/sentiment
app.get("/url/sentiment", (req, res) => {
    // Extract the URL from the client's request
    let urlToAnalyze = req.query.url;

    // Prepare parameters for sentiment analysis
    const analyzeParams = {
        "url": urlToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1 // Analyze only the most relevant keyword
            }
        }
    }

    // Create an instance of the IBM Watson Natural Language Understanding service
    const naturalLanguageUnderstanding = getNLUInstance();

    // Perform sentiment analysis on the content at the specified URL
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Extract the sentiment of the most relevant keyword
            const sentiment = analysisResults.result.keywords[0].sentiment;

            // Send the sentiment as a JSON response to the client
            return res.json(sentiment);
        })
        .catch(err => {
            // Handle errors and send an error response to the client
            return res.status(500).json({ error: "Could not perform desired operation", message: err.message });
        });
});


//Define an endpoint for emotion analysis of text ending with /text/emotion
app.get("/text/emotion", (req, res) => {
    // Extract the text to analyze from the client's request
    let textToAnalyze = req.query.text;

    // Prepare parameters for emotion analysis
    const analyzeParams = {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "emotion": true,
                "limit": 1 // Analyze only the most relevant keyword
            }
        }
    }
    
    // Create an instance of the IBM Watson Natural Language Understanding service
    const naturalLanguageUnderstanding = getNLUInstance();

    // Perform emotion analysis on the provided text
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Extract the emotion of the most relevant keyword
            const emotion = analysisResults.result.keywords[0].emotion;

            // Send the emotion as a JSON response to the client
            return res.json(emotion);
        })
        .catch(err => {
            // Handle errors and send an error response to the client
            return res.status(500).json({ error: "Could not perform desired operation", message: err.message });
        });
});


//Define an endpoint for sentiment analysis of text ending with /text/sentiment
app.get("/text/sentiment", (req, res) => {
    // Extract the text to analyze from the client's request
    let textToAnalyze = req.query.text;

    // Prepare parameters for sentiment analysis
    const analyzeParams = {
        "text": textToAnalyze,
        "features": {
            "keywords": {
                "sentiment": true,
                "limit": 1 // Analyze only the most relevant keyword
            }
        }
    }
    
    // Create an instance of the IBM Watson Natural Language Understanding service
    const naturalLanguageUnderstanding = getNLUInstance();

    // Perform sentiment analysis on the provided text
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            // Extract the sentiment of the most relevant keyword
            const sentiment = analysisResults.result.keywords[0].sentiment;

            // Send the sentiment as a JSON response to the client
            return res.json(sentiment);
        })
        .catch(err => {
            // Handle errors and send an error response to the client
            return res.status(500).json({ error: "Could not perform desired operation", message: err.message });
        });
});


//The server's port listening to client requests
let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
