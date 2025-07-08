# Microserviço de Recomendação de Livros

Este microserviço recebe dados do usuário, histórico de resenhas e livros lidos via HTTP (JSON), executa um algoritmo de busca genética e retorna recomendações de livros.

## Como rodar

1. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```
2. Inicie o serviço:
   ```bash
   python app.py
   ```

## Endpoint

- `POST /recomendar`
  - Recebe: JSON com dados do usuário, histórico de resenhas e livros lidos
  - Retorna: JSON com recomendações de livros

## Exemplo de integração
Veja o README do projeto principal para exemplo de chamada HTTP. 
