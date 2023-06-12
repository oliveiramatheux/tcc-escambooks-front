export interface Like {
  id: string
  bookId: string
  bookTitle: string
  bookUserId: string
  userLikedId: string
  userLikedName: string
  isVisualized: boolean
  date: string
}

export interface LikesResponse {
  items: Like[]
  totalItems: number
  totalItemsNotVisualized: number
}

export interface CreateLikePayload {
  bookId: string
  bookTitle: string
  bookUserId: string
  userLikedId: string
  userLikedName: string
  isVisualized?: boolean
}

export interface UpdateLikePayload {
  bookId?: string
  bookTitle?: string
  bookUserId?: string
  userLikedId?: string
  userLikedName?: string
  isVisualized?: boolean
}
