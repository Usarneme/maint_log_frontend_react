import axios from 'axios'

// Returns a User's Log and Vehicle arrays
export async function getLogData() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/log`)
    if (response.status === 200) {
      // response = { user: {...}, vehicle: [...] }
      return response
    } else {
      console.log('Response received but with status code: '+response.status)
      const error = new Error(response.error)
      throw error
    }
  } catch (err) {
      console.log('Error getting data from /api/log/')
      console.dir(err)
      alert('Error getting log data please try again')
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