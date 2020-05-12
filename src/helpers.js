import axios from 'axios'
axios.defaults.withCredentials = true

// Returns a User's Log and Vehicle arrays
export async function getLogData() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/log`)
    console.log('getLogData returned: ')
    console.dir(response)
    if (response.status === 200) return response.data
    // otherwise ERROR
    console.log('Response received but with status code: '+response.status)
    const error = new Error(response.error)
    throw error
  } catch (err) {
      console.log('Error getting data from /api/log/')
      console.dir(err)
      alert('Error getting log data please try again')
    }
}

export async function updateUserAccount(userObject) {
  if (!userObject || Object.keys(userObject).length === 0) return null

  const { name, email } = userObject
  const vehicleYear = userObject.currentlySelectedVehicle.year
  const vehicleMake = userObject.currentlySelectedVehicle.make
  const vehicleModel = userObject.currentlySelectedVehicle.model
  const vehicleOdometer = userObject.currentlySelectedVehicle.odometer
  const primary = userObject.currentlySelectedVehicle.primary.toString()
  const vin = userObject.currentlySelectedVehicle.vin

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/update/account`, { name, email, vehicleYear, vehicleMake, vehicleModel, vehicleOdometer, primary, vin })
    if (res.status === 200) return getLogData()
    // otherwise ERROR
    console.log('Response received but with status code: '+res.status)
    const error = new Error(res.error)
    throw error
  } catch(err) {
      console.log('Error posting to /update.')
      console.dir(err)
      // TODO error boundary
      return alert('Error updating account. Please try again.')
    }
}

export const manufacturers = [
  "ACG",
  "Aston Martin",
  "Auto",
  "Blue",
  "BMW",
  "Buell",
  "Bugatti",
  "Chevrolet",
  "Chrysler",
  "Club",
  "Coachworks",
  "Cooper",
  "Daimler",
  "E-One",
  "Fiat",
  "Ford",
  "GM",
  "Hino",
  "Hombilt",
  "Honda",
  "Hyundai",
  "International",
  "Jaguar",
  "Jialing",
  "Kenworth",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Latitude",
  "Lotus",
  "Mack",
  "Maserati",
  "Mazda",
  "Mercedes-Benz",
  "Mills",
  "Mitsubishi",
  "Motorcycle",
  "NABI",
  "Navistar",
  "Nissan",
  "NUMMI",
  "Optima",
  "Oshkosh",
  "Owosso",
  "PACCAR",
  "Peterbilt",
  "Quest",
  "Renault",
  "Rolls Royce",
  "Subaru",
  "Suzuki",
  "Tesla",
  "TMMBC",
  "Toyota",
  "UD",
  "Volkswagen",
  "Volvo",
  "Westward",
  "Workhorse"
]