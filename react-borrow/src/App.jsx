import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BackendLayout from './layouts/BackendLayout'
import Login from './layouts/Login'
import User from './pages/User'
import BorrowList from './pages/BorrowList'
import EquipMent from './pages/EquipMent'
import {USER_PATH,BORROW_LIST_PATH,DASHBOARD_PATH,CUSTOMER_PATH,REPORT_PATH,EQUIPMENT_PATH} from "./configs/constants"
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BackendLayout />}>
          <Route path={USER_PATH} element={<User />} />
          <Route path={BORROW_LIST_PATH} element={<BorrowList />} />
          <Route path={EQUIPMENT_PATH} element={<EquipMent />} />
        </Route>
        <Route element={<Login />} path='/'></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
