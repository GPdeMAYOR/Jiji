const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const BING_API_KEY = process.env.BING_API_KEY;
const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search";

app.post('/search', async (req, res) => {
  const query = req.body.query;

  try {
    const response = await axios.get(BING_ENDPOINT, {
      headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY },
      params: { q: query }
    });

    const results = response.data.webPages?.value.map(item => ({
      title: item.name,
      snippet: item.snippet,
      url: item.url
    })) || [];

    res.json({ results });
  } catch (error) {
    console.error("Search error:", error.message);
    res.status(500).json({ error: "Search failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
