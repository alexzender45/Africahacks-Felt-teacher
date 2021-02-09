import { TextField } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    border: {
      borderRadius: '25px',
    },
  })
)

type IProps = {
  pname: string
  plabel: string
  ptype?: string
}

const MyInput: React.FC<IProps> = (props: IProps): React.ReactElement => {
  const classes = useStyles()
  return (
    <TextField
      name={props.pname}
      id={props.pname}
      label={props.plabel}
      type={props.ptype}
      variant="outlined"
      fullWidth={true}
      size="small"
      InputProps={{
        className: classes.border,
      }}
    />
  )
}

export default MyInput
