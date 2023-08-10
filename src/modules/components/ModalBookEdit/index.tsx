/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import useStyles from './styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button, FormControl, InputLabel, OutlinedInput, FormHelperText, IconButton, Box, Chip } from '@material-ui/core'
import { useTheme, styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { regexNumber } from '../../../utils/regex'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { getStorageRef, uploadBytes, getDownloadURL, deleteFile } from '../../../config/firebase'
import Modal from '../Modal'
import { BookFormState } from '../ModalBookPublish'
import { Book, updateBookById } from '../../../routes/services/books'
import { Add } from '@material-ui/icons'
import SaveIcon from '@mui/icons-material/Save'
import { LoadingButton } from '@mui/lab'

const Input = styled('input')({
  display: 'none'
})

interface InterfaceModalProps {
  open: boolean
  closeAction: () => void
  bookData: Book
}

const ModalBookEdit = (props: InterfaceModalProps): JSX.Element => {
  const { open, closeAction, bookData } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [authors, setAuthors] = useState<string[]>(bookData.authors)
  const { register, handleSubmit, reset, getValues, clearErrors, setError, setValue, formState: { errors, dirtyFields, isDirty } } = useForm<BookFormState>({ mode: 'onBlur' })

  const [errorUploadBook, setErrorUploadBook] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>(bookData.imageName || '')
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setImageName('')
    setValue('image', undefined)
    reset({})
    setOpenModal(false)
    closeAction()
  }

  useEffect(() => {
    if (getValues('image') && getValues('image')[0] && getValues('image')[0].name) {
      setImageName(getValues('image')[0].name)
    }
  }, [getValues('image') || dirtyFields])

  const uploadBookImages = async (image: any, bookId: string) => {
    const imageDeleteRef = getStorageRef(`images/user/${bookData.userEmail}/books/${bookData.id}/${bookData.imageName}`)

    await deleteFile(imageDeleteRef)

    const imageRef = getStorageRef(`images/user/${bookData.userEmail}/books/${bookId}/${image.name}`)

    await uploadBytes(imageRef, image, { contentType: image.type }).then(async (imageUploaded) => {
      const imageUrl = await getDownloadURL(imageUploaded.ref)
      await updateBookById(bookId, { imageUrl, imageName: image.name })
    })
  }

  const onSubmit = async (data: BookFormState) => {
    setLoading(true)
    const payload = { ...data, image: undefined }

    const bookUpdateResponse = await updateBookById(bookData.id, { ...payload, authors, categories: [data.categories] })

    if (!bookUpdateResponse) {
      setErrorUploadBook(true)
      setLoading(false)
      setOpenModal(true)
      return
    }

    if (data.image.length) await uploadBookImages(data.image[0], bookData.id)

    setLoading(false)
    setOpenModal(true)
  }

  const handleAddAuthor = () => {
    if (getValues('authors').trim().length > 0) {
      clearErrors('authors')
      setAuthors((current) => [...current, getValues('authors')])
    }
  }

  const handleDeleteAuthor = (index: number) => {
    if (authors.length === 1) setError('authors', { message: 'O autor do livro é obrigatório.' })
    setAuthors(authors.filter((_item, i) => i !== index))
  }

  useEffect(() => {
    setValue('authors', '')
  }, [authors.length])

  useEffect(() => {
    setImageName(bookData.imageName || '')
  }, [bookData])

  return (
    <>
      <div>
        <Dialog
          open={open}
          onClose={closeAction}
          fullScreen={fullScreen}
          className={classes.dialog}
        >
          <DialogTitle id="scroll-dialog-title" className={classes.modalTitle}>Publicação</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
            <DialogContent className={classes.root}>
              <DialogContentText>
              Preencha as informações do Livro.
              </DialogContentText>
              <FormControl className={classes.formControl} variant="outlined">
                {!errors.title ? (<InputLabel htmlFor="outlined-title">Título</InputLabel>) : (<InputLabel htmlFor="outlined-title" className={classes.errorHelperText}>Título</InputLabel>)}
                <OutlinedInput
                  id="outlined-title"
                  labelWidth={40}
                  error={!!errors.title}
                  defaultValue={bookData.title}
                  {...register('title', {
                    required: 'O título do livro é obrigatório.',
                    maxLength: {
                      value: 50,
                      message: 'O título deve conter no máximo 50 caracteres.'
                    }
                  })}
                />
                {errors.title && (<FormHelperText id="outlined-helper-text-title" className={classes.errorHelperText}>{errors.title.message}</FormHelperText>)}
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                {!errors.categories ? (<InputLabel htmlFor="outlined-categories">Gênero</InputLabel>) : (<InputLabel htmlFor="outlined-categories" className={classes.errorHelperText}>Gênero</InputLabel>)}
                <OutlinedInput
                  id="outlined-categories"
                  labelWidth={55}
                  error={!!errors.categories}
                  defaultValue={bookData.categories}
                  {...register('categories', {
                    required: 'O gênero do livro é obrigatório.',
                    maxLength: {
                      value: 50,
                      message: 'O gênero deve conter no máximo 50 caracteres.'
                    }
                  })}
                />
                {errors.categories && (<FormHelperText id="outlined-helper-text-categories" className={classes.errorHelperText}>{errors.categories.message}</FormHelperText>)}
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                <InputLabel htmlFor="authors" className={errors.authors ? classes.errorHelperText : ''}>Autores</InputLabel>
                <OutlinedInput
                  id="authors"
                  labelWidth={55}
                  error={!!errors.authors}
                  {...register('authors', {
                    validate: () => authors.length > 0 || 'O autor do livro é obrigatório.',
                    maxLength: {
                      value: 50,
                      message: 'O autor deve conter no máximo 50 caracteres.'
                    }
                  })}
                  endAdornment={<IconButton onClick={handleAddAuthor}><Add /></IconButton>}
                />
                {errors.authors && (<FormHelperText id="outlined-helper-text-authors" className={classes.errorHelperText}>{errors.authors.message}</FormHelperText>)}
                <Box display="flex" flexWrap="wrap">
                  {authors?.map((author, index) => (
                    <Box key={index} width="fit-content" p={0.5}>
                      <Chip label={author} onDelete={() => { handleDeleteAuthor(index) }}/>
                    </Box>
                  ))}
                </Box>
              </FormControl>
              <FormControl className={classes.formControl} variant="outlined">
                {!errors.publisher ? (<InputLabel htmlFor="outlined-publisher">Editora</InputLabel>) : (<InputLabel htmlFor="outlined-publisher" className={classes.errorHelperText}>Editora</InputLabel>)}
                <OutlinedInput
                  id="outlined-publisher"
                  labelWidth={50}
                  error={!!errors.publisher}
                  defaultValue={bookData.publisher}
                  {...register('publisher', {
                    required: 'A editora do livro é obrigatório.',
                    maxLength: {
                      value: 50,
                      message: 'A editora deve conter no máximo 50 caracteres.'
                    }
                  })}
                />
                {errors.publisher && (<FormHelperText id="outlined-helper-text-publisher" className={classes.errorHelperText}>{errors.publisher.message}</FormHelperText>)}
              </FormControl>
              <FormControl className={classes.formControlWithoutWidth} variant="outlined">
                {!errors.publishedDate ? (<InputLabel htmlFor="outlined-publishedDate">Ano de Publicação</InputLabel>) : (<InputLabel htmlFor="outlined-publishDate" className={classes.errorHelperText}>Ano de Publicação</InputLabel>)}
                <OutlinedInput
                  id="outlined-publishedDate"
                  labelWidth={150}
                  error={!!errors.publishedDate}
                  defaultValue={bookData.publishedDate}
                  {...register('publishedDate', {
                    required: 'O ano de publicação do livro é obrigatório.',
                    pattern: {
                      value: regexNumber,
                      message: 'O ano de publicação deve ser válido.'
                    },
                    minLength: {
                      value: 4,
                      message: 'O ano de publicação deve ser válido.'
                    },
                    maxLength: {
                      value: 4,
                      message: 'O ano de publicação deve ser válido.'
                    }
                  })}
                />
                {errors.publishedDate && (<FormHelperText id="outlined-helper-text-publisher" className={classes.errorHelperText}>{errors.publishedDate.message}</FormHelperText>)}
              </FormControl>
              <FormControl className={classes.formControlWithoutWidth} variant="outlined">
                {!errors.pageCount ? (<InputLabel htmlFor="outlined-pageCount">Número de páginas</InputLabel>) : (<InputLabel htmlFor="outlined-pageCount" className={classes.errorHelperText}>Número de páginas</InputLabel>)}
                <OutlinedInput
                  id="outlined-pageCount"
                  labelWidth={150}
                  error={!!errors.pageCount}
                  defaultValue={bookData.pageCount}
                  {...register('pageCount', {
                    required: 'O número de páginas do livro é obrigatório.',
                    pattern: {
                      value: regexNumber,
                      message: 'O número de páginas do livro deve ser válido.'
                    },
                    maxLength: {
                      value: 10,
                      message: 'O número de páginas deve conter no máximo 10 caracteres.'
                    }
                  })}
                />
                {errors.pageCount && (<FormHelperText id="outlined-helper-text-publisher" className={classes.errorHelperText}>{errors.pageCount.message}</FormHelperText>)}
              </FormControl>
              <FormControl className={classes.formControlWithoutWidth} variant="outlined">
                {!errors.description ? (<InputLabel htmlFor="outlined-description">Descrição</InputLabel>) : (<InputLabel htmlFor="outlined-description" className={classes.errorHelperText}>Descrição</InputLabel>)}
                <OutlinedInput
                  id="outlined-description"
                  labelWidth={150}
                  error={!!errors.description}
                  defaultValue={bookData.description}
                  {...register('description', {
                    required: 'A descrição do livro é obrigatório.'
                  })}
                />
                {errors.description && (<FormHelperText id="outlined-helper-text-publisher" className={classes.errorHelperText}>{errors.description.message}</FormHelperText>)}
              </FormControl>
              <label htmlFor="icon-book-url-edit">
                <Input accept="image/*" id="icon-book-url-edit" type="file"
                  {...register('image', {
                    required: bookData.imageUrl && bookData.imageName ? undefined : 'Pelo menos uma imagem do livro é obrigatória.'
                  })}/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
                {imageName}
                {errors.image && (<FormHelperText id="outlined-helper-text-images" className={classes.errorHelperText}><>{errors.image.message}</></FormHelperText>)}
              </label>
            </DialogContent>
            <DialogActions>
              <div className={classes.divButtons}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  sx={{ margin: '16px' }}
                  type={'submit'}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  disabled={!isDirty}
                >
                  Editar
                </LoadingButton>
                <Button
                  variant="outlined"
                  color="default"
                  size="medium"
                  className={classes.button}
                  onClick={() => {
                    handleClose()
                  }}
                >
                  Fechar
                </Button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </div>
      <Modal
        open={openModal}
        title={!errorUploadBook ? 'Livro editado com sucesso!' : 'Ocorreu um erro ao editar o livro!'}
        description={!errorUploadBook ? 'Seu livro logo aparecerá na timeline.' : 'Por favor tente novamente.'}
        closeAction={handleClose}
      />
    </>
  )
}

export default ModalBookEdit
