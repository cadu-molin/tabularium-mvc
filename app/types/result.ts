type Result<T, E> =
  | {
      success: true
      data: T // Quando success é true, data é obrigatório
      error?: never // Quando success é true, error não pode existir
    }
  | {
      success: false
      data?: never // Quando success é false, data não pode existir
      error: E // Quando success é false, error é obrigatório
    }

export type { Result }
