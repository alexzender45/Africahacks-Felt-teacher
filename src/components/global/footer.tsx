import { Grid, Typography } from '@material-ui/core'
import Logo from '../../assets/logo'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import InstagramIcon from '@material-ui/icons/Instagram'
import FacebookIcon from '@material-ui/icons/Facebook'
import TwitterIcon from '@material-ui/icons/Twitter'

const Footer: React.FC = (): React.ReactElement => {
  return (
    <div>
      <Grid container>
        <Grid item>
          <Logo />
          <Typography>Felt Teachers</Typography>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography>connect with us on Social media</Typography>
            </Grid>
            <Grid item>
              <LinkedInIcon />
              <InstagramIcon />
              <FacebookIcon />
              <TwitterIcon />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Footer
