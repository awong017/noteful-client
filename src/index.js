import React from 'react'
import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faChevronLeft, faTrashAlt, faCheckDouble
} from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router } from "react-router-dom";
import 'typeface-roboto'
import './index.css'
import App from './App/App'

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble)

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
