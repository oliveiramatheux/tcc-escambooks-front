import React, { useState } from 'react'
import useStyles from './styles'
import { Paper, Button } from '@material-ui/core'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import bookExample from '../../../images/posts/img-book-test.jpg'
import userDefault from '../../../images/user-default.png'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PublishRoundedIcon from '@mui/icons-material/PublishRounded'
import ModalBookPublish from '../ModalBookPublish'

const BookPublication = (): JSX.Element => {
  const classes = useStyles()

  const [openModalBookPublish, setOpenModalBookPublish] = useState<boolean>(false)

  const handleOpenModalBookPublish = () => {
    setOpenModalBookPublish(true)
  }

  const handleCloseModalBookPublish = () => {
    setOpenModalBookPublish(false)
  }

  return (
    <>
      <Paper elevation={0}className={classes.paper}>
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
        <Card>
          <CardHeader
            avatar={
              <img src={userDefault} alt="User photo" className={classes.userPhoto}/>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={'Matheus de Oliveira'}
            subheader={<div className={classes.publicationDate}><AccessTimeRoundedIcon fontSize="small"/> 20min</div>}
          />
          <CardMedia
            component="img"
            width="600"
            height="400"
            image={bookExample}
            alt="Book image"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
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
      </Paper>
      <ModalBookPublish
        open={openModalBookPublish}
        closeAction={handleCloseModalBookPublish}
      />
    </>
  )
}

export default BookPublication
