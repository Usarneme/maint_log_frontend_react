import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ReactSVG } from 'react-svg'

import PhotoEditor from '../components/PhotoEditor'
import EditPencil from '../images/editPencil.svg'

import '../styles/singleLogEntry.css'

function SingleLogEntry(props) {
  const { slug } = props.match.params
  const log = props.user.log.filter(entry => entry.slug === slug)
  const { id, shortDescription, longDescription, dateStarted, dateCompleted, dateEntered, dateDue, mileageDue, name, odometer, tools, parts, partsCost, laborCost, serviceLocation, photos } = log[0]
  const vehicleID = log[0].vehicle
  const vehicleArray = props.user.vehicle.filter(vehicle => vehicle.id === vehicleID)
  const vehicle = vehicleArray[0]

  return (
    <div className="inner">
      <h2>{name.length > 120 ? `${name.substring(0,120)}...` : name}</h2>
      <div className="card single__details">
        <div>
          <p>
            <strong>Short Description: </strong>
            <span>{shortDescription}</span>
          </p>
          <p>
            <strong>Date Entered into Log: </strong>
            <span>{moment(dateEntered).format("MMM Do YYYY")}</span>
          </p>
          <p>
            <strong>Vehicle: </strong>
            <span>{vehicle.year} {vehicle.make} {vehicle.model}</span>
          </p>
          <p>
            <strong>Odometer: </strong>
            <span>{Number(odometer).toLocaleString()}</span>
          </p>
        </div>
        <p>
          <strong>Long Description: </strong>
          <span>{longDescription}</span>
        </p>
        <div className="dates__container">
          <p>
            <strong>Date Started: </strong>
            <span>{moment(dateStarted).format("MMM Do YYYY")}</span>
          </p>
          <p>
            <strong>Date Completed: </strong>
            <span>{moment(dateCompleted).format("MMM Do YYYY")}</span>
          </p>
        </div>
        <div>
          <p>
            <strong>Mileage When Service is Due Next: </strong>
            <span>{Number(mileageDue).toLocaleString()}</span>
          </p>
          <p>
            <strong>Date When Service is Due Next: </strong>
            <span>{moment(dateDue).format("MMM Do YYYY")}</span>
          </p>
        </div>
        <div>
          <p>
            <strong>Tools: </strong>
            <span>{tools}</span>
          </p>
          <p>
            <strong>Parts: </strong>
            <span>{parts}</span>
          </p>
        </div>
        <div>
          <p>
            <strong>Parts Cost: </strong>
            <span>${partsCost}</span>
          </p>
          <p>
            <strong>Labor Cost: </strong>
            <span>${laborCost}</span>
          </p>
        </div>
        <p>
          <strong>Service Location: </strong>
          <span>{serviceLocation}</span>
        </p>

        <Link className="button editPencil" to={`/log/${id}/edit`}>
          <ReactSVG src={EditPencil} role="img" aria-label="Edit Pencil Icon" fallback={() => <img src={EditPencil} alt="edit pencil icon" description="edit pencil icon" className="svg" />} /> 
          <span>Edit</span>
        </Link>

      { photos && photos.length > 0 && 
        <>
          <label htmlFor="previousPhotos"><h3>Photos:</h3></label>
          <PhotoEditor photos={photos} editingBlocked={true} /> 
          <input type="hidden" name="previousPhotos" value={photos.toString()} />
        </>
      }
      </div>

    </div>
  )
}

SingleLogEntry.propTypes = {
  history: PropTypes.object.isRequired,
  user: PropTypes.shape({
    cookies: PropTypes.string,
    email: PropTypes.string,
    log: PropTypes.array,
    name: PropTypes.string,
    sessionID: PropTypes.string,
    userID: PropTypes.string,
    vehicle: PropTypes.array
  }),
  updateUserState: PropTypes.func.isRequired
}

export default SingleLogEntry 