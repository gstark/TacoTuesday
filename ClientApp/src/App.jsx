import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Restaurants } from './pages/Restaurants'

import './custom.scss'
import { NewRestaurant } from './pages/NewRestaurant'
import { Restaurant } from './pages/Restaurant'

import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { getUser, isLoggedIn, logout } from './auth'

export function App() {
  const user = getUser()

  function handleLogout() {
    logout()

    window.location.assign('/')
  }

  return (
    <>
      <header>
        <ul>
          <li>
            <nav>
              {isLoggedIn() && (
                <Link to="/new">
                  <i className="fa fa-plus"></i> Restaurant
                </Link>
              )}
              {isLoggedIn() || <Link to="/signup">Sign Up</Link>}
              {isLoggedIn() || <Link to="/signin">Sign In</Link>}
              {isLoggedIn() && (
                <span className="link" onClick={handleLogout}>
                  Sign out
                </span>
              )}
              {isLoggedIn() && <p>Welcome back, {user.fullName}!</p>}
            </nav>
          </li>
          {isLoggedIn() && user.photoURL && (
            <li className="avatar">
              <img
                src={user.photoURL}
                alt={`${user.fullName}'s Avatar`}
                height="64"
                width="64"
              />
            </li>
          )}
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
