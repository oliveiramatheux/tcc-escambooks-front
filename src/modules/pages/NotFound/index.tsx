import React from 'react'
import { Grid, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PageDecorator from '../../components/PageDecorator'

const NotFound = (): JSX.Element => {
  return (
    <>
      <PageDecorator title={'Escambooks - página não encontrada'} description={'Escambooks - página não encontrada'} />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <Paper>
          <h2>Not Found</h2>
          <p>
           Página não encontrada com o caminho da rota digitado acima.
          </p>
          <p>
            <Link to="/">
            Login
            </Link>
          </p>
        </Paper>
      </Grid>
    </>
  )
}

export default NotFound
