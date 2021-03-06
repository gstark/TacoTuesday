import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import { authHeader } from './auth'

const dateFormat = `EEEE, MMMM do, yyyy 'at' h:mm aaa`

export function ShowRestaurant() {
  const params = useParams()
  const id = parseInt(params.id)

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
    reviews: [],
  })

  const [newReview, setNewReview] = useState({
    body: '',
    summary: '',
    restaurantId: id,
  })

  const fetchRestaurant = async () => {
    const response = await fetch(`/api/Restaurants/${id}`)
    const apiData = await response.json()

    setRestaurant(apiData)
  }

  useState(() => {
    fetchRestaurant()
  }, [id])

  const handleNewReviewFieldChange = event => {
    const id = event.target.id
    const value = event.target.value

    setNewReview({ ...newReview, [id]: value })
  }

  const handleNewReviewSubmit = event => {
    event.preventDefault()

    fetch('/api/Reviews', {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
      body: JSON.stringify(newReview),
    })
      .then(response => {
        if (response.status === 401) {
          return {}
        } else {
          return response.json()
        }
      })
      .then(apiResponse => {
        fetchRestaurant()
        setNewReview({ ...newReview, body: '', summary: '' })
      })
  }
  return (
    <div className="taco-listing">
      <div className="media mb-5">
        {restaurant.photoURL ? (
          <img
            alt="Restaurant Photo"
            width={200}
            className="pr-3"
            src={restaurant.photoURL}
          />
        ) : (
          <span className="pr-3 display-2" role="img" aria-label="taco">
            🌮
          </span>
        )}
        <div className="media-body">
          <h1 className="mt-0">{restaurant.name}</h1>
          {restaurant.description}
          <address className="mt-3">
            <Link to="maps.google.com">{restaurant.address}</Link>
          </address>
          <Link to={`tel:${restaurant.telephone}`}>{restaurant.telephone}</Link>
        </div>
      </div>

      <div className="row mb-5">
        {restaurant.reviews.length > 0 && (
          <div className="col-12">
            <h3>Reviews</h3>
            <ul className="timeline">
              {restaurant.reviews.map(review => (
                <li key={review.id}>
                  <p className="mb-2">
                    {review.summary}
                    <span className="float-right">
                      {format(new Date(review.createdAt), dateFormat)}
                    </span>
                  </p>
                  <p>{review.body}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">Enter your own review</div>
        <div className="card-body">
          <form onSubmit={handleNewReviewSubmit}>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input
                type="text"
                className="form-control"
                id="summary"
                aria-describedby="summaryHelp"
                value={newReview.summary}
                onChange={handleNewReviewFieldChange}
              />
              <small id="summaryHelp" className="form-text text-muted">
                Enter a brief summary of your review. Example:{' '}
                <strong>Great food, good prices.</strong>
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="body">Review</label>
              <textarea
                className="form-control"
                id="body"
                value={newReview.body}
                onChange={handleNewReviewFieldChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
