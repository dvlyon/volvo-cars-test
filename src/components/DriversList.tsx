import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import DriverCard from './DriverCard'
import useData from "../hooks/useData"

const DriversList = () => {
  const { drivers, newDriver } = useData()

  return (
    <Box sx={{ flexGrow: 1, margin: '1em' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display="flex">
          <Button variant="outlined" sx={{ margin: 'auto' }} onClick={newDriver}>Add New Driver</Button>
        </Grid>
        { drivers.map(driver => <DriverCard key={driver.driverId} driver={driver} />) }
      </Grid>
    </Box>
  )
}

export default DriversList
