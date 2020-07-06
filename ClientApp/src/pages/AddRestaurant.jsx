import React, { useState } from 'react'
import { useHistory } from 'react-router'

export function AddRestaurant() {
  const history = useHistory()
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
  })

  const handleFieldChange = event => {
    const value = event.target.value
    const fieldName = event.target.id

    const updatedRestaurant = { ...newRestaurant, [fieldName]: value }

    setNewRestaurant(updatedRestaurant)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    fetch('/api/Restaurants', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newRestaurant),
    })
      .then(response => response.json())
      .then(() => {
        history.push('/')
      })
  }

  return (
    <div className="card">
      <div className="card-header">Add a Restaurant</div>
      <div className="card-body">
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
