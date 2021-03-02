import {
  Avatar,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from '@material-ui/core'
import NavBar from '../../../components/navbar/navbar'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CallIcon from '@material-ui/icons/Call'
import MyButton from '../../../components/global/button'
import EmailIcon from '@material-ui/icons/Email'
import RoomIcon from '@material-ui/icons/Room'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      height: '35vh',
      backgroundColor: 'grey',
      marginBottom: theme.spacing(2),
    },
    root: {
      width: '85%',
      paddingLeft: theme.spacing(12),
    },
    avatar: {
      height: theme.spacing(12),
      width: theme.spacing(12),
      marginTop: '-8%',
    },
    deev: {
      marginBottom: theme.spacing(6),
    },
    paper: {
      padding: theme.spacing(2, 4),
      textAlign: 'center',
      borderRadius: '10px',
    },
    accordion: {
      padding: theme.spacing(0, 18, 0, 10),
    },
    summary: {
      padding: theme.spacing(2, 0),
    },
  })
)

const SchoolProfile: React.FC = (): React.ReactElement => {
  const classes = useStyles()
  return (
    <div>
      <NavBar />
      <div className={classes.header}></div>
      <div className={classes.root}>
        <Avatar alt="profile picture" className={classes.avatar}>
          AA
        </Avatar>
        <div className={classes.deev}>
          <Grid container justify="space-between">
            <Grid item>
              <Grid container direction="column" spacing={3}>
                <Grid item>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography variant="h5">
                        ADEWOYE ADEGOKE ADEDEJI
                      </Typography>
                    </Grid>
                    <Grid item>
                      <FiberManualRecordIcon color="error" fontSize="small" />
                    </Grid>
                    <Grid item>
                      <Typography>Approved</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography>Ilove food plenty plenty</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <MyButton pto="/" ptext="connect" plink={true} />
            </Grid>
          </Grid>
        </div>
        <div className={classes.deev}>
          <Grid container spacing={6}>
            <Grid item>
              <Paper elevation={3} className={classes.paper}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <CallIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography>Phone Number</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>08153125924</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3} className={classes.paper}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <EmailIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography>Email Address</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>example@gmail.com</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item>
              <Paper elevation={3} className={classes.paper}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <RoomIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography>Address</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>Lagos Nigeria</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className={classes.deev}>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>EDUCATIONAL BACKGROUND</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={6} className={classes.summary}>
              <Grid item>
                <Typography>SSCE</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <Typography>2001-2007</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <Typography>Some School</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Work Experience</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={6} className={classes.summary}>
              <Grid item>
                <Typography>SSCE</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <Typography>2001-2007</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <Typography>Some School</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>cv</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={6} className={classes.summary}>
              <Grid item>
                <Typography>SSCE</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <Typography>2001-2007</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem={true} />
              <Grid item>
                <Typography>Some School</Typography>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}

export default SchoolProfile
