import { Button } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() =>
  createStyles({
    border: {
      borderRadius: '12px',
      boxShadow: '0px 2px 8px rgba(33, 32, 156, 0.1)',
    },
  })
)

type IProps = {
  ptext: string
  pto: string
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
