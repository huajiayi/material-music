import React, { useCallback } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import './index.scss'
import { useHistory } from 'react-router-dom'
import { customLocation } from '@/hook/useCustomLocation'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ResponsiveDialog({ title, showDialog, children }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
  const history = useHistory()

  const handleClose = useCallback(() => history.push(customLocation.pathname), [history])

  return (
    <div>
      <Dialog
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        open={showDialog}
        onClose={handleClose}
      >
        {fullScreen ? (
          <div>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography className="dialog-title" variant="h6">
                {title}
              </Typography>
            </Toolbar>
          </div>
        ) : <DialogTitle>{title}</DialogTitle>}
        {children}
      </Dialog>
    </div>
  )
}