import axios from 'axios'

export async function getLogData() {
  // console.log(`/api/getLogData handler. Axios getting from ${process.env.REACT_APP_API_DOMAIN}/api/getLogData`)

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/getLogData`)

    if (response.status === 200) {
      // console.log(`getLogData handler returned success!`)
      // console.dir(response)
      return response
    } else {
      console.log('Response received but with status code: '+response.status)
      const error = new Error(response.error)
      throw error
    }
  } catch (err) {
      console.log('Error posting to /api/getLogData.')
      console.dir(err)
      alert('Error getting log data please try again')
    }
}
