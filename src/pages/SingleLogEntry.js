import React from 'react'
import { Link, Redirect, useParams } from 'react-router-dom'
import moment from 'moment'

import PhotoEditor from '../components/PhotoEditor'
import VehicleHeader from '../components/VehicleHeader'
import EditPencil from '../images/editPencil.svg'

import '../styles/singleLogEntry.css'

function SingleLogEntry(props) {
  const { slug } = useParams()

  const isLoggedIn = (props.user && props.user.cookies ? props.user.cookies.length > 0 : false)
  if (!isLoggedIn) return <Redirect to="/welcome" />

  console.log(`Displaying log entry: ${slug}`)
  const log = props.user.log.filter(entry => entry.slug === slug)
  const { id, shortDescription, longDescription, dateStarted, dateCompleted, dateEntered, dateDue, mileageDue, name, odometer, tools, parts, partsCost, laborCost, serviceLocation, photos } = log[0]
  let vehicle = {}
  if (props.user.vehicle && props.user.vehicle[0]) {
    vehicle = props.user.vehicle[0]
  }

  return (
    <div className="inner">
      <h2>{name.length > 120 ? `${name.substring(0,120)}...` : name}</h2>
      <VehicleHeader vehicle={vehicle} />
      <div className="single__details">
        <p>
          <strong>Short Description: </strong>
          <span>{shortDescription}</span>
        </p>
        <p>
          <strong>Long Description: </strong>
          <span>{longDescription}</span>
        </p>
        <p>
          <strong>Date Started: </strong>
          <span>{moment(dateStarted).format("MMM Do YYYY")}</span>
        </p>
        <p>
          <strong>Date Completed: </strong>
          <span>{moment(dateCompleted).format("MMM Do YYYY")}</span>
        </p>
        <p>
          <strong>Date Entered into Log: </strong>
          <span>{moment(dateEntered).format("MMM Do YYYY")}</span>
        </p>
        <p>
          <strong>Date When Service is Due Next: </strong>
          <span>{moment(dateDue).format("MMM Do YYYY")}</span>
        </p>
        <p>
          <strong>Mileage When Service is Due Next: </strong>
          <span>{Number(mileageDue).toLocaleString()}</span>
        </p>
        <p>
          <strong>Tools: </strong>
          <span>{tools}</span>
        </p>
        <p>
          <strong>Parts: </strong>
          <span>{parts}</span>
        </p>
        <p>
          <strong>Parts Cost: </strong>
          <span>${partsCost}</span>
        </p>
        <p>
          <strong>Labor Cost: </strong>
          <span>${laborCost}</span>
        </p>
        <p>
          <strong>Service Location: </strong>
          <span>{serviceLocation}</span>
        </p>
        <p>
          <strong>Odometer: </strong>
          <span>{Number(odometer).toLocaleString()}</span>
        </p>
        <Link className="button editPencil" to={`/log/${id}/edit`}>
          <img src={EditPencil} alt="Edit Pencil" className="svg" />
          <span>Edit</span>
        </Link>

        { photos && <PhotoEditor photos={photos} editingBlocked={true} /> }
        <input type="hidden" name="previousPhotos" value={photos.toString()} />
      </div>

    </div>
  )
}

export default SingleLogEntry 