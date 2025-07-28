# solana-edu-dapp

Educational dApp for learning about the Solana blockchain. This repository contains a lightweight API server, sample articles, a retrieval‑augmented search endpoint and tests. It is designed as a teaching aid rather than a production‑ready service.

## Features

- **Express API** exposing endpoints to list articles, fetch an article by id, perform a RAG search and prepare donation transactions.
- **Content service** loads articles from a JSON file; replace with a database or CMS in production.
- **RAG service** posts search queries to an external RAG API defined by `RAG_API_URL`. An optional `RAG_API_KEY` can be provided. The service never stores secrets in code.
- **Tests** implemented with Jest and Supertest. Test the health check, articles endpoints and the search endpoint.

## Getting started

1. **Clone the repository** and install dependencies:

```bash
git clone https://github.com/BA-CalderonMorales/solana-edu-dapp.git
cd solana-edu-dapp
npm install
```

2. **Configure environment variables.** Create a `.env` file in the project root and set the following variables:

```dotenv
PORT=3000               # Port to run the API server (default 3000)
RAG_API_URL=https://example.com/api/rag   # Endpoint of your RAG service
RAG_API_KEY=your-api-key                  # Optional API key for RAG service
```

Do not commit the `.env` file to version control.

3. **Run the server**:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

4. **Run tests**:

```bash
npm test
```

## Deployment

The API can be deployed to any Node.js‑compatible platform (e.g. Vercel, Render, AWS Lambda). Set environment variables via the hosting platform’s configuration. Use TLS termination at the edge and restrict CORS origins if serving from a browser.

## Security considerations

- Secrets (API keys, database credentials) must be provided via environment variables or secret managers. Do not hard‑code them in the codebase or commit them to version control.
- The server enables CORS to allow browser clients; restrict allowed origins via configuration in production.
- Input to the search endpoint is passed directly to the RAG API; sanitise or validate queries as needed depending on the upstream service.
- Files are kept under 500 lines for maintainability; separate modules for services and tests.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
[](url)
