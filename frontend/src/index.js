//React Imports
import React from 'react'
import ReactDOM from 'react-dom'

//Third-Party Imports
import { Provider } from 'react-redux'
import './bootstrap.min.css'
import './index.css'


//Internal Imports
import App from './App'
import store from './store'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
serviceWorker.unregister()
