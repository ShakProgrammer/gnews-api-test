const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache();

// Define routes
app.get('/', async (req, res) => {
  const url = 'https://gnews.io/api/v4/top-headlines';
  const apiKey = 'e08ac37079a2e6575eea98370016def7';
  const query = {
    lang: 'en',
    token: apiKey,
  };

  try {
    const response = await axios.get(url, { params: query });
    res.json(response.data.articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/articles', async (req, res) => {
  const { q, lang, country, max, from, to } = req.query;

  const cacheKey = JSON.stringify({ q, lang, country, max, from, to });
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit!');
    return res.json(cachedData);
  }

  const url = 'https://gnews.io/api/v4/search';
  const apiKey = 'e08ac37079a2e6575eea98370016def7';
  const query = {
    q,
    lang: lang || 'en',
    country: country || 'us',
    max: max || 10,
    token: apiKey,
  };

  if (from) {
    query.from = from;
  }

  if (to) {
    query.to = to;
  }

  try {
    const response = await axios.get(url, { params: query });
    const articles = response.data.articles;
    cache.set(cacheKey, articles);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.get('/article/:title', async (req, res) => {
  const title = req.params.title;

  const cacheKey = `title:${title}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log('Cache hit!');
    return res.json(cachedData);
  }

  const url = 'https://gnews.io/api/v4/search';
  const apiKey = 'e08ac37079a2e6575eea98370016def7';
  const query = {
    q: title,
    lang: 'en',
    token: apiKey,
  };

  try {
    const response = await axios.get(url, { params: query });
    const articles = response.data.articles;
    if (articles.length === 0) {
      return res.status(404).json({ message: `Article with title "${title}" not found` });
    }
    const article = articles[0];
    cache.set(cacheKey, article);
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
