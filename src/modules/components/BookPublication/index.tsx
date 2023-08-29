import { useState, useEffect, useMemo, useCallback } from 'react'
import useStyles from './styles'
import { Paper, Button, Box } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import ModalBookPublish from '../ModalBookPublish'
import LoadingSimple from '../LoadingSimple'
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

  const searchBookTermFromLocation = useMemo((): string | undefined => state?.searchBookTerm, [state])

  const handleOpenModalBookPublish = () => {
    setOpenModalBookPublish(true)
  }

  const clearSearchTerm = useCallback(() => {
    navigate(location.pathname, { replace: true })
  }, [navigate])

  const listBooks = useCallback(async () => {
    setLoading(true)
    if (searchBookTermFromLocation) {
      clearSearchTerm()
      return
    }
    const booksData = await getAllBooks()
    setBooks(booksData)
    setLoading(false)
  }, [clearSearchTerm, searchBookTermFromLocation])

  const listBooksByTitle = async (title: string) => {
    setLoading(true)
    const booksData = await getBooksByTitle(title)
    setBooks(booksData)
    setLoading(false)
  }

  const handleCloseModalBookPublish = () => {
    setOpenModalBookPublish(false)
    listBooks()
  }

  useEffect(() => {
    if (searchBookTermFromLocation) {
      listBooksByTitle(searchBookTermFromLocation)
      return
    }
    listBooks()
  }, [listBooks, searchBookTermFromLocation])

  return (
    <div>
      <Paper elevation={0} className={classes.paper}>
        <Paper elevation={0} className={classes.paperPublish}>
          <Typography variant="h5" gutterBottom component="div">
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
        {searchBookTermFromLocation && (
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography color={'black'}>
                {`Vendo resultados da busca: ${searchBookTermFromLocation}`}
            </Typography>
            <Button onClick={clearSearchTerm} variant="outlined" startIcon={<HighlightOffIcon />}>
              Limpar busca
            </Button>
          </Box>
        )}
        {loading || !books.length
          ? (
            <LoadingSimple/>
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
