import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { authHeader, isLoggedIn } from './auth'

function SingleRestaurantFromList(props) {
  const restaurant = props.restaurant

  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="list-group-item list-group-item-action"
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{restaurant.name}</h5>
        <small>{restaurant.reviews.length} Reviews</small>
      </div>
      <p className="mb-1">{restaurant.address}</p>
      {isLoggedIn() && (
        <small className="mr-3">
          <button
            className="btn btn-success btn-sm"
            onClick={event => {
              event.preventDefault()
              props.handleVote(restaurant.id, 'upvote')
            }}
          >
            <span className="mr-2" role="img" aria-label="upvote">
              👍🏻
            </span>
            {restaurant.upvoteCount}
          </button>
        </small>
      )}
      {isLoggedIn() && (
        <small className="mr-3">
          <button
            className="btn btn-danger btn-sm"
            onClick={event => {
              event.preventDefault()
              props.handleVote(restaurant.id, 'downvote')
            }}
          >
            <span className="mr-2" role="img" aria-label="downvote">
              👎🏻
            </span>{' '}
            {restaurant.downvoteCount}
          </button>
        </small>
      )}
    </Link>
  )
}

export function Restaurants(props) {
  const [restaurants, setRestaurants] = useState([])

  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 8,
  })

  const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null)

  console.log('RestaurantList rendering')

  useEffect(() => {
    reloadRestaurants()
  }, [props.activeFilter])

  const reloadRestaurants = () => {
    const url =
      props.activeFilter.length === 0
        ? `/api/Restaurants`
        : `/api/Restaurants?filter=${props.activeFilter}`

    fetch(url)
      .then(response => response.json())
      .then(apiData => {
        setRestaurants(apiData)
      })
  }

  const handleVote = (id, type) => {
    const url = `/api/RestaurantVotes/${id}/${type}`

    fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
    }).then(() => {
      reloadRestaurants()
    })
  }

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
      <div className="my-3 d-flex justify-content-center">
        <ReactMapGL
          {...viewport}
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          {selectedMapRestaurant && (
            <Popup
              latitude={selectedMapRestaurant.latitude}
              longitude={selectedMapRestaurant.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setSelectedMapRestaurant(null)}
              offsetTop={-5}
            >
              <div className="card my-3">
                <div className="card-header">{selectedMapRestaurant.name}</div>
                <div className="card-body"></div>
                {selectedMapRestaurant.description}
              </div>
            </Popup>
          )}

          {restaurants.map(restaurant => (
            <Marker
              latitude={restaurant.latitude}
              longitude={restaurant.longitude}
            >
              <span
                role="img"
                aria-label="taco"
                onClick={() => setSelectedMapRestaurant(restaurant)}
              >
                🌮
              </span>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
      <div className="list-group">
        {restaurants.map(restaurant => (
          <SingleRestaurantFromList
            key={restaurant.id}
            restaurant={restaurant}
            handleVote={handleVote}
          />
        ))}
      </div>
    </>
  )
}
