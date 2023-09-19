import { ThemeProvider } from '@material-ui/core'
import { ReactNode } from 'react'
import { useTheme } from '../../../theme'

interface PageTemplateProps {
  children: ReactNode
}

const PageTemplate = ({ children }: PageTemplateProps) => {
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <div style={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh'
      }}>
        { children }
      </div>
    </ThemeProvider>
  )
}

export default PageTemplate
