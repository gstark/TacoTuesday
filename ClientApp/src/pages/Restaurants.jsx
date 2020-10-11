import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../images/avatar.png'
import tacoTuesday from '../images/taco-tuesday.svg'
import map from '../images/map.png'

function SingleRestaurantFromList(props) {
  return (
    <li>
      <h2>
        <Link to={`/restaurants/${props.restaurant.id}`}>
          {props.restaurant.name}
        </Link>
      </h2>
      <p>
        <span
          className="stars"
          style={{ '--rating': 4.7 }}
          aria-label="Star rating of this location is 4.7 out of 5."
        ></span>
        ({props.restaurant.reviews.length})
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
    <>
      <header>
        <ul>
          <li>
            <nav>
              <Link to="/new">
                <i className="fa fa-plus"></i> Restaurant
              </Link>
              <p>Welcome back, Steve!</p>
            </nav>
          </li>
          <li className="avatar">
            <img src={avatar} alt="Steve's Avatar" height="64" width="64" />
          </li>
        </ul>
      </header>
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
      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
    </>
  )
}
