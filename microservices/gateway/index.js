// Gateway básico para microsserviços
// Como rodar:
// 1. Inicie o recommendation-service: python microservices/recommendation-service/app.py
// 2. Inicie este gateway: node gateway/index.js

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.json());

// Proxy para o recommendation-service
app.use('/recomendar', createProxyMiddleware({
  target: 'http://localhost:5001',
  changeOrigin: true,
  pathRewrite: {
    '^/recomendar': '/recomendar',
  },
}));

// Proxy para o book-service
app.use('/books', createProxyMiddleware({
  target: 'http://localhost:5002',
  changeOrigin: true,
  pathRewrite: {
    '^/books': '/books',
  },
}));

// Proxy para o user-service
app.use('/users', createProxyMiddleware({
  target: 'http://localhost:5003',
  changeOrigin: true,
  pathRewrite: {
    '^/users': '/users',
  },
}));

app.listen(3000, () => {
  console.log('API Gateway rodando em http://localhost:3000');
});
