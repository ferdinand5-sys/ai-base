const express = require('express');
const cors = require('cors'); // 追加
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors()); // 全てのアクセスを許可する設定
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/ask', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(req.body.prompt);
        const response = await result.response;
        res.send(response.text());
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/', (req, res) => res.send('AI Base (Node.js) is Running!'));

app.listen(10000, () => console.log('Server running on port 10000'));
