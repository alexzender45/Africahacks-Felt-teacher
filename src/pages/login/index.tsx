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
import { useState } from 'react'
import { loginTeacher } from '../../config/api'
import { Idata } from '../../interfaces/interface'
import { useHistory } from 'react-router-dom'

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

const Login: React.FC = (): React.ReactElement => {
  const classes = useStyles()
  const history = useHistory()

  const [data, setData] = useState<Idata>({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name
    const value = e.target.value

    setData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    loginTeacher(data, history)
  }

  return (
    <div>
      <NavBar page="none" />
      <Grid container className={classes.root}>
        <Grid item xs={1}>
          <Typography>Back</Typography>
        </Grid>
        <Grid item xs={11}>
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
                          pname="email"
                          plabel="Email Address"
                          ptype="email"
                          pchange={handleChange}
                        />
                      </Grid>

                      <Grid item>
                        <MyInput
                          pname="password"
                          plabel="Password"
                          ptype="password"
                          pchange={handleChange}
                        />
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          alignItems="center"
                          justify="space-between"
                        >
                          <Grid item>
                            <Typography color="error">
                              Forgot Password?
                            </Typography>
                          </Grid>
                          <Grid item>
                            <MyButton
                              plink={false}
                              ptext="Login"
                              pclick={handleSubmit}
                            />
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
        </Grid>
      </Grid>
    </div>
  )
}

export default Login
