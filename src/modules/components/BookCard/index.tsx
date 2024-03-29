
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, IconButton, Typography } from '@material-ui/core'
import userDefault from '../../../images/user-default.png'
import { Book } from '../../../routes/services/books'
import BookSettings from '../BookSettings'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import { useSelector } from 'react-redux'
import { ApplicationState } from '../../../store/rootReducer'
import { differenceBetweenTwoDates } from '../../../utils/helpers'
import useStyles from './styles'
import { Link } from 'react-router-dom'
import { createLike, deleteLike } from '../../../routes/services'
import { useCallback, useEffect, useState } from 'react'
import Modal from '../ModalWithScroll'

interface BookCardProps {
  book: Book
  listBooks: () => void
  id: string
}

const BookCard = ({ book, listBooks, id }: BookCardProps) => {
  const [likeId, setLikeId] = useState(book.alreadyLike?.likeId)
  const [open, setOpen] = useState(false)
  const [countLines, setCountLines] = useState(0)

  const hasMoreThanEightLines = countLines > 8
  const classes = useStyles({ hasMoreThanEightLines })

  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  const headerLink = book.userId === user.id ? '/profile' : `/profile/${book.userId}`

  const onClickFavoriteButton = async (book: Book) => {
    if (likeId) {
      const response = await deleteLike(likeId)
      if (response) setLikeId(undefined)
      return
    }
    const like = await createLike({ bookId: book.id, bookTitle: book.title, bookUserId: book.userId, userLikedId: user.id, userLikedName: user.name || '' })
    setLikeId(like?.id)
  }

  const divBookDescriptionId = `div-book-description-${id}`

  const calcTextBookDescription = useCallback(() => {
    const textDescription = document.getElementById(divBookDescriptionId)
    if (textDescription) {
      const { height } = textDescription.getBoundingClientRect()
      const { lineHeight } = textDescription.style

      const countLines = height / Number(lineHeight.replace('px', ''))
      setCountLines(countLines)
    }
  }, [divBookDescriptionId])

  useEffect(() => {
    calcTextBookDescription()
  }, [calcTextBookDescription])

  return (
    <>
      <Card className={classes.card}>
          <Box flex="1 0 50%" justifyContent="space-between" display="flex" flexDirection="column">
            <Box>
              <CardHeader
                avatar={<Link to={headerLink} className={classes.link}><Avatar src={book.userImageUrl || userDefault} alt="User photo" className={classes.userPhoto} /></Link>}
                action={
                  book.userEmail === user.email || user.isAdmin
                    ? <BookSettings listBooks={listBooks} bookData={book}/>
                    : ''
                }
                title={<Link to={headerLink} className={classes.link}>{book.userName}</Link>}
                subheader={<div className={classes.publicationDate}>
                  <AccessTimeRoundedIcon fontSize="small"/>{differenceBetweenTwoDates(new Date(book.date))}
                </div>}
              />
              <CardMedia
                component="img"
                className={classes.cardMediaMobile}
                image={book.imageUrl}
                alt="Book image"
              />
              <CardContent
                className={classes.cardContent}
              >
                <Typography variant="h5">{book.title}</Typography>
                <Typography>por {book.authors.join(', ')} | {book.categories}</Typography> <br />
                <div className={classes.description} id={divBookDescriptionId} style={{ lineHeight: '24px' }}>
                    Descrição: {book.description}
                </div>
                {hasMoreThanEightLines && (
                  <Typography
                    variant='body2'
                    className={classes.seeMoreButton}
                    color="primary"
                    onClick={() => { setOpen(true) }}
                  >
                    Ver mais
                  </Typography>
                )}
                <Box paddingTop={1}>
                  <Typography>Páginas: <Chip label={book.pageCount} size="small" /></Typography>
                  <Typography>Editora: <Chip label={book.publisher} size="small" /> </Typography>
                  <Typography>Ano da edição: <Chip label={book.publishedDate} size="small" /> </Typography>
                </Box>
              </CardContent>
            </Box>
            {book.userEmail !== user.email && (
              <CardActions>
                  <IconButton
                    aria-label="add to favorites"
                    className={likeId ? classes.liked : undefined}
                    onClick={async () => { await onClickFavoriteButton(book) }}
                  >
                    <FavoriteIcon/>
                  </IconButton>
              </CardActions>
            )}
          </Box>
        <Box className={classes.cardItem}>
          <CardMedia
            component="img"
            className={classes.cardMedia}
            image={book.imageUrl}
            alt="Book image"
          />
        </Box>
      </Card>
      <Modal open={open} title={book.title}
        description={
          <Typography color="textSecondary" style={{ textAlign: 'justify' }}>
            {book.description}
          </Typography>}
        closeAction={() => { setOpen(false) }}
      />
    </>
  )
}

export default BookCard
