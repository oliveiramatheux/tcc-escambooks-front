/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContentText from '@mui/material/DialogContentText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Button, FormControl, InputLabel, OutlinedInput, FormHelperText, IconButton } from '@material-ui/core'
import { useTheme, styled } from '@mui/material/styles'
import { useForm } from 'react-hook-form'
import { regexNumber } from '../../../utils/regex'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { storage } from '../../../config/firebase'
import Modal from '../Modal'
import { useSelector, useDispatch } from 'react-redux'
import { ApplicationState } from '../../../store/rootReducer'
import { createBookAction } from '../../../store/books/actions'

const Input = styled('input')({
  display: 'none'
})

interface InterfaceModalProps {
  open: boolean
  closeAction: () => void
}

export interface BookFormState {
  title: string
  categories: string[]
  authors: string[]
  publisher: string
  publishedDate: string
  pageCount: number
  description: string
  image: any
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
  const dispatch = useDispatch()

  const { register, handleSubmit, reset, getValues, formState: { errors, dirtyFields } } = useForm<BookFormState>({ mode: 'onBlur' })

  const [errorUploadBook, setErrorUploadBook] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')

  const handleClose = () => {
    setOpenModal(false)
    closeAction()
    reset()
    setImageName('')
  }

  useEffect(() => {
    if (getValues('image') && getValues('image')[0] && getValues('image')[0].name) {
      setImageName(getValues('image')[0].name)
    }
  }, [getValues('image') || dirtyFields])

  // const uploadBookImages = async (image: any, bookId: string) => {
  //   const ref = storage.ref()
  //   const imageRef = ref.child(`images/user/${user.email}/books/${bookId}/${image.name}`)
  //   imageRef.put(image).then(async () => {
  //     const url = await imageRef.getDownloadURL()
  //     const bookRef = firestore.collection('books').doc(`${bookId}`)
  //     return bookRef.update({
  //       imageUrl: url,
  //       imageName: image.name
  //     })
  //   })
  // }

  const onSubmit = async (data: BookFormState) => {
    console.log('data antes de enviar', data)
    dispatch(createBookAction({ ...data, authors: ['teste'], categories: ['teste'], language: 'teste' }))
    setOpenModal(true)
  }

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
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
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
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
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
                {/* {errors.categories && (<FormHelperText id="outlined-helper-text-categories" className={classes.errorHelperText}>{errors.categories[0].message}</FormHelperText>)} */}
              </FormControl>
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
                {!errors.authors ? (<InputLabel htmlFor="outlined-authors">Autor</InputLabel>) : (<InputLabel htmlFor="outlined-authors" className={classes.errorHelperText}>Autor</InputLabel>)}
                <OutlinedInput
                  id="outlined-authors"
                  labelWidth={40}
                  error={!!errors.authors}
                  {...register('authors', {
                    required: 'O autor do livro é obrigatório.',
                    maxLength: {
                      value: 50,
                      message: 'O autor deve conter no máximo 50 caracteres.'
                    }
                  })}
                />
                {/* {errors.authors && (<FormHelperText id="outlined-helper-text-authors" className={classes.errorHelperText}>{errors.authors[0].message}</FormHelperText>)} */}
              </FormControl>
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
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
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
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
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
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
              <FormControl style={{ margin: '20px', width: '35ch' }} className={classes.formControl} variant="outlined">
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
              <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file"
                  {...register('image', {
                    required: 'Pelo menos uma imagem do livro é obrigatória.'
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
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  className={classes.button}
                  type={'submit'}
                >
                  Publicar
                </Button>
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