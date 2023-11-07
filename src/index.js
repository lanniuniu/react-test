/**
 * 对ie11兼容
 */
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>123</div>
  </React.StrictMode>
);

fetch('/zhihu/api/v3/feed/topstory/recommend?action=down&ad_interval=-10&after_id=5&desktop=true&page_number=2&session_token=df6d332d49824605929a292301bbece6').then(Response => Response.json()).then(res => console.log(res));
