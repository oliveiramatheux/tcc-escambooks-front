import useStyles from './styles'
import { Avatar, Paper } from '@material-ui/core'
import { ApplicationState } from '../../../store/rootReducer'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import userDefault from '../../../images/user-default.png'
import { Link } from 'react-router-dom'
import { User, getUserById } from 'routes/services'

const UserInfo = (): JSX.Element => {
  const classes = useStyles()
  const { user: userState } = useSelector(
    (state: ApplicationState) => state
  )

  const [user, setUser] = useState<User>()

  const getUser = useCallback(async () => {
    const userById = await getUserById(userState.id)

    setUser(userById)
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <Link to="/profile" className={classes.link} >
      <Paper className={classes.paper}>
        <Avatar src={user?.imageUrl || userState.imageUrl || userDefault} alt="User photo" className={classes.userPhoto}/>
          <div>
            <p>{userState.name}</p>
          </div>
      </Paper>
    </Link>
  )
}

export default UserInfo
