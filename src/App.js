import React, {Component} from "react"
import {BrowserRouter} from "react-router-dom"
import { Switch, Route, Redirect } from 'react-router-dom';
import ViewBook from "./ViewBook"



class App extends Component {
  constructor() {
      super()
      this.state = {
          name: "Sally",
          age: 13
      }
  }
    
  render() {
    

    return (
      <ViewBook />
    )    
  }
}

export default App
