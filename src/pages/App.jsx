import React from 'react';
import '../sass/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Book from './Book';
import Error from './Error';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Transform from'../components/Transform';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Book/:id" element={<Book />} />
                <Route path="*" element={<Error />} />
                <Route path="/Transform" element={<Transform />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
