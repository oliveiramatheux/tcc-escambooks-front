/* eslint-disable @typescript-eslint/ban-types */
import React, { useState } from 'react'
import { Paper, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import CreateRoundedIcon from '@material-ui/icons/CreateRounded'
import useStyles from './styles'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'

const LoginButtonNavigation = (): JSX.Element => {
  const [value, setValue] = useState<string>('login')
  const classes = useStyles()

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          className={classes.containerBottomNavigation}
        >
          <BottomNavigationAction id="buttonNavigationLogin" label="Já tenho uma conta" value="login" icon={<LockOpenOutlinedIcon />} />
          <BottomNavigationAction id="buttonNavigationRegister" label="Criar uma conta" value="register" icon={<CreateRoundedIcon />} />
        </BottomNavigation>
      </Paper>
      {value === 'login' ? (<LoginForm/>) : (<RegisterForm />)}
    </>
  )
}

export default LoginButtonNavigation
