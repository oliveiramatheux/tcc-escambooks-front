import React, { useEffect } from 'react'
import useStyles from './styles'
import escamb from '../../../images/splash/escamb.png'
import seta01 from '../../../images/splash/seta01.png'
import seta02 from '../../../images/splash/seta02.png'
import ks from '../../../images/splash/ks.png'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { Box } from '@material-ui/core'

const Img = styled.img`
  position: relative;
  -webkit-animation:spin 4s linear infinite;
  -moz-animation:spin 4s linear infinite;
  animation:spin 3s linear infinite;
  @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
  @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
  @keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }
`

const LoadingAnimation = (): JSX.Element => {
  const classes = useStyles()
  const navigate = useNavigate()

  const redirectSplash = () => {
    navigate('/home')
  }

  useEffect(() => {
    setTimeout(() => {
      redirectSplash()
    }, 2000)
  }, [])

  return (
    <div className={classes.container}>
      <Box display="flex" width="60%" maxWidth={500}>
        <img src={escamb} alt="escamb" className={classes.image}/>
        <Img src={seta01} alt="escamb" className={classes.image}/>
        <Img src={seta02} alt="escamb" className={classes.image}/>
        <img src={ks} alt="escamb" className={classes.image}/>
      </Box>
    </div>
  )
}

export default React.memo(LoadingAnimation)
