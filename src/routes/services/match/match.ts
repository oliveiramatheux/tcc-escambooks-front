import axiosInstance from '../axios'
import { Match, MatchDetails, MatchesResponse, UpdateMatchPayload } from './types'

export const getUserMatches = async (): Promise<MatchesResponse | undefined> => {
  try {
    const { data } = await axiosInstance.get<MatchesResponse>('/match')
    return data
  } catch {
    return undefined
  }
}

export const updateMatch = async (matchId: string, match: UpdateMatchPayload): Promise<Match | undefined> => {
  try {
    const { data } = await axiosInstance.patch<Match>(`/match/${matchId}`, match)
    return data
  } catch {
    return undefined
  }
}

export const getMatchDetails = async (matchId: string): Promise<MatchDetails | undefined> => {
  try {
    const { data } = await axiosInstance.get<MatchDetails>(`/match/${matchId}`)
    return data
  } catch {
    return undefined
  }
}
