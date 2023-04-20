import React from 'react'
import { useScrollTrigger, Zoom } from '@material-ui/core'
import useStyles from './styles'

interface BackToTopProps {
  children: React.ReactElement
}

const BackToTop = (props: BackToTopProps): JSX.Element => {
  const { children } = props
  const classes = useStyles()

  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    )
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

export default BackToTop
