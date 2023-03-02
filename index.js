const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = 5000;
require('dotenv').config();

// get the API key from the environment variable
const configuration = new Configuration({ apiKey: process.env.OPENAI_KEY });
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/api/prompt', async (req, res) => {
    console.log("req.body: ", req.body);
    const prompt = req.body.prompt;

    try {
        let response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        });

        console.log("response.data.choices[0].message.content: ", response.data.choices[0].message.content);
        res.send(response.data.choices[0].message.content);
    } catch (error) {
        console.log("error: ", error);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


