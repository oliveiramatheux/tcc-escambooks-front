import React from 'react'
import { CircularProgress } from '@material-ui/core'
import useStyles from './styles'

const LoadingSimple = (): JSX.Element => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.container}>
        <CircularProgress />
      </div>
    </>
  )
}

export default React.memo(LoadingSimple)
