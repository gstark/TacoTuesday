import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import avatar from '../images/avatar.png'

export function Restaurant() {
  const params = useParams()
  const id = params.id

  const [restaurant, setRestaurant] = useState({
    name: '',
    description: '',
    address: '',
    telephone: '',
    reviews: [],
  })

  useState(() => {
    const fetchRestaurant = async () => {
      const response = await fetch(`/api/Restaurants/${id}`)
      const apiData = await response.json()

      setRestaurant(apiData)
    }

    fetchRestaurant()
  }, [id])

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
      <main className="page">
        <nav>
          <Link to="/">
            <i className="fa fa-home"></i>
          </Link>
          <h2>{restaurant.name}</h2>
        </nav>
        <p>
          <span
            className="stars"
            style={{ '--rating': 4.7 }}
            aria-label="Star rating of this location is 4.7 out of 5."
          ></span>
          ({restaurant.reviews.length})
        </p>
        <address>{restaurant.address}</address>
        <p>{restaurant.description}</p>
        <hr />
        <h3>Reviews for {restaurant.name}</h3>
        <ul className="reviews">
          {restaurant.reviews.map((review) => (
            <li key={review.id}>
              <div className="author">
                Gavin said: <em>{review.summary}</em>
              </div>
              <div className="body">
                <p>{review.body}</p>
              </div>
              <div className="meta">
                <span
                  className="stars"
                  style={{ '--rating': review.stars }}
                  aria-label={`Star rating of this location is ${review.stars} out of 5.`}
                ></span>
                <time>{review.createdAt}</time>
              </div>
            </li>
          ))}
        </ul>
        <h3>Enter your own review</h3>
        <form action="#">
          <p className="form-input">
            <label htmlFor="summary">Summary</label>
            <input type="text" name="summary" />
            <span className="note">
              Enter a brief summary of your review. Example:{' '}
              <strong>Great food, good prices.</strong>
            </span>
          </p>
          <p className="form-input">
            <label htmlFor="body">Review</label>
            <textarea name="body"></textarea>
          </p>
          <div className="rating">
            <input id="star-rating-1" type="radio" name="stars" value="1" />
            <label htmlFor="star-rating-1">1 star</label>
            <input id="star-rating-2" type="radio" name="stars" value="2" />
            <label htmlFor="star-rating-2">2 stars</label>
            <input id="star-rating-3" type="radio" name="stars" value="3" />
            <label htmlFor="star-rating-3">3 stars</label>
            <input id="star-rating-4" type="radio" name="stars" value="4" />
            <label htmlFor="star-rating-4">4 stars</label>
            <input id="star-rating-5" type="radio" name="stars" value="5" />
            <label htmlFor="star-rating-5">5 stars</label>

            <div className="star-rating">
              <label
                htmlFor="star-rating-1"
                aria-label="1 star"
                title="1 star"
              ></label>
              <label
                htmlFor="star-rating-2"
                aria-label="2 stars"
                title="2 stars"
              ></label>
              <label
                htmlFor="star-rating-3"
                aria-label="3 stars"
                title="3 stars"
              ></label>
              <label
                htmlFor="star-rating-4"
                aria-label="4 stars"
                title="4 stars"
              ></label>
              <label
                htmlFor="star-rating-5"
                aria-label="5 stars"
                title="5 stars"
              ></label>
            </div>
          </div>
          <p>
            <input type="submit" value="Submit" />
          </p>
        </form>
      </main>
      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
    </>
  )
}
