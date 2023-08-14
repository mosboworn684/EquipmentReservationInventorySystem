import { Outlet } from "react-router-dom"
import Box from '@mui/material/Box';
import CssBaseline from "@mui/material/CssBaseline"
import AppHeader from "../components/AppHeader"
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
const BackendLayout = () => {
  function authen() {
    const token = localStorage.getItem('token')
    axios.post('http://127.0.0.1:3002/authen',{}, {
      headers: { 
        Authorization: "Bearer " +token 
      },
    })
      .then(response => {
        const data = response.data
        if (data.status == "success") {
        }
        else {
          Swal.fire({
            title: 'Login ไม่สำเร็จ',
            text: 'กรุณาลองใหม่อีกครั้ง',
            icon: 'error',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.removeItem('token')
              window.location = '/'
            }
          });
         
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => {
    authen()
  }, [])
  return (
    <>
      <CssBaseline />
      <AppHeader />
      <Box sx={styles.container}>
        <SideNav />
        <Box component={"main"} sx={styles.mainSection}>
          <Outlet />
        </Box>
      </Box>
    </>
  )
}

const styles = {
  container: {
    display: "flex",
    bgcolor: "neutral.light",
  },
  mainSection: {
    px: 4,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
}

export default BackendLayout