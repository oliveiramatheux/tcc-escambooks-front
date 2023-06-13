import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { Paper, Button } from '@material-ui/core'
import Typography from '@mui/material/Typography'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import ModalBookPublish from '../ModalBookPublish'
import LoadingSimple from '../LoadingSimple'
import { Book, getAllBooks } from '../../../routes/services/books'
import BookCard from '../BookCard'

const BookPublication = (): JSX.Element => {
  const classes = useStyles()

  const [openModalBookPublish, setOpenModalBookPublish] = useState<boolean>(false)
  const [books, setBooks] = useState<Book[]>([])

  const handleOpenModalBookPublish = () => {
    setOpenModalBookPublish(true)
  }

  const listBooks = async () => {
    const booksData = await getAllBooks()
    setBooks(booksData)
  }

  const handleCloseModalBookPublish = () => {
    setOpenModalBookPublish(false)
    listBooks()
  }

  useEffect(() => {
    listBooks()
  }, [])

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
        {books.length
          ? books.map((value) => {
            return (
              <BookCard key={value.id} book={value} listBooks={listBooks} />
            )
          })
          : <LoadingSimple/>}
        <ModalBookPublish
          open={openModalBookPublish}
          closeAction={handleCloseModalBookPublish}
        />
      </Paper>
    </div>
  )
}

export default BookPublication
