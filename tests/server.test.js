const request = require('supertest');
const app = require('../server');

// Test health endpoint
describe('GET /health', () => {
  it('should return 200 OK with status healthy', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
  });
});

// Test listing articles
describe('GET /articles', () => {
  it('should return list of articles without body', async () => {
    const res = await request(app).get('/articles');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('title');
    expect(res.body[0]).not.toHaveProperty('body');
  });
});

// Test retrieving single article
describe('GET /articles/:id', () => {
  it('should return article with specified id', async () => {
    const res = await request(app).get('/articles/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id', '1');
    expect(res.body).toHaveProperty('body');
  });

  it('should return 404 for non-existing id', async () => {
    const res = await request(app).get('/articles/999');
    expect(res.statusCode).toBe(404);
  });
});

// Test search endpoint (RAG)
describe('GET /search', () => {
  it('should return search results for a query', async () => {
    const res = await request(app).get('/search').query({ q: 'Solana' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('results');
  });
});
