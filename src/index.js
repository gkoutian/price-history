import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rutas from './components/Rutas';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Rutas />, document.getElementById('root'));
registerServiceWorker();
