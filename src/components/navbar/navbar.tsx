/* eslint-disable react/no-unescaped-entities */
import { AppBar, Toolbar, Typography, Button, Grid } from '@material-ui/core'
import Logo from '../../assets/logo'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import MyButton from '../global/button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(0, 6),
    },
  })
)

const NavBar: React.FC = () => {
  const classes = useStyles()
  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Logo />
              </Grid>
              <Grid item>
                <Typography>Felt Teachers</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={4}>
              <Grid item>
                <Button component={Link} to="/">
                  Home
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/">
                  About Us
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/">
                  FAQ'S
                </Button>
              </Grid>
              <Grid item>
                <MyButton pto="/login" ptext="Login" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
