import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar';
import Home from "./Home/Home";
import MyContext from './Context/Context';
import Reciepe from './Reciepe/Reciepe';

function App() {

  function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  const [reciepes, setReciepes] = useStickyState([], 'reciepes');

  // useEffect(() => {
  //   const rec = window.localStorage.getItem('reciepes');
  //   if (rec && rec.length > 0) {

  //   } window.localStorage.setItem('reciepes', JSON.stringify(reciepes))
  //   console.log(reciepes)
  // }, [reciepes])
  return (
    <div>
      <MyContext.Provider value={{ reciepes, setReciepes }} >
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/reciepe/:id">
              <Reciepe />
            </Route>
          </Switch>

        </Router></MyContext.Provider>
    </div>



  );
}

export default App;
