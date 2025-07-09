const express = require('express');
const app = express();

const livros = [
  { id: 1, titulo: 'Python para Iniciantes', autor: 'Ana Silva', genero: 'Tecnologia' },
  { id: 2, titulo: 'Aventuras no Espaço', autor: 'Carlos Souza', genero: 'Ficção' },
  { id: 3, titulo: 'História do Brasil', autor: 'Maria Lima', genero: 'História' },
  { id: 4, titulo: 'Culinária Fácil', autor: 'João Pedro', genero: 'Gastronomia' },
  { id: 5, titulo: 'O Mistério da Casa', autor: 'Ana Silva', genero: 'Suspense' },
  { id: 6, titulo: 'Viagem ao Centro da Terra', autor: 'Carlos Souza', genero: 'Aventura' },
  { id: 7, titulo: 'Aprendendo JavaScript', autor: 'Ana Silva', genero: 'Tecnologia' },
  { id: 8, titulo: 'O Segredo das Estrelas', autor: 'Carlos Souza', genero: 'Ficção' },
  { id: 9, titulo: 'Receitas Veganas', autor: 'João Pedro', genero: 'Gastronomia' },
  { id: 10, titulo: 'Brasil Colonial', autor: 'Maria Lima', genero: 'História' },
];

app.get('/books', (req, res) => {
  res.json(livros);
});

app.listen(5002, () => {
  console.log('Book Service rodando em http://localhost:5002');
});
