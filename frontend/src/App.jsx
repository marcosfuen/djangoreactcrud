import { useState } from 'react'
import { Routes, Route } from 'react-router'
import './App.css'

import Home from './components/Home'
import Create from './components/Create'
import Edit from './components/Edit'
import Delete from './components/Delete'
import Navbar from './components/navbar/Navbar'

import CreateLeague from './components/model/league/CreateLeague'
import CreateCountry from './components/model/country/CreateCountry'
import CreateCharacteristic from './components/model/characteristic/CreateCharacteristic'
import UploadCsv from './components/forms/UploadCsv'
import AllLeague from './components/model/league/AllLeague'
import AllCountry from './components/model/country/AllCountry'
import AllCharacteristic from './components/model/characteristic/AllCharacteristic'
import DashboardPieChart from './components/DashboardPieChart'
import Calendar1 from './components/calendars/Calendar1'
import AppointmentsDetails from './components/model/appointments/AppointmentDetails'

function App() {

  return (
    <>
      <Navbar
        content={
          <Routes>
            <Route path="" element={<Home />}/>
            <Route path="/create" element={<Create />}/>
            <Route path="/edit/:id" element={<Edit />}/>
            <Route path="/delete/:id" element={<Delete />}/>
            
            <Route path="/league" element={<CreateLeague />}/>
            <Route path="/league/listAll" element={<AllLeague />}/>
            

            <Route path="/country" element={<CreateCountry />}/>
            <Route path="/country/listAll" element={<AllCountry />}/>
            
            <Route path="/characteristic" element={<CreateCharacteristic />}/>
            <Route path="/characteristic/listAll" element={<AllCharacteristic />}/>

            <Route path="/create/footballClub" element={<Create />}/>
            <Route path="/footballClub/piechart" element={<DashboardPieChart />}/>

            <Route path="/calendar1" element={<Calendar1 />}/>

            <Route path="/appDetails/:id" element={<AppointmentsDetails />}/>

          </Routes>
        } 
      />
      
    </>
  )
}

export default App
