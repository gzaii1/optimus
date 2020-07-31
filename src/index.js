import React from 'react';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '@store';
import { render } from 'react-dom';
import 'antd/dist/antd.css'

if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(()=>{
        console.log('sw success')
      })
      .catch(()=>{
        console.log('sw failed')
      })
  })
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
