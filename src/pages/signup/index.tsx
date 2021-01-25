import NavBar from '../../components/navbar/navbar'
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  ButtonGroup,
  TextField,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4, 0),
    },
  })
)

const SignUp: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Container maxWidth="sm" className={classes.root}>
        <Paper elevation={4} className={classes.paper}>
          <Grid container alignItems="center" direction="column" spacing={3}>
            <Grid item>
              <Typography variant="h3">SIGN UP</Typography>
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
                <Grid container direction="column" spacing={3}>
                  <Grid item>
                    <TextField
                      name="fullname"
                      id="fullname"
                      label="Full Name"
                      variant="outlined"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="emailaddress"
                      id="emailaddress"
                      label="Email Address"
                      variant="outlined"
                      type="email"
                    />
                    <TextField
                      name="phonenumber"
                      id="phonenumber"
                      label="Phone Number"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      type="password"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      name="confirmpassword"
                      id="confirmpassword"
                      label="Confirm Password"
                      variant="outlined"
                      type="password"
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item>
                    <Button variant="outlined">SignUp</Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item>
              <Typography>Already Have an account? Login</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  )
}

export default SignUp
