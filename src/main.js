import "@babel/polyfill";
import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, IndexRoute, Switch, HashRouter } from 'react-router-dom'
import App from './App'
import './main.css'
import configureStore from './configureStore'

const store = configureStore();

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers/LayoutPage', renderApp)
}

renderApp()