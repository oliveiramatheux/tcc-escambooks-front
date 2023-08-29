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
  const [loading, setLoading] = useState(false)

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
    <div>
      <Paper elevation={0} className={classes.paper}>
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
            <Typography color={'black'}>
                {`Vendo resultados da busca: ${searchBookTerm}`}
            </Typography>
            <Button onClick={() => { setSearchBookTerm('') }} variant="outlined" startIcon={<HighlightOffIcon />}>
              Limpar busca
            </Button>
          </Box>
        )}
        {loading || !books.length
          ? (
            <div style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>
              <CircularProgress />
            </div>
            )
          : (
              <Box>
                {books.map((value) => {
                  return (
                    <BookCard id={value.id} key={value.id} book={value} listBooks={listBooks} />
                  )
                })}
              </Box>
            )
        }
        {openModalBookPublish && (<ModalBookPublish
          open={openModalBookPublish}
          closeAction={handleCloseModalBookPublish}
        />)}
      </Paper>
    </div>
  )
}

export default BookPublication
