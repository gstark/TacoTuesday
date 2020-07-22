import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router'
import { isLoggedIn, logout } from '../pages/auth'

export function NavBar(props) {
  const [navbarIsOpen, setNavbarIsOpen] = useState(false)
  const [filterText, setFilterText] = useState('')

  const handleClickSearch = () => {
    console.log(`The user wants to search for ${filterText}`)
    props.setActiveFilter(filterText)
  }

  const handleLogout = () => {
    logout()

    window.location = '/'
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="#">
        <span className="mr-2" role="img" aria-label="taco">
          🌮
        </span>
        Taco Tuesday
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setNavbarIsOpen(!navbarIsOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${navbarIsOpen ? 'show' : ''}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
        </ul>
        {isLoggedIn() || (
          <Link className="btn btn-success mr-2" to="/signin">
            Sign in
          </Link>
        )}
        {isLoggedIn() || (
          <Link className="btn btn-success mr-2" to="/signup">
            Sign up
          </Link>
        )}
        <Route exact path="/">
          <form className="form-inline mr-2 my-2 my-lg-0">
            {isLoggedIn() && (
              <Link className="btn btn-success mr-2" to="/restaurants/add">
                + Add
              </Link>
            )}
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={filterText}
              onChange={event => setFilterText(event.target.value)}
            />
            <span
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={handleClickSearch}
            >
              Search
            </span>
          </form>
        </Route>
        {isLoggedIn() && (
          <span className="btn btn-success" onClick={handleLogout}>
            Sign out
          </span>
        )}
      </div>
    </nav>
  )
}
