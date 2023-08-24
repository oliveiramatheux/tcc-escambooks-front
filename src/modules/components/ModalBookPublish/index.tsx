import { useEffect, useState } from 'react'
import useStyles from './styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button, FormControl, InputLabel, OutlinedInput, FormHelperText, IconButton, Chip, Box, Typography } from '@material-ui/core'
import { useTheme } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { regexNumber } from '../../../utils/regex'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { getStorageRef, uploadBytes, getDownloadURL } from '../../../config/firebase'
import Modal from '../Modal'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store/rootReducer'
import { bookCreateService, updateBookById } from '../../../routes/services/books'
import { Add } from '@material-ui/icons'
import SaveIcon from '@mui/icons-material/Save'
import { LoadingButton } from '@mui/lab'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

interface InterfaceModalProps {
  open: boolean
  closeAction: () => void
}

export interface BookFormState {
  title: string
  categories: string
  authors: string
  publisher: string
  publishedDate: string
  pageCount: number
  description: string
  language: string
}

const ModalBookPublish = (props: InterfaceModalProps): JSX.Element => {
  const { open, closeAction } = props
  const classes = useStyles()
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const [authors, setAuthors] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    clearErrors,
    setError,
    setValue,
    formState: { errors }
  } = useForm<BookFormState>({ mode: 'onBlur' })

  const [errorUploadBook, setErrorUploadBook] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [image, setImage] = useState<File | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const clearImageInfos = () => {
    setImage(null)
    setImageError(null)
  }

  const handleClose = () => {
    setOpenModal(false)
    closeAction()
    reset()
    setAuthors([])
    clearImageInfos()
  }

  const onChangeInputFileElement = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.length) return
    const arrayFiles = Array.from(files)
    setImage(arrayFiles[0])
    setImageError(null)
  }

  const uploadBookImages = async (image: File, bookId: string) => {
    const imageRef = getStorageRef(`images/user/${user.email}/books/${bookId}/${image.name}`)

    await uploadBytes(imageRef, image, { contentType: image.type }).then(async (imageUploaded) => {
      const imageUrl = await getDownloadURL(imageUploaded.ref)
      await updateBookById(bookId, { imageUrl, imageName: image.name })
    })
  }

  const onSubmit = async (data: BookFormState) => {
    if (!image) {
      setImageError('Pelo menos uma imagem do livro é obrigatória.')
      return
    }
    setLoading(true)
    const payload = { ...data }

    const bookCreateResponse = await bookCreateService({ ...payload, authors, categories: [data.categories], language: 'PT-BR' })

    if (!bookCreateResponse) {
      setErrorUploadBook(true)
      setLoading(false)
      setOpenModal(true)
      return
    }

    await uploadBookImages(image, bookCreateResponse.id)

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
  }, [authors.length, setValue])

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
              <FormControl className={classes.formControl} variant="outlined">
                {!errors.publishedDate ? (<InputLabel htmlFor="outlined-publishedDate">Ano de Publicação</InputLabel>) : (<InputLabel htmlFor="outlined-publishedDate" className={classes.errorHelperText}>Ano de Publicação</InputLabel>)}
                <OutlinedInput
                  id="outlined-publishedDate"
                  labelWidth={150}
                  error={!!errors.publishedDate}
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
              <FormControl className={classes.formControl} variant="outlined">
                {!errors.pageCount ? (<InputLabel htmlFor="outlined-pageCount">Número de páginas</InputLabel>) : (<InputLabel htmlFor="outlined-pageCount" className={classes.errorHelperText}>Número de páginas</InputLabel>)}
                <OutlinedInput
                  id="outlined-pageCount"
                  labelWidth={150}
                  error={!!errors.pageCount}
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
              <FormControl className={classes.formControl} variant="outlined">
                {!errors.description ? (<InputLabel htmlFor="outlined-description">Descrição</InputLabel>) : (<InputLabel htmlFor="outlined-description" className={classes.errorHelperText}>Descrição</InputLabel>)}
                <OutlinedInput
                  id="outlined-description"
                  labelWidth={150}
                  error={!!errors.description}
                  {...register('description', {
                    required: 'A descrição do livro é obrigatório.'
                  })}
                />
                {errors.description && (<FormHelperText id="outlined-helper-text-publisher" className={classes.errorHelperText}>{errors.description.message}</FormHelperText>)}
              </FormControl>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {image
                  ? (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <img src={URL.createObjectURL(image)} style={{ border: '1px solid black', maxHeight: '24px', maxWidth: '24px' }} alt="Imagem do livro" />
                        <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis', marginLeft: '12px', marginRight: '9px' }}>{image.name}</Typography>
                        <IconButton size="small" onClick={() => { setImage(null) }}>
                          <HighlightOffIcon />
                        </IconButton>
                      </div>
                    )
                  : (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <label htmlFor="icon-book-url">
                          <input style={{ display: 'none' }} accept="image/*" id="icon-book-url" type="file" onChange={onChangeInputFileElement} />
                          <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                          </IconButton>
                        </label>
                        {imageError
                          ? (<FormHelperText id="outlined-helper-text-images" className={classes.errorHelperText}>{imageError}</FormHelperText>)
                          : (<Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Anexe a imagem do seu livro</Typography >)}
                      </div>
                    )}
              </div>
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
                >
                  Publicar
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
        title={!errorUploadBook ? 'Livro publicado com sucesso!' : 'Ocorreu um erro ao publicar o livro!'}
        description={!errorUploadBook ? 'Seu livro logo aparecerá na timeline.' : 'Por favor tente novamente.'}
        closeAction={handleClose}
      />
    </>
  )
}

export default ModalBookPublish
