const express = require('express');
const app = express();

const usuarios = [
  { id: 1, name: 'Usuário Exemplo 1', preferencias: { generoFavorito: 'Tecnologia', autorFavorito: 'Ana Silva' } },
  { id: 2, name: 'Usuário Exemplo 2', preferencias: { generoFavorito: 'Ficção', autorFavorito: 'Carlos Souza' } }
];

app.get('/users', (req, res) => {
  res.json(usuarios);
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ erro: 'Usuário não encontrado' });
  }
});

app.listen(5003, () => {
  console.log('User Service rodando em http://localhost:5003');
});
