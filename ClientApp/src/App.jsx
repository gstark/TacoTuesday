import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Restaurants } from './pages/Restaurants'

import './custom.scss'
import { NewRestaurant } from './pages/NewRestaurant'

export function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Restaurants />
      </Route>
      <Route exact path="/new">
        <NewRestaurant />
      </Route>
    </Switch>
  )
}
