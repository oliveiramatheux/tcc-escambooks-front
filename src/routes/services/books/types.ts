export interface UploadBookByIdPayload {
  title?: string
  authors?: string[]
  publisher?: string
  publishedDate?: string
  description?: string
  pageCount?: number
  categories?: string[]
  imageUrl?: string
  imageName?: string
  language?: string
  previewLink?: string
}
