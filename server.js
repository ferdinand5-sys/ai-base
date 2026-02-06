const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
app.post('/ask', async (req, res) => {
    const { prompt } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        res.send(aiText);
    } catch (error) {
        res.status(500).send("AI基地での通信エラーです");
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`基地が動いています：ポート${PORT}`));
