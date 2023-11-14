import { Book } from '../books'
import { User } from '../user'

export interface MatchUser {
  userId: string
  isVisualized: boolean
}

export interface Match {
  id: string
  books: string[]
  users: MatchUser[]
  likes: string[]
  usersConfirmed?: string[]
  isVisualized: boolean
  date?: string
}

export interface MatchesResponse {
  items: Match[]
  totalItems: number
  totalItemsNotVisualized: number
}

export interface UpdateMatchPayload {
  books?: string[]
  users?: MatchUser[]
  likes?: string[]
  usersConfirmed?: string[]
}

export interface MatchDetails {
  match: Match
  currentUser: User
  otherUser: User
  currentUserBook: Book
  otherUserBook: Book
}
