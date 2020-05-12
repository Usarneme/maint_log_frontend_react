import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../styles/photoEditor.css'

function PhotoEditor(props) {
  return (
    <>
      <h3 className="photos__header">Photos</h3>
      <div className="photos__div">
        { props.photos.map(photo => {
          if (photo === "" || photo.length === 0) return null
          return (
            <div key={photo} className="single__photo__div">
              <img className="single__photo" src={`http://res.cloudinary.com/c00p/image/upload/${photo}`} alt={photo} />
              { !props.editingBlocked && <Link className="button delete__photo" to={`/remove/photo/${photo}`} onClick={props.deletePhoto} title="Delete This Photo">Delete Photo</Link> }
            </div>
          )
        }
        )}
      </div>
    </>
  )
}

PhotoEditor.propTypes = {
  photos: PropTypes.array.isRequired
}

export default PhotoEditor