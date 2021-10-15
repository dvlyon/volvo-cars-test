import { DataProvider } from './contexts/DataContext'
import DriversList from './components/DriversList'
import DriverModal from './components/DriverModal'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'

const App = () => {
  return (
    <DataProvider>
      <CssBaseline />
      <Typography variant="h1" sx={{ textAlign: 'center' }}>
        David Lyon - Volvo Test
      </Typography>
      <DriversList />
      <DriverModal />
    </DataProvider>
  )
}

export default App
