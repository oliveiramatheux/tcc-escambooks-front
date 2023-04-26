export interface UploadBookByIdPayload {
  title?: string
  authors?: string[]
  publisher?: string
  publishedDate?: string
  description?: string
  pageCount?: number
  categories?: string[]
  imageLinks?: {
    thumbnail?: string
  }
  language?: string
  previewLink?: string
}
