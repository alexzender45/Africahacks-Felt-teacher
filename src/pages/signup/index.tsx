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
      marginTop: theme.spacing(2),
      padding: theme.spacing(4),
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

const SignUp: React.FC = () => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Grid container className={classes.root}>
        <Grid item xs={1}>
          <Typography>Back</Typography>
        </Grid>
        <Grid item xs={11}>
          <Container maxWidth="sm" className={classes.root}>
            <Paper elevation={4} className={classes.paper}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Typography variant="h5">Sign Up</Typography>
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
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <MyInput
                          pname="fullname"
                          plabel="Full Name"
                          ptype="text"
                        />
                      </Grid>
                      <Grid item>
                        <Grid container spacing={1}>
                          <Grid item>
                            <MyInput
                              pname="emailaddress"
                              plabel="Email Address"
                              ptype="email"
                            />
                          </Grid>
                          <Grid item>
                            <MyInput
                              pname="phonenumber"
                              plabel="Phone Number"
                              ptype="text"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <MyInput
                          pname="password"
                          plabel="Password"
                          ptype="password"
                        />
                      </Grid>
                      <Grid item>
                        <MyInput
                          pname="confirm"
                          plabel="Confiirm Password"
                          ptype="password"
                        />
                      </Grid>
                      <Grid item className={classes.centerB}>
                        <MyButton pto="/verify" ptext="SignUp" plink={true} />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item>
                  <Typography>
                    Already Have an account?{' '}
                    <span className={classes.span}>
                      <Link to="/login">Login</Link>
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default SignUp
