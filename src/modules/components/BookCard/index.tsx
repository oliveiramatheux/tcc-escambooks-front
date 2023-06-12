
import { Card, CardActions, CardContent, CardHeader, CardMedia, Chip, IconButton, Typography } from '@material-ui/core'
import userDefault from '../../../images/user-default.png'
import { Book } from '../../../routes/services/books'
import BookSettings from '../BookSettings'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store/rootReducer'
import { differenceBetweenTwoDates } from '../../../utils/helpers'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { createLike, deleteLike } from '../../../routes/services'

interface BookCardProps {
  book: Book
  listBooks: () => void
}

const BookCard = ({ book, listBooks }: BookCardProps) => {
  const classes = useStyles()

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const onClickFavoriteButton = async (book: Book) => {
    if (book.alreadyLike) {
      await deleteLike(book.alreadyLike.likeId)
      listBooks()
      return
    }
    await createLike({ bookId: book.id, bookTitle: book.title, bookUserId: book.userId, userLikedId: user.id, userLikedName: user.name || '' })
    listBooks()
  }

  return (
    <div>
      <Card className={classes.card}>
        <Link to={`/profile/${book.userId}`} className={classes.link}>
          <CardHeader
            avatar={
              <img src={user.photoURL || userDefault} alt="User photo" className={classes.userPhoto}/>
            }
            action={
              book.userEmail === user.email
                ? <BookSettings listBooks={listBooks} bookData={book} />
                : ''
            }
            title={book.userName}
            subheader={<div className={classes.publicationDate}>
              <AccessTimeRoundedIcon fontSize="small"/>{differenceBetweenTwoDates(new Date(book.date))}
            </div>}
          />
        </Link>
        {book.title}
        <CardMedia
          component="img"
          width="600"
          height="400"
          image={book.imageUrl}
          alt="Book image"
        />
        <CardContent>
          Autores: {book.authors.map((author, index) => <Chip key={`${author}-${index}`} label={author} />)}
          Gênero: <Chip label={book.categories} />
          Páginas: <Chip label={book.pageCount} />
          Editora: <Chip label={book.publisher} />
          Ano da edição: <Chip label={book.publishedDate} />
          <Typography variant="body2" color="textSecondary">
            Descrição: {book.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          {book.userEmail !== user.email && (
            <IconButton
              aria-label="add to favorites"
              className={book.alreadyLike ? classes.liked : undefined}
              onClick={async () => { await onClickFavoriteButton(book) }}
            >
              <FavoriteIcon />
            </IconButton>
          )}
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}

export default BookCard
