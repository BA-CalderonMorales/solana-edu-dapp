/*
 * Content service
 *
 * This module provides functions to list and fetch educational articles.  In a
 * production deployment you would replace the in‑memory store with a proper
 * database (e.g., PostgreSQL or MongoDB).  The service functions are
 * asynchronous to illustrate how they might perform database I/O.
 */

const fs = require('fs');
const path = require('path');

// Load sample articles from a JSON file.  Each article has an id, title and
// body.  In a real application this data would live in a database or CMS.
const ARTICLES_FILE = path.join(__dirname, '..', 'data', 'articles.json');

/**
 * Read the articles file from disk.  Returns an empty array if the file
 * does not exist or cannot be parsed.
 *
 * @returns {Promise<Array<{id: string, title: string, body: string}>>}
 */
async function readArticles() {
  try {
    const raw = await fs.promises.readFile(ARTICLES_FILE, 'utf8');
    const articles = JSON.parse(raw);
    return Array.isArray(articles) ? articles : [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

/**
 * Return all articles.
 *
 * @returns {Promise<Array<{id: string, title: string}>>}
 */
async function listArticles() {
  const articles = await readArticles();
  // Return only metadata (id and title) for listing
  return articles.map(({ id, title }) => ({ id, title }));
}

/**
 * Fetch a single article by id.
 *
 * @param {string} id
 * @returns {Promise<{id: string, title: string, body: string} | undefined>}
 */
async function getArticle(id) {
  const articles = await readArticles();
  return articles.find((a) => a.id === id);
}

module.exports = {
  listArticles,
  getArticle,
};
