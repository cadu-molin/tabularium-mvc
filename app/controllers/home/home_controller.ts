import type { HttpContext } from '@adonisjs/core/http'
import RecommendationService from '#services/recommendation/recommendation_service'

export default class HomeController {
  async show({ inertia }: HttpContext) {
    // Exemplo de dados simulados
    const usuario = { id: 1, nome: 'João' }
    const historicoResenhas = [
      { livroId: 1, nota: 5, comentario: 'Ótimo livro!' },
      { livroId: 2, nota: 3, comentario: 'Mediano.' }
    ]
    const livrosLidos = [1, 2, 3]
    let recomendacoes = []
    try {
      recomendacoes = await RecommendationService.getRecommendations(usuario, historicoResenhas, livrosLidos)
    } catch (e) {
      // Em produção, logar erro
      recomendacoes = []
    }
    return inertia.render('home/index', { recomendacoes })
  }
}
