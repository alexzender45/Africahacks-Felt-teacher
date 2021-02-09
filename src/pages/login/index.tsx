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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4, 0),
    },
    border: {
      borderRadius: '25px',
    },
  })
)

const Login: React.FC = (): React.ReactElement => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <Grid container alignItems="center" direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5">Sign Up</Typography>
            </Grid>
            <Grid item>
              <ButtonGroup variant="outlined">
                <Button size="large">Teacher</Button>
                <Button size="large">School</Button>
                <Button size="large">Parent</Button>
              </ButtonGroup>
            </Grid>
            <Grid item>
              <form>
                <Grid container direction="column" spacing={2}>

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
                  <MyButton pto="/login" ptext="Login" />
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Typography>Dont Have an account? Signup</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default Login
