import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Public from "./routes/public"
import Private from "./routes/private"
import Login from "./components/login"
import Register from "./components/register"

import Dashboard from "./components/dashboard"
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configureStore';

const {store, persistor} = configureStore();

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Public exact path="/" component={Login} />
            <Public exact path="/login" component={Login} />
            <Public exact path="/signup" component={Register} />
            <Private exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </PersistGate>

    </Provider>
  );
}

export default App;
