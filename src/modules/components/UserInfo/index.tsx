import React from 'react'
import useStyles from './styles'
import { Paper } from '@material-ui/core'
import { ApplicationState } from '../../../store/rootReducer'
import { useSelector } from 'react-redux'
import userDefault from '../../../images/user-default.png'
import { Link } from 'react-router-dom'

interface UserInfoProps {
  disableLink?: boolean
}

const UserInfo = ({ disableLink }: UserInfoProps): JSX.Element => {
  const classes = useStyles()
  const { user } = useSelector(
    (state: ApplicationState) => state
  )

  return disableLink
    ? (
      <Paper className={classes.paper}>
        <img src={user.photoURL || userDefault} alt="User photo" className={classes.userPhoto}/>
        <div>
          <p>{user.name}</p>
          <p>0 Seguindo</p>
          <p>0 Seguidores</p>
        </div>
      </Paper>
      )
    : (
    <Link to="/profile" className={classes.link} >
      <Paper className={classes.paper}>
        <img src={user.photoURL || userDefault} alt="User photo" className={classes.userPhoto}/>
        <div>
          <p>{user.name}</p>
          <p>0 Seguindo</p>
          <p>0 Seguidores</p>
        </div>
      </Paper>
    </Link>)
}

export default UserInfo
