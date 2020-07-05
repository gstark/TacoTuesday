import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function SingleRestaurantFromList(props) {
  const restaurant = props.restaurant

  return (
    <Link
      to={`/tacos/${restaurant.id}`}
      className="list-group-item list-group-item-action"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{restaurant.name}</h5>
        <small>5 Reviews</small>
      </div>
      <p className="mb-1">{restaurant.address}</p>
      <small className="mr-3">
        <button className="btn btn-success btn-sm">
          <span className="mr-2" role="img" aria-label="upvote">
            👍🏻
          </span>
          5
        </button>
      </small>
      <small className="mr-3">
        <button className="btn btn-danger btn-sm">
          <span className="mr-2" role="img" aria-label="downvote">
            👎🏻
          </span>{' '}
          3
        </button>
      </small>
    </Link>
  )
}

export function Restaurants() {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch('/api/Restaurants')
      .then(response => response.json())
      .then(apiData => {
        setRestaurants(apiData)
      })
  }, [])

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="#">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {restaurants.length} Taco Joints Found
          </li>
        </ol>
      </nav>
      <div className="list-group">
        {restaurants.map(restaurant => (
          <SingleRestaurantFromList
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </>
  )
}
