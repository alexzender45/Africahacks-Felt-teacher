import { Paper, Typography, Grid, TextField } from '@material-ui/core'
import MyButton from '../../components/global/button'
import MyInput from '../../components/global/input'
import NavBar from '../../components/navbar/navbar'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      width: '85%',
    },
    smallMargin: {
      marginTop: theme.spacing(6),
    },
    bigMargin: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(12),
    },
    image: {
      height: '100%',
      width: '100%',
    },
    buttonGroup: {
      padding: theme.spacing(3, 2),
    },
    paper: {
      padding: theme.spacing(2),
    },
    paperType: {
      marginTop: theme.spacing(3),
    },
    header: {
      textAlign: 'center',
    },
    contact: {
      width: '60%',
      margin: 'auto',
    },
    border: {
      borderRadius: '25px',
    },
  })
)

const HomePage: React.FC = (): React.ReactElement => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <div className={classes.root}>
        <Grid
          container
          spacing={6}
          className={classes.bigMargin}
          justify="space-between"
        >
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              spacing={10}
              className={classes.smallMargin}
            >
              <Grid item>
                <Typography variant="h3">
                  Get Access To the best teachers in town
                </Typography>
                <Typography className={classes.smallMargin}>
                  Making Refined and Qualified Teachers to all Schools in
                  Nigeria is our priority. Our platform creates a link between
                  teachers and schools by providing a medium to vet teachers,
                  and act as a means of communication between both parties.
                </Typography>
              </Grid>
              <Grid item>
                <MyButton pto="/register" ptext="SignUp" plink={true} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <img
              src="/images/teacher.svg"
              alt="teacher"
              className={classes.image}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={10}
          justify="center"
          className={classes.bigMargin}
        >
          <Grid item>
            <Paper elevation={3} className={classes.buttonGroup}>
              <Grid container spacing={3} justify="center">
                <Grid item>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h2">0</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h2">0</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h2">0</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="h4" className={classes.paperType}>
              Registered Schoools
            </Typography>
          </Grid>
          <Grid item>
            <Paper elevation={3} className={classes.buttonGroup}>
              <Grid container spacing={3} justify="center">
                <Grid item>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h2">0</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h2">0</Typography>
                  </Paper>
                </Grid>
                <Grid item>
                  <Paper variant="outlined" className={classes.paper}>
                    <Typography variant="h2">0</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="h4" className={classes.paperType}>
              Qualified Teachers
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={6}
          className={classes.bigMargin}
          justify="space-between"
        >
          <Grid item xs={4}>
            <img
              src="/images/male-student.svg"
              alt="teacher"
              className={classes.image}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              spacing={10}
              className={classes.smallMargin}
            >
              <Grid item>
                <Typography variant="h3">Who we are</Typography>
                <Typography className={classes.smallMargin}>
                  We are dedicated to providing quality education to students in
                  line with the SDG goal - We accept applications from, and
                  examine teachers to ensure that quality would be provided
                  while teaching.
                </Typography>
              </Grid>
              <Grid item>
                <MyButton pto="/register" ptext="SignUp" plink={true} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={6}
          className={classes.bigMargin}
          justify="space-between"
        >
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              spacing={10}
              className={classes.smallMargin}
            >
              <Grid item>
                <Typography variant="h3">Get the app</Typography>
                <Typography className={classes.smallMargin}>
                  Our mobile Application makes accessing our services even
                  easier. Get access to the best quality of teachers via a tap
                  from your mobile phone
                </Typography>
              </Grid>
              <Grid item>
                <MyButton pto="/register" ptext="SignUp" plink={true} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <img
              src="/images/phones.svg"
              alt="teacher"
              className={classes.image}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={6}
          className={classes.bigMargin}
          justify="space-between"
        >
          <Grid item xs={4}>
            <img
              src="/images/female-student.svg"
              alt="teacher"
              className={classes.image}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid
              container
              direction="column"
              spacing={10}
              className={classes.smallMargin}
            >
              <Grid item>
                <Typography variant="h3">Have Questions?</Typography>
                <Typography className={classes.smallMargin}>
                  We have compiled a list of the questions that have been
                  answered
                </Typography>
              </Grid>
              <Grid item>
                <MyButton pto="/register" ptext="SignUp" plink={true} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.contact}>
          <Typography variant="h3" className={classes.header}>
            Contact Us
          </Typography>
          <Grid container direction="column" spacing={3} justify="center">
            <Grid item>
              <MyInput
                pname="emailaddress"
                plabel="Email Address"
                ptype="email"
              ></MyInput>
            </Grid>
            <Grid item>
              <TextField
                name="message"
                label="Message"
                type="text"
                multiline={true}
                rows={4}
                variant="outlined"
                size="medium"
                fullWidth={true}
                InputProps={{
                  className: classes.border,
                }}
              />
            </Grid>
            <Grid item className={classes.header}>
              <MyButton pto="/register" ptext="SignUp" plink={true} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default HomePage
