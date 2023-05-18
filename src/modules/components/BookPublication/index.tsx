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
import ShareIcon from '@mui/icons-material/Share'
import userDefault from '../../../images/user-default.png'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import ModalBookPublish from '../ModalBookPublish'
import LoadingSimple from '../LoadingSimple'
import { differenceBetweenTwoDates } from '../../../utils/helpers'
import { Book, getAllBooks } from '../../../routes/services/books'
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
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
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
