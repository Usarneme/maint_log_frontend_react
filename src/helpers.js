import axios from 'axios'
axios.defaults.withCredentials = true


export async function login(email, password) {
  if (!email || !password) return new Error('No email or password provided to Login.')
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/login`, { email, password })
    if (res.status === 200) {
      const user = res.data
      user.userID = res.data._id
      // object property "primary" is a boolean indicating if it is the default/main vehicle to display
      const primaryVehicleArray = user.vehicles.filter(car => car.primary)
      if (primaryVehicleArray.length === 0) {
        user.currentlySelectedVehicle = user.vehicles[0] // if none is primary, display the first vehicle by default
      } else {
        user.currentlySelectedVehicle = primaryVehicleArray[0]
      }
      return { user } 
    } else {
      console.log('Response received but with status code: '+res.status)
      const error = new Error(res.error)
      throw error
    }
  } 
  catch(loginError) {
    console.log(`Error posting to ${process.env.REACT_APP_API_DOMAIN}/api/login`)
    console.dir(loginError)
    return loginError
  }
}

export async function register(name, email, password, passwordConfirm) {
  if (!name || !email || !password || !passwordConfirm) return new Error('Not all registration information provided. Please make sure you have entered a username, email address, password, and confirmed your password before trying again.')
  const url = `${process.env.REACT_APP_API_DOMAIN}/api/register`
  try {
    const res = await axios.post(url, { name, email, password, passwordConfirm })
    if (res.status === 200) {
      console.log(`apiRegister handler returned success!`)
      console.dir(res)
      const user = res.data
      user.userID = res.data._id
      user.currentlySelectedVehicle = undefined
      user.vehicles = []
      user.log = []
      return { user }
    } else {
      console.log('Registration response received from the server but with an error and status code: '+res.status)
      const error = new Error(res.error)
      throw error
    }
  } 
  catch(registrationError) {
    console.log(`Error posting to ${process.env.REACT_APP_API_DOMAIN}/api/register`)
    console.log(registrationError.response.status)
    return registrationError
  }
}

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
    const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/account`, { name, email, vehicleYear, vehicleMake, vehicleModel, vehicleOdometer, primary, vin })
    if (res.status === 200) return getLogData()
    // otherwise ERROR
    console.log('Response received but with status code: '+res.status)
    const error = new Error(res.error)
    throw error
  } catch(err) {
      console.log('Error posting to /api/account.')
      console.dir(err)
      // TODO error boundary
      return alert('Error updating account. Please try again.')
    }
}

// saveNewVehicle = /api/vehicle/add
export async function add(vehicle) {
  console.log("Adding a new vehicle to user account: ")
  console.dir(vehicle)
  // try/catch axios post
  try {
    const res = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/api/vehicle/add`, vehicle)
    if (res.status === 200) return res.data
    console.log('Response received but with status code: '+res.status)
    const error = new Error(res.error)
    throw error
  } catch(err) {
    console.log('Error posting to /api/vehicle/add.')
    console.dir(err)
    // TODO error boundary
    return alert('Error updating vehicle. Please try again.')
  }
}

// saveVehicleChanges, post route = /api/vehicle
export async function update(vehicle) {
  console.log("Updating an extant vehicle: ")
  console.dir(vehicle)
  return 1
  // try/catch axios post
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

// BACKEND API-APP SHARED ROUTES
  // POST
    // /add 
    // /add/:id 
    // /delete/log/entry/:id
    // /remove/photo/:filename 
    // /account/forgot 
    // /account/reset/:token 

// API ONLY ROUTES
  // GET
    // /api/search       --> cleanly handled by SearchBox component
    // /api/log          --> not used anywhere... (login and account updates return {User+Vehicle})
  // POST
    // /api/login        --> DONE login func above
    // /api/logout       --> cleanly handled by Logout component
    // /api/register     --> DONE (TODO cleanup expectations of children wrt. new user flow e.g. need vehicle asap)
    // /api/account  
    // /api/vehicle/add  --> IN PROGRESS
    // /api/vehicle 
