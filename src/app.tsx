import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Routes from './config/routes'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const App: React.FC = () => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#5E5DBA',
      },
      text: {
        primary: '#5E5DBA',
      },
      background: {
        default: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: "'Montserrat', sans-serif",
      allVariants: {
        color: '#5E5DBA',
      },
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          {Routes.map((route, index) => {
            return (
              <Route
                key={index}
                exact
                path={route.path}
                component={route.component}
              ></Route>
            )
          })}
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
