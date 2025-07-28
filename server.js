/*
 * Educational Solana API server
 *
 * This module sets up a minimal HTTP API for the educational dApp.  It exposes
 * endpoints for listing articles, performing search (via a retrieval‑augmented
 * generation service) and (optionally) constructing on‑chain donation
 * transactions.  Environment variables are used for configuration; secrets and
 * API keys should be injected at runtime and never hard‑coded.
 */

const express = require('express');
const bodyParser = require('body-parser');

const contentService = require('./services/contentService');
const ragService = require('./services/ragService');

/**
 * Create and configure the Express application.
 *
 * @returns {import('express').Express} configured app
 */
function createApp() {
  const app = express();
  app.use(bodyParser.json());

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // List all articles
  app.get('/api/articles', async (req, res) => {
    try {
      const articles = await contentService.listArticles();
      res.json({ articles });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to load articles' });
    }
  });

  // Get a single article by ID
  app.get('/api/articles/:id', async (req, res) => {
    try {
      const article = await contentService.getArticle(req.params.id);
      if (!article) {
        res.status(404).json({ error: 'Not found' });
      } else {
        res.json({ article });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch article' });
    }
  });

  // Search endpoint using retrieval‑augmented generation
  app.get('/api/search', async (req, res) => {
    const query = req.query.q || '';
    if (!query) {
      return res.status(400).json({ error: 'Missing query parameter q' });
    }
    try {
      const result = await ragService.search(query);
      res.json({ result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Search failed' });
    }
  });

  // Optional donation endpoint (server‑side helper).  This does not process
  // payments itself; instead it returns a prepared transaction object that
  // clients can sign with their wallet.  Implementing this endpoint requires
  // integration with the Solana web3 SDK and is left as an exercise.
  app.post('/api/donate', async (req, res) => {
    // Placeholder implementation; always return 501 (not implemented)
    res.status(501).json({ error: 'Donation endpoint not implemented' });
  });

  return app;
}

// If the script is executed directly (not imported), start the server.
if (require.main === module) {
  const port = process.env.PORT || 3000;
  const app = createApp();
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = { createApp };
