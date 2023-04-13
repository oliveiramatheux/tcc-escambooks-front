import React from 'react'
import { Paper } from '@material-ui/core'
import useStyles from './styles'
import logo from '../../../images/index-about01.png'
import banner from '../../../images/index-about02.png'

const About = (): JSX.Element => {
  const classes = useStyles()
  return (
    <>
      <Paper elevation={0} className={classes.paper}>
        <img src={logo} alt="Logo" className={classes.logo} />
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <div className={classes.about}>
          <p>
            Você tem livros juntando 'poeira' aí na sua estante? Então não perca tempo, publique-os no Escambooks, troque-os por novos livros com outros usuários, realize trocas com seus amigos, conheça pessoas com interesses em comum, descubra e leia os principais livros pedidos em vestibulares, publique e divulgue suas obras autorais gratuitamente e principalmente se divirta! 😄
          </p>
          <p>
            A leitura ainda faz parte da tecnologia!
          </p>
        </div>
      </Paper>
      <Paper elevation={0} className={classes.paper}>
        <img src={banner} alt="Banner" className={classes.banner}/>
      </Paper>
    </>
  )
}

export default About
