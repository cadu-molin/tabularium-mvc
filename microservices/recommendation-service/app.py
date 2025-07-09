from flask import Flask, request, jsonify
import numpy as np
import random
import requests

app = Flask(__name__)

BOOK_SERVICE_URL = 'http://localhost:5002/books'
USER_SERVICE_URL = 'http://localhost:5003/users/{}'

# Função de fitness: prioriza livros de autores/gêneros bem avaliados, evita livros já lidos e prioriza preferências do usuário
def fitness(individuo, historico_resenhas, livros_lidos, preferencias_usuario=None):
    score = 0
    autores_bem_avaliados = set()
    generos_bem_avaliados = set()
    for resenha in historico_resenhas:
        if resenha.get('nota', 0) >= 4:
            livro = next((l for l in individuo if l['id'] == resenha['livroId']), None)
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
        # Preferências do usuário
        if preferencias_usuario:
            if livro['genero'] == preferencias_usuario.get('generoFavorito'):
                score += 4
            if livro['autor'] == preferencias_usuario.get('autorFavorito'):
                score += 4
    return score

# Algoritmo genético real para recomendação de livros
def algoritmo_genetico(livros_pool, dados_usuario, historico_resenhas, livros_lidos, preferencias_usuario=None, n_recomendacoes=3, n_pop=20, n_geracoes=30):
    # Gera população inicial
    pool_disponivel = [l for l in livros_pool if l['id'] not in livros_lidos]
    if len(pool_disponivel) < n_recomendacoes:
        pool_disponivel = livros_pool  # fallback se usuário já leu quase tudo
    populacao = [random.sample(pool_disponivel, n_recomendacoes) for _ in range(n_pop)]
    for _ in range(n_geracoes):
        # Avalia fitness
        scores = [fitness(ind, historico_resenhas, livros_lidos, preferencias_usuario) for ind in populacao]
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
    scores = [fitness(ind, historico_resenhas, livros_lidos, preferencias_usuario) for ind in populacao]
    melhor = populacao[int(np.argmax(scores))]
    return melhor

@app.route('/recomendar', methods=['POST'])
def recomendar():
    data = request.get_json()
    usuario_id = data.get('usuarioId')
    dados_usuario = data.get('usuario', {})
    historico_resenhas = data.get('historico_resenhas', [])
    livros_lidos = data.get('livros_lidos', [])
    preferencias_usuario = None
    # Busca dados do usuário se usuarioId fornecido
    if usuario_id:
        try:
            resp_user = requests.get(USER_SERVICE_URL.format(usuario_id))
            resp_user.raise_for_status()
            usuario_data = resp_user.json()
            preferencias_usuario = usuario_data.get('preferencias')
        except Exception as e:
            return jsonify({'erro': 'Não foi possível obter dados do usuário', 'detalhe': str(e)}), 500
    # Busca a lista de livros do book-service
    try:
        resp = requests.get(BOOK_SERVICE_URL)
        resp.raise_for_status()
        livros_pool = resp.json()
    except Exception as e:
        return jsonify({'erro': 'Não foi possível obter a lista de livros', 'detalhe': str(e)}), 500
    recomendacoes = algoritmo_genetico(livros_pool, dados_usuario, historico_resenhas, livros_lidos, preferencias_usuario)
    return jsonify({"recomendacoes": recomendacoes})

if __name__ == '__main__':
    app.run(host='localhost', port=5001)
