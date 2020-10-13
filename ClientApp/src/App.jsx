import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Restaurants } from './pages/Restaurants'

import './custom.scss'
import { NewRestaurant } from './pages/NewRestaurant'
import { Restaurant } from './pages/Restaurant'

import avatar from './images/avatar.png'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'

export function App() {
  return (
    <>
      <header>
        <ul>
          <li>
            <nav>
              <Link to="/new">
                <i className="fa fa-plus"></i> Restaurant
              </Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
              <p>Welcome back, Steve!</p>
            </nav>
          </li>
          <li className="avatar">
            <img src={avatar} alt="Steve's Avatar" height="64" width="64" />
          </li>
        </ul>
      </header>
      <Switch>
        <Route exact path="/">
          <Restaurants />
        </Route>
        <Route exact path="/new">
          <NewRestaurant />
        </Route>
        <Route exact path="/restaurants/:id">
          <Restaurant />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </Switch>
      <footer>
        <p>
          Built with <i className="fa fa-heart"></i> in St Petersburg, Florida.
        </p>
      </footer>
    </>
  )
}
