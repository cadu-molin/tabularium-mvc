from flask import Flask, request, jsonify
import numpy as np
import random

app = Flask(__name__)

# Pool simulado de livros
LIVROS_POOL = [
    {"id": 1, "titulo": "Python para Iniciantes", "autor": "Ana Silva", "genero": "Tecnologia"},
    {"id": 2, "titulo": "Aventuras no Espaço", "autor": "Carlos Souza", "genero": "Ficção"},
    {"id": 3, "titulo": "História do Brasil", "autor": "Maria Lima", "genero": "História"},
    {"id": 4, "titulo": "Culinária Fácil", "autor": "João Pedro", "genero": "Gastronomia"},
    {"id": 5, "titulo": "O Mistério da Casa", "autor": "Ana Silva", "genero": "Suspense"},
    {"id": 6, "titulo": "Viagem ao Centro da Terra", "autor": "Carlos Souza", "genero": "Aventura"},
    {"id": 7, "titulo": "Aprendendo JavaScript", "autor": "Ana Silva", "genero": "Tecnologia"},
    {"id": 8, "titulo": "O Segredo das Estrelas", "autor": "Carlos Souza", "genero": "Ficção"},
    {"id": 9, "titulo": "Receitas Veganas", "autor": "João Pedro", "genero": "Gastronomia"},
    {"id": 10, "titulo": "Brasil Colonial", "autor": "Maria Lima", "genero": "História"},
]

# Função de fitness: prioriza livros de autores/gêneros bem avaliados e evita livros já lidos
def fitness(individuo, historico_resenhas, livros_lidos):
    score = 0
    autores_bem_avaliados = set()
    generos_bem_avaliados = set()
    for resenha in historico_resenhas:
        if resenha.get('nota', 0) >= 4:
            livro = next((l for l in LIVROS_POOL if l['id'] == resenha['livroId']), None)
            if livro:
                autores_bem_avaliados.add(livro['autor'])
                generos_bem_avaliados.add(livro['genero'])
    for livro in individuo:
        if livro['id'] in livros_lidos:
            score -= 5  # penaliza livro já lido
        if livro['autor'] in autores_bem_avaliados:
            score += 3
        if livro['genero'] in generos_bem_avaliados:
            score += 2
    return score

# Algoritmo genético real para recomendação de livros
def algoritmo_genetico(dados_usuario, historico_resenhas, livros_lidos, n_recomendacoes=3, n_pop=20, n_geracoes=30):
    # Gera população inicial
    pool_disponivel = [l for l in LIVROS_POOL if l['id'] not in livros_lidos]
    if len(pool_disponivel) < n_recomendacoes:
        pool_disponivel = LIVROS_POOL  # fallback se usuário já leu quase tudo
    populacao = [random.sample(pool_disponivel, n_recomendacoes) for _ in range(n_pop)]
    for _ in range(n_geracoes):
        # Avalia fitness
        scores = [fitness(ind, historico_resenhas, livros_lidos) for ind in populacao]
        # Seleção dos melhores
        pais_idx = np.argsort(scores)[-n_pop//2:]
        pais = [populacao[i] for i in pais_idx]
        # Cruzamento
        filhos = []
        while len(filhos) < n_pop - len(pais):
            pai1, pai2 = random.sample(pais, 2)
            corte = random.randint(1, n_recomendacoes-1)
            filho = pai1[:corte] + [l for l in pai2 if l not in pai1[:corte]]
            # Mutação: troca um livro aleatório
            if random.random() < 0.3:
                idx = random.randint(0, n_recomendacoes-1)
                opcoes = [l for l in pool_disponivel if l not in filho]
                if opcoes:
                    filho[idx] = random.choice(opcoes)
            # Garante tamanho
            filho = filho[:n_recomendacoes]
            filhos.append(filho)
        populacao = pais + filhos
    # Retorna o melhor indivíduo
    scores = [fitness(ind, historico_resenhas, livros_lidos) for ind in populacao]
    melhor = populacao[int(np.argmax(scores))]
    return melhor

@app.route('/recomendar', methods=['POST'])
def recomendar():
    data = request.get_json()
    dados_usuario = data.get('usuario', {})
    historico_resenhas = data.get('historico_resenhas', [])
    livros_lidos = data.get('livros_lidos', [])
    recomendacoes = algoritmo_genetico(dados_usuario, historico_resenhas, livros_lidos)
    return jsonify({"recomendacoes": recomendacoes})

if __name__ == '__main__':
    app.run(host='localhost', port=5001)
