import { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { IDriver } from '../types/types'
import useData from '../hooks/useData'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'

interface IDriverCard {
  driver: IDriver
}

const DriverCard = ({ driver }: IDriverCard) => {
  const [open, setOpen] = useState(false)

  const { vehicleModels, removeDriver, setIndex } = useData()

  const driverName = `${driver.driverName} ${driver.driverSurnane}`

  const vehicleModel = vehicleModels.find(model => model.vehicleModel === driver.vehicleModel)?.vehicleName

  const handleClose = () => setOpen(false)

  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            { driver.mail }
          </Typography>
          <Typography variant="h5" component="div">
            { driverName }
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            { vehicleModel }
          </Typography>
          <Typography variant="body2">
            { driver.address }
            <br />
            { driver.postal }
            <br />
            { driver.zip }
            <br />
            { driver.phone }
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => setOpen(true)}>Remove</Button>
          <Button size="small" onClick={() => setIndex(driver.driverId)}>Edit</Button>
        </CardActions>
      </Card>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Confirm Deletion of { driverName }</DialogTitle>
        <DialogContent dividers>
          This will remove the driver permanently.
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button color="error" onClick={() => removeDriver(driver.driverId)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default DriverCard
