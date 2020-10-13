import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import tacoTuesday from '../images/taco-tuesday.svg'
import map from '../images/map.png'
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
        <img alt="Example Map" src={map} />
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
