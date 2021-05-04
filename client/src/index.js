import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Dropdown from './components/Dropdown/Dropdown';

export { Dropdown };


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
