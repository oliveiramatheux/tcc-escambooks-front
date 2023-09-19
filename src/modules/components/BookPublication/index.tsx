import { useState, useEffect, useMemo, useCallback } from 'react'
import useStyles from './styles'
import { Paper, Button, Box, CircularProgress } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import ModalBookPublish from '../ModalBookPublish'
import { Book, getAllBooks, getBooksByTitle } from '../../../routes/services/books'
import BookCard from '../BookCard'
import { useLocation, useNavigate } from 'react-router-dom'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const BookPublication = (): JSX.Element => {
  const classes = useStyles()
  const { state } = useLocation()
  const navigate = useNavigate()

  const [openModalBookPublish, setOpenModalBookPublish] = useState<boolean>(false)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)

  const searchBookTermFromLocationState = useMemo((): string | undefined => state?.searchBookTerm, [state])

  const [searchBookTerm, setSearchBookTerm] = useState<string | undefined>(searchBookTermFromLocationState)

  const handleOpenModalBookPublish = () => {
    setOpenModalBookPublish(true)
  }

  const clearSearchTerm = useCallback(() => {
    navigate(location.pathname, { replace: true })
  }, [navigate])

  const listAllBooks = useCallback(async () => {
    setLoading(true)
    const booksData = await getAllBooks()
    setBooks(booksData)
    setLoading(false)
  }, [])

  const listBooksByTitle = useCallback(async (title: string) => {
    setLoading(true)
    const booksData = await getBooksByTitle(title)
    setBooks(booksData)
    setLoading(false)
  }, [])

  const listBooks = useCallback(() => {
    if (searchBookTerm) {
      listBooksByTitle(searchBookTerm)
      return
    }
    listAllBooks()
  }, [listAllBooks, listBooksByTitle, searchBookTerm])

  const handleCloseModalBookPublish = () => {
    setOpenModalBookPublish(false)
    listBooks()
  }

  const emptyStateMessage = useMemo(() => searchBookTerm ? 'Nenhum resultado encontrado para esse título do livro, por favor verifique se escreveu corretamente e tente novamente.' : 'Nenhum resultado encontrado para a busca, por favor tente novamente.', [searchBookTerm])

  const renderResult = () => {
    if (loading) {
      return (
      <div style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px',
        width: '100%'
      }}>
        <CircularProgress />
      </div>
      )
    }
    if (books.length) {
      return (
        <Box>
          {books.map((value) => {
            return (
              <BookCard id={value.id} key={value.id} book={value} listBooks={listBooks} />
            )
          })}
        </Box>
      )
    }
    return (
      <div style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '40px',
        width: '100%'
      }}>
          <Typography fontWeight={700} color={'black'} textAlign={'center'} fontFamily={'system-ui'}>{emptyStateMessage}</Typography>
          <Button variant="contained" size="large" color="primary" style={{ marginTop: '16px', fontFamily: 'system-ui' }} onClick={listBooks}>Refazer busca</Button>
      </div>
    )
  }

  useEffect(() => {
    listBooks()
  }, [listBooks])

  useEffect(() => {
    if (searchBookTermFromLocationState) {
      setSearchBookTerm(searchBookTermFromLocationState)
      clearSearchTerm()
    }
  }, [clearSearchTerm, searchBookTermFromLocationState])

  return (
    <>
      <div className={classes.paper}>
        <Paper elevation={0} className={classes.paperPublish}>
          <Typography variant="h5" component="div">
            Qual livro deseja publicar?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<PublishRoundedIcon />}
            onClick={handleOpenModalBookPublish}
          >
            Publicar
          </Button>
        </Paper>
        {searchBookTerm && (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography color={'black'} fontWeight={700}>
                {`Vendo resultados da busca: ${searchBookTerm}`}
            </Typography>
            <Button
              onClick={() => { setSearchBookTerm('') }}
              size="large"
              color="primary"
              className={classes.cleanSearchButton}
              variant="outlined"
              startIcon={<HighlightOffIcon />}
            >
              Limpar busca
            </Button>
          </Box>
        )}
        {renderResult()}
      </div>
      {openModalBookPublish && (<ModalBookPublish
        open={openModalBookPublish}
        closeAction={handleCloseModalBookPublish}
      />)}
    </>
  )
}

export default BookPublication
