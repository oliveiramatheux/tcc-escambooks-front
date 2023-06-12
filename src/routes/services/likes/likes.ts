import axiosInstance from '../axios'
import { Like, LikesResponse, CreateLikePayload, UpdateLikePayload } from './types'

const getLikesThatUserLiked = async (userLikedId: string): Promise<Like[]> => {
  try {
    const { data } = await axiosInstance.get<LikesResponse>(`/likes/userLikedId/${userLikedId}`)
    return data.items || []
  } catch {
    return []
  }
}

const createLike = async (like: CreateLikePayload): Promise<Like | undefined> => {
  try {
    const { data } = await axiosInstance.post<Like>('/likes', like)
    return data
  } catch {
    return undefined
  }
}

const deleteLike = async (likeId: string): Promise<Like | undefined> => {
  try {
    const { data } = await axiosInstance.delete<Like>(`/likes/${likeId}`)
    return data
  } catch {
    return undefined
  }
}

const getUserLikes = async (bookUserId: string): Promise<LikesResponse | undefined> => {
  try {
    const { data } = await axiosInstance.get<LikesResponse>(`/likes/bookUserId/${bookUserId}`)
    return data
  } catch {
    return undefined
  }
}

const updateLike = async (likeId: string, like: UpdateLikePayload): Promise<Like | undefined> => {
  try {
    const { data } = await axiosInstance.patch<Like>(`/likes/${likeId}`, like)
    return data
  } catch {
    return undefined
  }
}

export { getLikesThatUserLiked, createLike, deleteLike, getUserLikes, updateLike }
