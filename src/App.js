import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Navigation from "./Containers/Navigation";

import Homepage from "./Section/Homepage";

import Services from "./Section/Services";

import Shop from "./Section/Shop";

import Auth from "./Section/Auth";

import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigation />

      <Route exact path="/">
        <Homepage />
      </Route>

      <Route exact path="/services">
        <Services />
      </Route>

      <Route exact path="/shop">
        <Shop />
      </Route>

      <Route exact path="/auth">
        <Auth />
      </Route>
    </div>
  );
}

export default App;
