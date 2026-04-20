// Shared global types for Tramitto frontend

export interface ApiResponse<T> {
  data: T
  isSuccess: boolean
  error?: ApiError
}

export interface ApiError {
  code: string
  name: string
}

export interface PaginatedResponse<T> {
  items: T[]
  totalCount: number
  page: number
  pageSize: number
}
