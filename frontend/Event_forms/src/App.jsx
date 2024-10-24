import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainForm from './components/MainForm';
import StudentDetails from './components/StudentsDetails';
const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainForm />} />
            <Route path="/view" element={<StudentDetails />} /> {/* Corrected component name */}
          </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
