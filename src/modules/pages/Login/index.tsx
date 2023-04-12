import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './styles'
import PageDecorator from '../../components/PageDecorator'

const Login = (): JSX.Element => {
  const classes = useStyles()
  return (
    <>
      <PageDecorator title={'Escambooks - entre ou cadastre-se'} description={'Escambooks - entre ou cadastre-se'} />
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Grid item>
          </Grid>
          <Grid item md={6} lg={4} className={classes.gridAbout}>
            Teste
          </Grid>
          <Grid item md={6} lg={4} className={classes.gridLogin}>
            Teste
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
      </div>
    </>
  )
}

export default Login
