import React from "react"
import Form from "./Form"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import Main from "./Main"
import Admin from "./Admin"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/category/:category" component={Main} />
          <Route exact path="/search/:searchedWord/:searchedCategory/:searchedCity" component={Main} />
          <Route exact path="/type/:type" component={Main} />
          <PrivateRoute path="/admin" component={Admin} />
          <PrivateRoute path="/form" component={Form} />
          <Route path="/login" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
