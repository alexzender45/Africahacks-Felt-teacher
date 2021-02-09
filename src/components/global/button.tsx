import { Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
    border: {
      borderRadius: '25px',
    },
  })
)

type IProps = {
  pto: string
  ptext: string
}

const MyButton: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const classes = useStyles()
  return (
    <Button
      component={Link}
      variant="outlined"
      size="large"
      color="secondary"
      className={classes.border}
      to={props.pto}
    >
      {props.ptext}
    </Button>
  )
}

export default MyButton
