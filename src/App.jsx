// src/App.js
import React from 'react';
import Header from './components/Header';
import AnnouncementBar from './components/AnnouncementBar';
import MainContent from './components/MainContent';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white font-satoshi">
      <AnnouncementBar />
      <Header />
      <main className="container mx-auto px-4 md:px-8 py-8">
        <MainContent />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;