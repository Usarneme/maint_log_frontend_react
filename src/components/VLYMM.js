import React from 'react'

import { manufacturers } from '../helpers'

class VLYMM extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      year: new Date().getFullYear(),
      make: '',
      models: [],
      model: ''
    }
  }

  async lookupModelByYearAndMake() {
    // console.log("Select changed. Calling lookupMakeQuery... ")
    if (!this.state || !this.state.year || !this.state.make) {
      return console.log('leaving lookup early due to no year or make selected...')
    }

    console.log('Make selected: '+this.state.make)
    // check for a local cache of the query
    const localStorageKey = this.state.year.toString() + this.state.make.toString()
    const localStorageModels = localStorage.getItem(localStorageKey)
    if (localStorageModels !== null) {
      console.log('Duplicate query. Retreiving cache from localStorage...')
      const localStorageModelsArray = localStorageModels.split(',') // turns comma-delineated string into array of strings
      console.log(localStorageModelsArray)
      this.setState({ models: localStorageModelsArray })
    } else {
      fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${this.state.make}/modelyear/${this.state.year}?format=json`)
        .then(async data => {
          const json = await data.json()
          let models = json["Results"]
          // alphabetize results
          models.sort((a, b) => {
            if (a["Model_Name"] > b["Model_Name"]) return 1
            if (a["Model_Name"] < b["Model_Name"]) return -1
            else return 0
          })
          const modelsArray = models.map(model => model["Model_Name"])
          console.log(modelsArray)
          // cache query results
          if (modelsArray.length > 0) localStorage.setItem(localStorageKey, modelsArray)
          this.setState(prevState => ({ models: [...modelsArray] }))
        })
        .catch(err => console.error(err))
    }
  }
  
  modelSelected(e) {
    e.stopPropagation()
    e.preventDefault()
    // console.log('Model selected...')
    const year = document.querySelector('select[name="lookupYear"]').value
    const make = document.querySelector('select[name="lookupMake"]').value
  
    let model = undefined
  
    if (e.originalTarget !== undefined) {
      model = e.originalTarget.value
    } else {
      model = e.target.value
    }
    // console.log(year, make, model)
    const confirmLookupResultsButton = document.querySelector('#confirmLookupResults')
    // confirmLookupResultsButton.addEventListener('click', e => updateVehicle(e, year, make, model))
    confirmLookupResultsButton.classList.remove('hidden')
  }

  handleSelectChange = async event => {
    event.preventDefault()
    // await state change before calling the next method as that relies on the updated state value...
    await this.setState({ [event.target.name]: event.target.value })
    this.lookupModelByYearAndMake()
  }

  render() {
    const thisYear = new Date().getFullYear()

    return (
      <div className="form vehicleLookupDiv">
        <div className="vehicleLookupInput">
          <label htmlFor="year">Year</label>
          <select name="year" defaultValue={thisYear} onChange={this.handleSelectChange}>
            { 
              Array.from(Array(thisYear - 1920).keys()).map((item, i) => <option key={i} value={thisYear - i}>{thisYear - i}</option> )
            }
          </select>
          <label htmlFor="make">Make</label>
          <select name="make" defaultValue="" onChange={this.handleSelectChange}>
            <option value="" disabled="disabled">Select a manufacturer...</option>
            {
              manufacturers.map((val, idx) => <option key={val} value={val}>{val}</option> )
            }
          </select>
          <label htmlFor="model">Model</label>
          <select name="model" defaultValue="First select a make..." onChange={this.handleSelectChange}>
            <option value="First select a make..." disabled="disabled">First select a manufacturer...</option>
            { this.state.models.length > 0 &&
              this.state.models.map((val, idx) => <option key={val} value={val}>{val}</option> )
            }
          </select>
      </div>
      <button className="button hidden" id="confirmLookupResults">Vehicle Info Is Correct</button>
    </div>
    )
  }
}

export default VLYMM