import Book from '#models/book'

export default class RecommendationService {
  static async getRecommendations(usuario: any, historicoResenhas: any[], livrosLidos: any[]) {
    const response = await fetch('http://localhost:5001/recomendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, historico_resenhas: historicoResenhas, livros_lidos: livrosLidos })
    })
    if (!response.ok) {
      throw new Error('Erro ao obter recomendações do microserviço')
    }
    const data = await response.json() as { recomendacoes: Book[] }
    return data.recomendacoes
  }
}
