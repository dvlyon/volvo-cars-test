import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import driversData from '../data/drivers.json'
import vehicleModelsData from '../data/vehicleModels.json'
import { IDriver, IVehicleModel } from '../types/types'

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'
const CHARLENGTH = CHARS.length

interface IDataContext {
  drivers: IDriver[]
  vehicleModels: IVehicleModel[]
  addDriver: (driver: IDriver) => void
  removeDriver: (id: string) => void
  index: string
  setIndex: Dispatch<SetStateAction<string>>
  newDriver: () => void
}

export const DataContext = createContext<IDataContext>({
  drivers: [],
  vehicleModels: [],
  addDriver: (_driver: IDriver) => null,
  removeDriver: (_id: string) => null,
  index: "",
  setIndex: () => null,
  newDriver: () => null,
})

interface IDataProvider {
  children: ReactNode
}

export const DataProvider = ({ children }: IDataProvider) => {
  const [drivers, setDrivers] = useState<IDriver[]>(driversData)
  const [vehicleModels] = useState<IVehicleModel[]>(vehicleModelsData)
  const [index, setIndex] = useState("")

  const addDriver = (driver: IDriver) => {
    const index = drivers.findIndex(d => d.driverId === driver.driverId)

    const newDrivers = [...drivers]

    if (index >= 0) {
      newDrivers[index] = driver
    } else {
      newDrivers.push(driver)
    }

    setDrivers(newDrivers)
  }

  const removeDriver = (id: string) => {
    const index = drivers.findIndex(driver => driver.driverId === id)

    if (index >= 0) {
      const newDrivers = [...drivers]

      newDrivers.splice(index, 1)

      setDrivers(newDrivers)
    }
  }

  const genId = () => {
    let id = ''

    for (let i = 0; i < 8; i++ ) {
      id += CHARS.charAt(Math.floor(Math.random() * CHARLENGTH))
    }
    id += "-"
    for (let i = 0; i < 4; i++ ) {
      id += CHARS.charAt(Math.floor(Math.random() * CHARLENGTH))
    }
    id += "-"
    for (let i = 0; i < 4; i++ ) {
      id += CHARS.charAt(Math.floor(Math.random() * CHARLENGTH))
    }
    id += "-"
    for (let i = 0; i < 4; i++ ) {
      id += CHARS.charAt(Math.floor(Math.random() * CHARLENGTH))
    }
    id += "-"
    for (let i = 0; i < 12; i++ ) {
      id += CHARS.charAt(Math.floor(Math.random() * CHARLENGTH))
    }

    return id
  }

  const newDriver = () => {
    let newId = genId()
    while (drivers.findIndex(driver => driver.driverId === newId) >= 0) {
      newId = genId()
    }
    setIndex(newId)
  }

  return (
    <DataContext.Provider value={{
      drivers,
      vehicleModels,
      addDriver,
      removeDriver,
      index,
      setIndex,
      newDriver,
    }}>
      {children}
    </DataContext.Provider>
  )
}
