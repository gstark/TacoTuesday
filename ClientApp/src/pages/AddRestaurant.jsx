import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { useDropzone } from 'react-dropzone'

import { authHeader } from './auth'

export function AddRestaurant() {
  const history = useHistory()
  const [errorMessage, setErrorMessage] = useState()
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
    photoURL: '',
  })

  const onDropFile = async acceptedFiles => {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    // Use fetch to send an authorization header and
    // a body containing the form data with the file
    const response = await fetch('/api/Uploads', {
      method: 'POST',
      headers: {
        ...authHeader(),
      },
      body: formData,
    })

    // If we receive a 200 OK response, set the
    // URL of the photo in our state so that it is
    // sent along when creating the restaurant
    if (response.status === 200) {
      const apiResponse = await response.json()

      const url = apiResponse.url

      setNewRestaurant({ ...newRestaurant, photoURL: url })
    } else {
      setErrorMessage('Unable to upload image')
    }
  }

  const handleFieldChange = event => {
    const value = event.target.value
    const fieldName = event.target.id

    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

    setNewRestaurant(updatedRestaurant)
  }

  const handleFormSubmit = async event => {
    event.preventDefault()

    const response = await fetch('/api/Restaurants', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newRestaurant),
    })

    if (response.status === 401) {
      setErrorMessage('Not Authorized')
      return
    }

    const apiResponse = await response.json()

    if (apiResponse.errors) {
      setErrorMessage(Object.values(apiResponse.errors).join(' '))
    } else {
      history.push('/')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  return (
    <div className="card">
      <div className="card-header">Add a Restaurant</div>
      <div className="card-body">
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={newRestaurant.name}
              onChange={handleFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              value={newRestaurant.description}
              onChange={handleFieldChange}
            />
            <small id="descriptionHelp" className="form-text text-muted">
              Enter a brief description of the restaurant.
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              type="text"
              className="form-control"
              id="address"
              value={newRestaurant.address}
              onChange={handleFieldChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="telephone">Telephone</label>
            <input
              type="text"
              className="form-control"
              id="telephone"
              value={newRestaurant.telephone}
              onChange={handleFieldChange}
            />
          </div>

          <div className="alert alert-primary">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive
                ? 'Drop the files here ...'
                : 'Drag a new file here to upload!'}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
