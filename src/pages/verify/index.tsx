import NavBar from '../../components/navbar/navbar'
import { Container, Typography, TextField, Grid } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import MyButton from '../../components/global/button'

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
    image: {
      height: '100%',
      width: '100%',
    },
  })
)

const Verify: React.FC = (): React.ReactElement => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <Grid container className={classes.root}>
        <Grid item xs={1}>
          <Typography>Back</Typography>
        </Grid>
        <Grid item xs={11}>
          <Container maxWidth="sm">
            <Grid
              container
              direction="column"
              spacing={3}
              className={classes.centerB}
            >
              <Grid item>
                <img
                  src="/images/phone.svg"
                  alt="teacher"
                  className={classes.image}
                />
              </Grid>
              <Grid item>
                <Typography>
                  We just sent a 6 digit code to 00000000000
                </Typography>
              </Grid>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  justify="center"
                  alignItems="center"
                >
                  <Typography>Enter Code</Typography>
                  <Grid item xs={1}>
                    <TextField
                      type="text"
                      name="code"
                      variant="outlined"
                      InputProps={{ className: classes.border }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      type="text"
                      name="code"
                      variant="outlined"
                      InputProps={{ className: classes.border }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      type="text"
                      name="code"
                      variant="outlined"
                      InputProps={{ className: classes.border }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      type="text"
                      name="code"
                      variant="outlined"
                      InputProps={{ className: classes.border }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      type="text"
                      name="code"
                      variant="outlined"
                      InputProps={{ className: classes.border }}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      type="text"
                      name="code"
                      variant="outlined"
                      InputProps={{ className: classes.border }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <MyButton pto="/register" ptext="SignUp" plink={true} />
              </Grid>
              <Grid item>
                <Typography>Didnt get code? Resend</Typography>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  )
}

export default Verify
