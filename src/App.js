import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router , Switch, Route} from "react-router-dom";
import Reels from './Reels';
import Home from './Home';



  function App() {

  return (
    //asdfg
    <Router>
          <div className="App">
          
          <Switch>
                <Route path="/reels">
                   <Reels />
                </Route>
                
                <Route path="/">
                
                    <Home />
                </Route>
          </Switch>
           </div>
    </Router>
  );
    
  }
export default App;