import {
  Container,
  Avatar,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
} from '@material-ui/core'
import NavBar from '../../components/navbar/navbar'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import CallIcon from '@material-ui/icons/Call'
import MyButton from '../../components/global/button'
import EmailIcon from '@material-ui/icons/Email'
import RoomIcon from '@material-ui/icons/Room'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Profile: React.FC = (): React.ReactElement => {
  return (
    <div>
      <NavBar />
      <Container>
        <Avatar alt="profile picture">AA</Avatar>
        <Typography>ADEWOYE ADEGOKE ADEDEJI</Typography>
        <FiberManualRecordIcon color="error" fontSize="small" />
        <Typography>Approved</Typography>
        <MyButton pto="/" ptext="connect" />
        <Typography>Ilove food plenty plenty</Typography>
        <Paper elevation={3}>
          <CallIcon fontSize="small" />
          <Typography>Phone Number</Typography>
          <Typography>08153125924</Typography>
        </Paper>
        <Paper elevation={3}>
          <EmailIcon fontSize="small" />
          <Typography>Email Address</Typography>
          <Typography>example@gmail.com</Typography>
        </Paper>
        <Paper elevation={3}>
          <RoomIcon fontSize="small" />
          <Typography>Address</Typography>
          <Typography>Lagos Nigeria</Typography>
        </Paper>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>EDUCATIONAL BACKGROUND</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Typography>SSCE</Typography>
              <Divider orientation="vertical" flexItem={true} />
              <Typography>2001-2007</Typography>
              <Divider orientation="vertical" flexItem={true} />
              <Typography>Some School</Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Work Experience</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Typography>SSCE</Typography>
              <Divider orientation="vertical" flexItem={true} />
              <Typography>2001-2007</Typography>
              <Divider orientation="vertical" flexItem={true} />
              <Typography>Some School</Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>cv</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Typography>SSCE</Typography>
              <Divider orientation="vertical" flexItem={true} />
              <Typography>2001-2007</Typography>
              <Divider orientation="vertical" flexItem={true} />
              <Typography>Some School</Typography>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Container>
    </div>
  )
}

export default Profile
