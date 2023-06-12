import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { Paper, Button, Chip } from '@material-ui/core'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import userDefault from '../../../images/user-default.png'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import ModalBookPublish from '../ModalBookPublish'
import LoadingSimple from '../LoadingSimple'
import { differenceBetweenTwoDates } from '../../../utils/helpers'
import { Book, createLike, deleteLike, getAllBooks, getLikesThatUserLiked } from '../../../routes/services'
import { ApplicationState } from '../../../store/rootReducer'
import { useSelector } from 'react-redux'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookSettings from '../BookSettings'

const BookPublication = (): JSX.Element => {
  const classes = useStyles()
  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const [openModalBookPublish, setOpenModalBookPublish] = useState<boolean>(false)
  const [books, setBooks] = useState<Book[]>([])

  const handleOpenModalBookPublish = () => {
    setOpenModalBookPublish(true)
  }

  const booksWithUserLikes = async (books: Book[]) => {
    const likes = await getLikesThatUserLiked(user.id)

    likes.forEach(like => {
      books.forEach(book => {
        if (like.bookId === book.id) {
          const index = books.indexOf(book)
          books[index] = { ...book, alreadyLike: { likeId: like.id } }
        }
      })
    })

    setBooks(books)
  }

  const listBooks = async () => {
    const booksData = await getAllBooks()
    booksWithUserLikes(booksData)
  }

  const handleCloseModalBookPublish = () => {
    setOpenModalBookPublish(false)
    listBooks()
  }

  const onClickFavoriteButton = async (book: Book) => {
    if (book.alreadyLike) {
      await deleteLike(book.alreadyLike.likeId)
      listBooks()
      return
    }
    await createLike({ bookId: book.id, bookTitle: book.title, bookUserId: book.userId, userLikedId: user.id, userLikedName: user.name || '' })
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
        {books
          ? books.map((value) => {
            return (
              <div key={value.id}>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <img src={user.photoURL || userDefault} alt="User photo" className={classes.userPhoto}/>
                    }
                    action={
                      value.userEmail === user.email
                        ? <BookSettings listBooks={listBooks} bookData={value} />
                        : ''
                    }
                    title={value.userName}
                    subheader={<div className={classes.publicationDate}>
                      <AccessTimeRoundedIcon fontSize="small"/>{differenceBetweenTwoDates(new Date(value.date))}
                    </div>}
                  />
                  {value.title}
                  <CardMedia
                    component="img"
                    width="600"
                    height="400"
                    image={value.imageUrl}
                    alt="Book image"
                  />
                  <CardContent>
                    Autores: {value.authors.map((author, index) => <Chip key={`${author}-${index}`} label={author} />)}
                    Gênero: <Chip label={value.categories} />
                    Páginas: <Chip label={value.pageCount} />
                    Editora: <Chip label={value.publisher} />
                    Ano da edição: <Chip label={value.publishedDate} />
                    <Typography variant="body2" color="text.secondary">
                      Descrição: {value.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {value.userEmail !== user.email
                      ? (<IconButton aria-label="add to favorites" color={value.alreadyLike ? 'error' : undefined} onClick={async () => { await onClickFavoriteButton(value) }}>
                          <FavoriteIcon />
                        </IconButton>)
                      : ''}
                  </CardActions>
                </Card>
              </div>
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
