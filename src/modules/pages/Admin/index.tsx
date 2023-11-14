import { Box, Button, Grid, Paper, Typography } from '@material-ui/core'
import useStyles from './styles'
import PageDecorator from '../../components/PageDecorator'
import HeaderMenu from 'modules/components/HeaderMenu'
import UserInfo from 'modules/components/UserInfo'
import UserDataGrid from '../../components/UserDataGrid'
import DescriptionIcon from '@mui/icons-material/Description'
import { ESCAMBOOKS_DIAGRAMS_URL } from '../../../constants'

const Admin = (): JSX.Element => {
  const classes = useStyles()

  return (
    <>
     <PageDecorator title={'Escambooks - Admin'} description={'Escambooks - Admin'} />
     <HeaderMenu hideSearchBar />
     <Grid
        container
        direction="row"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={12} md={3}>
          <UserInfo/>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '40px 40px 0 40px' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<DescriptionIcon />}
              onClick={() => window.open(ESCAMBOOKS_DIAGRAMS_URL, '_blank')}
            >
              Diagramas do sistema
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={9} lg={7} xl={6}>
          <div className={classes.paperAdmin}>
            <Paper elevation={0} className={classes.paperAdminSub}>
              <Typography variant="h5" gutterBottom component="div">
                Área de Administrador
              </Typography>
            </Paper>
            <Typography color="textPrimary" className={classes.gridTitle} variant="h5" gutterBottom component="div">
              Usuários da plataforma
            </Typography>
            <UserDataGrid />
          </div>
        </Grid>
      </Grid>
    </>

  )
}
export default Admin
