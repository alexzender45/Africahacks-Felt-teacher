import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import NavBar from '../../../components/navbar/navbar'

const SearchParents: React.FC = (): React.ReactElement => {
  const categories: string[] = [
    'Science',
    'Arts',
    'Commercial',
    'Nursery & Primary',
  ]
  const groups = [
    {
      name: 'John Doe',
      text: 'insert plenty text here',
    },
    {
      name: 'John Doe',
      text: 'insert plenty text here',
    },
    {
      name: 'John Doe',
      text: 'insert plenty text here',
    },
    {
      name: 'John Doe',
      text: 'insert plenty text here',
    },
    {
      name: 'John Doe',
      text: 'insert plenty text here',
    },
    {
      name: 'John Doe',
      text: 'insert plenty text here',
    },
  ]
  return (
    <div>
      <NavBar page="profile" />
      <TextField type="search" />
      <Typography>
        We offer Experienced and qualified teachers who are capable of
        Inculcating and building your children and preparing them for being
        tomorrow’s leaders. Below are the list of approved teachers from our
        platform
      </Typography>
      <Grid container>
        <Grid item>
          <Paper elevation={3}>
            <List dense>
              {categories.map((c, i) => (
                <ListItem key={i} button dense divider>
                  <ListItemText primary={categories} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid container item>
          <Paper elevation={3}>
            {groups.map((g, i) => (
              <Grid item key={i}>
                <Card raised>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Profile Image"
                      height="60"
                      image="/images/male-student.svg"
                    />
                    <CardContent>
                      <Typography>{g.name}</Typography>
                      <Typography>{g.text}</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button>Profile</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            <Grid item>
              <ButtonGroup>
                <Button>Prev</Button>
                <Button>Next</Button>
              </ButtonGroup>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default SearchParents
