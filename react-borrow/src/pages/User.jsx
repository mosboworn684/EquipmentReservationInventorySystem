import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react"
import axios from "axios"
import FormControl from '@mui/material/FormControl';
import Swal from 'sweetalert2'

const User = () => {
  const user_id = localStorage.getItem('user_id')
  const [open, setOpen] = useState(false);
  const [users, setUser] = useState([]);
  const [equipments, setEquipment] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function UserShow() {
    axios.get("http://127.0.0.1:3002/showuser").then(response => {
      const data = response.data
      setUser(data)
    })
  }
  function EquipmentShow() {
    axios.get("http://127.0.0.1:3002/show-equipment").then(response => {
      const data = response.data
      setEquipment(data)
    })
  }
  useEffect(() => {
    UserShow()
    EquipmentShow()
  }, [])
  const addUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata = {
      username: data.get("username"),
      password: data.get("password"),
      first_name: data.get("firstName"),
      last_name: data.get("lastName"),
    }
    axios.post('http://127.0.0.1:3002/adduser',
      jsondata
    )
      .then(response => {
        const data = response.data
        if (data.status == "success") {
          setOpen(false);
          Swal.fire({
            title: 'บันทึกข้อมูลสำเร็จ',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          });
        }
        else {
          Swal.fire({
            title: 'ไม่สามารถบันทึกข้อมูลได้',
            text: 'กรุณาลองใหม่อีกครั้ง',
            icon: 'error',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          });
        }
      })
      .catch(error => {
        console.log(error)
      })
  };
  return (
    <>
      <br />
      <Box >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Box display="flex">
              <Box flexGrow={1}>
                <Typography component="h2" variant="h5" gutterBottom>
                  รายชื่อผู้ใช้งาน
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={handleOpen} sx={styles.customButton}>เพิ่มผู้ใช้</Button>
              </Box>
            </Box>
            <hr />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...styles.tablehead, width: '80%' }} >ชื่อ-นามสกุล</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((row, key) => (
                    <TableRow key={key}>
                      <TableCell sx={styles.tablebody}>{row.first_name} {row.last_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <br></br>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalCreateUser}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            เพิ่มผู้ใช้
          </Typography>
          <hr />
          <Box component="form" onSubmit={addUser} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                name="username"
                label="username"
                type="text"
                id="username"
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="ชื่อ"
                type="text"
                id="firstName"
                variant="outlined"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="นามสกุล"
                type="text"
                id="lastName"
                variant="outlined"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography component="h2" variant="h6" >
                  บันทึก
                </Typography>
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
const styles = {

  modalCreateUser: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 3,
    borderRadius: 2,
    p: 2,
  },
  badge: {
    width: 'auto',
    borderRadius: 2,
  },
  tablehead: {
    fontWeight: 'bold',
    fontSize: 20,
    bgcolor: '#EEEEEE'
  },
  tablebody: {
    fontSize: 18
  },
  customButton: {
    marginBottom: '15px',
    backgroundColor: 'teal',
    '&:hover': {
      backgroundColor: 'darkcyan', // สีพื้นหลังเมื่อ hover
    },
  },
}
export default User