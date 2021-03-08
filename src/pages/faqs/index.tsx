/* eslint-disable react/no-unescaped-entities */
import { Grid, Paper, Typography } from '@material-ui/core'
import NavBar from '../../components/navbar/navbar'

const Faqs: React.FC = (): React.ReactElement => {
  const faqs = [
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
    'question',
  ]
  return (
    <div>
      <NavBar page="profile" />
      <div>
        <Paper>
          <Grid container>
            <Grid item>
              <Typography>Have Questions?</Typography>
              <Typography>We've Got the answers...</Typography>
            </Grid>
            <Grid item>Image</Grid>
          </Grid>
        </Paper>
        <Grid container>
          <Grid item>
            {faqs.map((q, i) => (
              <Paper key={i}>
                <Typography>q</Typography>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Faqs
