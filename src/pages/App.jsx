import React from 'react';
import '../sass/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Error from './Error';
import Header from '../components/Header';
import Footer from '../components/Footer';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;