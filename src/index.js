import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import dotenv from 'dotenv';
import App from './App';
dotenv.config({ path: './.env.local'});

ReactDOM.render(<App />, document.getElementById('root'));