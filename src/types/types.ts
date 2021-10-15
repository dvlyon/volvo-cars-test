export interface IDriver {
  driverId: string
  driverName: string
  driverSurnane: string
  address: string
  postal: string
  zip: number
  phone: string
  mail: string
  vehicleModel: number
}

export interface IVehicleModel {
  vehicleModel: number
  vehicleName: string
}
