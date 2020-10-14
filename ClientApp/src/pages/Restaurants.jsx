import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker, NavigationControl, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import tacoTuesday from '../images/taco-tuesday.svg'
import { Stars } from '../components/Stars'

function SingleRestaurantFromList(props) {
  return (
    <li>
      <h2>
        <Link to={`/restaurants/${props.restaurant.id}`}>
          {props.restaurant.name}
        </Link>
      </h2>
      <p>
        <Stars restaurant={props.restaurant} />(
        {props.restaurant.reviews.length})
      </p>
      <address>{props.restaurant.address}</address>
    </li>
  )
}

export function Restaurants() {
  const [filterText, setFilterText] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [selectedMapRestaurant, setSelectedMapRestaurant] = useState(null)

  const [viewport, setViewport] = useState({
    width: 327,
    height: 264,
    latitude: 27.77101804911986,
    longitude: -82.66090611749074,
    zoom: 9.8,
  })

  useEffect(() => {
    async function loadRestaurants() {
      const url =
        filterText.length === 0
          ? `/api/Restaurants`
          : `/api/Restaurants?filter=${filterText}`

      const response = await fetch(url)
      const json = await response.json()

      setRestaurants(json)
    }

    loadRestaurants()
  }, [filterText])

  return (
    <main className="home">
      <h1>
        <img src={tacoTuesday} alt="Taco Tuesday" />
      </h1>
      <form className="search">
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={function (event) {
            setFilterText(event.target.value)
          }}
        />
      </form>

      <section className="map">
        <ReactMapGL
          style={{ position: 'absolute' }}
          {...viewport}
          onViewportChange={setViewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          <div style={{ position: 'absolute', right: 0 }}>
            <NavigationControl />
          </div>
          {selectedMapRestaurant && (
            <Popup
              latitude={selectedMapRestaurant.latitude}
              longitude={selectedMapRestaurant.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setSelectedMapRestaurant(null)}
              offsetTop={-5}
            >
              <div>
                <p>{selectedMapRestaurant.name}</p>
                <p>{selectedMapRestaurant.description}</p>
              </div>
            </Popup>
          )}
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
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
      </section>

      <ul className="results">
        {restaurants.map((restaurant) => (
          <SingleRestaurantFromList
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </ul>
    </main>
  )
}
