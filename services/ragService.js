/*
 * Retrieval-Augmented Generation (RAG) service
 *
 * This module defines a 'search' function that performs a retrieval
 * operation by calling an external RAG API. Query embeddings, vector
 * search, and ranking are handled by the external service. This
 * service simply delegates the query and returns the result. All
 * configuration such as API endpoint and keys are provided via
 * environment variables (RAG_API_URL and RAG_API_KEY) and should
 * never be hard-coded in source code.
 */

// Dynamically import node-fetch to avoid bundling in browsers
const fetch = require('node-fetch');

/**
 * Perform a search using RAG.
 *
 * @param {string} query
 * @returns {Promise<string>} result text from the RAG service
 */
async function search(query) {
  const endpoint = process.env.RAG_API_URL;
  if (!endpoint) {
    throw new Error('RAG_API_URL is not defined');
  }

  const url = `${endpoint}?q=${encodeURIComponent(query)}`;
  const options = {
    method: 'GET',
    headers: {}
  };

  // Include API key if provided
  if (process.env.RAG_API_KEY) {
    options.headers['Authorization'] = `Bearer ${process.env.RAG_API_KEY}`;
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`RAG search request failed: ${response.status} ${text}`);
  }
  const data = await response.json();
  return data.result || data.answer || JSON.stringify(data);
}

module.exports = {
  search,
};
