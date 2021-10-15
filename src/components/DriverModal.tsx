import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useData from '../hooks/useData'
import MuiPhoneNumber from 'material-ui-phone-number'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import FormHelperText from '@mui/material/FormHelperText'

const MAILREGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const DriverModal = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [driverId, setDriverId] = useState("")
  const [driverName, setDriverName] = useState("")
  const [driverSurnane, setDriverSurnane] = useState("")
  const [address, setAddress] = useState("")
  const [postal, setPostal] = useState("")
  const [zip, setZip] = useState<number | null>(null)
  const [phone, setPhone] = useState("")
  const [mail, setMail] = useState("")
  const [vehicleModel, setVehicleModel] = useState(-1)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const { index, setIndex, drivers, vehicleModels, addDriver } = useData()

  useEffect(() => {
    setOpen(index !== "")

    if (index !== "") {
      setDriverId(index)

      const driver = drivers.find(d => d.driverId === index)

      if (driver) {
        setDriverName(driver.driverName)
        setDriverSurnane(driver.driverSurnane)
        setAddress(driver.address)
        setPostal(driver.postal)
        setZip(driver.zip)
        setPhone(driver.phone)
        setMail(driver.mail)
        setVehicleModel(driver.vehicleModel)
        setTitle(`Editing ${driver.driverName} ${driver.driverSurnane}`)
      } else {
        setDriverName("")
        setDriverSurnane("")
        setAddress("")
        setPostal("")
        setZip(null)
        setPhone("")
        setMail("")
        setVehicleModel(-1)
        setTitle('Add a new driver')
      }
    }
  }, [index, drivers])

  const handleClose = () => setIndex("")

  const handlePhoneChange = (value: any) => {
    setPhone(value as string)
  }

  const isValidPhone = () => {
    return phone.length >= 8
  }

  const isValidMail = () => {
    return MAILREGEX.test(mail)
  }

  const handleSave = () => {
    if (driverId && driverName && driverSurnane && address && postal && zip !== null && zip >= 11115 && zip <= 98499 && vehicleModel >= 0 && isValidPhone() && isValidMail()) {
      addDriver({
        driverId,
        driverName,
        driverSurnane,
        address,
        postal,
        zip: zip || 0,
        phone,
        mail,
        vehicleModel,
      })
      handleClose()
    } else {
      setSnackbarOpen(true)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="driverName"
          label="Driver Name"
          fullWidth
          variant="standard"
          value={driverName}
          onChange={e => setDriverName(e.target.value)}
          error={driverName === ""}
          helperText="Driver Name cannot be empty"
        />
        <TextField
          margin="dense"
          id="driverSurnane"
          label="Driver Surnane"
          fullWidth
          variant="standard"
          value={driverSurnane}
          onChange={e => setDriverSurnane(e.target.value)}
          error={driverSurnane === ""}
          helperText="Driver Surnane cannot be empty"
        />
        <TextField
          margin="dense"
          id="address"
          label="Address"
          fullWidth
          variant="standard"
          value={address}
          onChange={e => setAddress(e.target.value)}
          error={address === ""}
          helperText="Address cannot be empty"
        />
        <TextField
          margin="dense"
          id="postal"
          label="Postal"
          fullWidth
          variant="standard"
          value={postal}
          onChange={e => setPostal(e.target.value)}
          error={postal === ""}
          helperText="Postal cannot be empty"
        />
        <TextField
          margin="dense"
          id="zip"
          label="Zip"
          type="number"
          fullWidth
          variant="standard"
          value={zip}
          onChange={e => setZip(parseInt(e.target.value || "0", 10))}
          error={zip === null || zip < 11115 || zip > 98499}
          helperText="Zip code must be in the 11115 - 98499 range"
        />
        <MuiPhoneNumber
          margin="dense"
          fullWidth
          variant="standard"
          error={!isValidPhone()}
          helperText="Please enter a valid Sweden phone"
          defaultCountry={'se'}
          onlyCountries={['se']}
          value={phone}
          onChange={handlePhoneChange}
          sx={{ marginTop: '1.5em' }}
        />
        <TextField
          margin="dense"
          id="email"
          label="Mail"
          type="email"
          fullWidth
          variant="standard"
          value={mail}
          onChange={e => setMail(e.target.value)}
          error={!isValidMail()}
          helperText="Please enter a valid mail"
        />
        <FormControl component="fieldset" error={vehicleModel < 0} sx={{ marginTop: '1.5em' }}>
          <FormLabel component="legend">Vehicle Model</FormLabel>
          <RadioGroup
            aria-label="vehicle model"
            name="controlled-radio-buttons-group"
            value={vehicleModel}
            onChange={e => setVehicleModel(parseInt(e.target.value, 10))}
          >
            {vehicleModels.map(model => <FormControlLabel key={model.vehicleModel} value={model.vehicleModel} control={<Radio />} label={model.vehicleName} />)}
          </RadioGroup>
          <FormHelperText>Please select an option.</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="error" elevation={6} variant="filled">Please check the form for erros!</Alert>
      </Snackbar>
    </Dialog>
  )
}

export default DriverModal
