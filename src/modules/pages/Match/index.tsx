// import React, { useEffect, useState } from 'react'
// import { Grid, Paper } from '@material-ui/core'
// import { useHistory, useLocation } from 'react-router-dom'
// import useStyles from './styles'
// import HeaderMenu, { IMatch } from '../../components/HeaderMenu'
// import PageDecorator from '../../components/PageDecorator'
// import { auth, firestore } from '../../../config/firebase'

// export interface IMatchData {
//   userOne: string;
//   userTwo: string;
//   userOneName: string;
//   userTwoName: string;
//   bookOne: string;
//   bookTwo: string;
//   bookOneTitle: string;
//   bookTwoTitle: string;
//   bookOneImageUrl: string;
//   bookTwoImageUrl: string;
// }

const Match = (): JSX.Element => {
//   const classes = useStyles()
//   const history = useHistory()
//   const location = useLocation()
//   const state = location.state as IMatch

  //   const [matchData, setMatchData] = useState<IMatchData>()

  //   useEffect(() => {
  //     auth.onAuthStateChanged(async (user) => {
  //       if (!user) {
  //         history.push('/login')
  //       }
  //     })
  //   }, [])

  //   const getInfos = async () => {
  //     const bookOneRef = firestore.collection('books').doc(`${state.bookOne}`)
  //     const bookTwoRef = firestore.collection('books').doc(`${state.bookTwo}`)
  //     const bookOneData = (await bookOneRef.get()).data()
  //     const bookTwoData = (await bookTwoRef.get()).data()
  //     setMatchData({
  //       userOne: state.userOne,
  //       userTwo: state.userTwo,
  //       userOneName: state.userOneName,
  //       userTwoName: state.userTwoName,
  //       bookOne: state.bookOne,
  //       bookTwo: state.bookTwo,
  //       bookOneTitle: state.bookOneTitle,
  //       bookTwoTitle: state.bookOneTitle,
  //       bookOneImageUrl: bookOneData ? bookOneData.imageUrl : '',
  //       bookTwoImageUrl: bookTwoData ? bookTwoData.imageUrl : ''
  //     })
  //   }

  //   useEffect(() => {
  //     getInfos()
  //   }, [])

  return (
    <></>
  //       <PageDecorator title={'Escambooks - match'} description={'Escambooks - match'} />
  //       <HeaderMenu />
  //       <div className={classes.container}>
  //         <Grid
  //           container
  //           direction="row"
  //           justifyContent="center"
  //           alignContent="center"
  //         >
  //           <Grid item xs={12} md={3} lg={3}>
  //           </Grid>
  //           <Grid item xs={12} md={3} lg={3}>
  //             <Paper className={classes.paper}>
  //               <img src={matchData?.bookOneImageUrl} alt="User photo" className={classes.bookImage}/>
  //               <div>
  //                 <p>Usuário: {matchData?.userOneName}</p>
  //                 <p>Email: {matchData?.userOne}</p>
  //               </div>
  //             </Paper>
  //           </Grid>
  //           <Grid item xs={12} md={3} lg={3}>
  //             <Paper className={classes.paper}>
  //               <img src={matchData?.bookTwoImageUrl} alt="User photo" className={classes.bookImage}/>
  //               <div>
  //                 <p>Usuário: {matchData?.userTwoName}</p>
  //                 <p>Email: {matchData?.userTwo}</p>
  //               </div>
  //             </Paper>
  //           </Grid>
  //           <Grid item xs={12} md={3} lg={3}>
  //           </Grid>
  //         </Grid>
  //       </div>
  //     </>
  )
}

export default Match
