import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventsPage from './pages/EventsPage';
import ViewTeams from './components/StudentTable';
import EventDetails from './pages/RegisterPage';
import Header from './pages/Home';
const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
          <Route path="/" element={<Header />} /> 
            <Route path="/view" element={<ViewTeams />} /> 
            <Route path="/card" element={<EventsPage />} /> 
            <Route path="/register/:event" element={<EventDetails />} /> 
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
