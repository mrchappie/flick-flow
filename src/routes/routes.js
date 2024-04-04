import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import About from '../pages/about/About';
import Contact from '../pages/contact/Contact';
import NotFound from '../pages/404/NotFound';
import Navigation from '../components/nav/nav.js';

function RoutesContext() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesContext;
