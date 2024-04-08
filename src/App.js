
//import './App.css';

import ScheduleComponent from './components/horario';
import DataInputComponent from './components/inicio';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataInputComponent />} />
        <Route path="/schedule" element={<ScheduleComponent />} />
      </Routes>
    </Router>
    
  );
}

export default App;

