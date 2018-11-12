// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// // import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// // serviceWorker.unregister();


import _ from 'lodash';
function component() {
    var element = document.createElement('div');
  
    element.innerHTML = _.join(['Hello', '1133webp22ack22221'], ' ');
  
    return element;
  }

  console.log(process.env.NODE_ENV);
  
  document.body.appendChild(component());