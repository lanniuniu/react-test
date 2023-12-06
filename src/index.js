/**
 * 对ie11兼容
 */
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom/client';
import PokemonList from "./PokemonList";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PokemonList />
  </React.StrictMode>
);
