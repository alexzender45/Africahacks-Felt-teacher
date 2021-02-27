import NavBar from '../../components/navbar/navbar'
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import MyInput from '../../components/global/input'
import MyButton from '../../components/global/button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4, 2),
      textAlign: 'center',
    },
    border: {
      borderRadius: '25px',
    },
    centerB: {
      textAlign: 'center',
    },
    insetB: {
      boxShadow: 'inset 0px 2px 4px 1px rgba(33, 32, 156, 0.2)',
    },
    span: {
      color: 'red',
    },
  })
)

const Login: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">Login</Typography>
            </Grid>
            <Grid item>
              <ButtonGroup variant="outlined">
                <Button size="large" className={classes.insetB}>
                  Teacher
                </Button>
                <Button size="large" className={classes.insetB}>
                  School
                </Button>
                <Button size="large" className={classes.insetB}>
                  Parent
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <form>
                <Grid container direction="column" spacing={4}>
                  <Grid item>
                    <MyInput
                      pname="emailaddress"
                      plabel="Email Address"
                      ptype="email"
                    />
                  </Grid>

                  <Grid item>
                    <MyInput
                      pname="password"
                      plabel="Password"
                      ptype="password"
                    />
                  </Grid>
                  <Grid item>
                    <Grid container alignItems="center" justify="space-between">
                      <Grid item>
                        <Typography color="error">Forgot Password?</Typography>
                      </Grid>
                      <Grid item>
                        <MyButton pto="/register" ptext="Login" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Typography>
                Already Have an account?{' '}
                <span className={classes.span}>
                  <Link to="/register">Signup</Link>
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default Login
