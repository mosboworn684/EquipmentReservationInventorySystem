import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
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
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
const BorrowList = () => {
  const user_id = localStorage.getItem('user_id')
  const [open, setOpen] = useState(false);
  const [borrow, setBorrow] = useState([]);
  const [equipments, setEquipment] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [valEquipment, setSelectEquipment] = useState('');

  function BorrowShow() {
    axios.get("http://127.0.0.1:3002/show-borrow").then(response => {
      const data = response.data
      setBorrow(data)
    })
  }
  function EquipmentShow() {
    axios.get("http://127.0.0.1:3002/show-equipment").then(response => {
      const data = response.data
      setEquipment(data)
    })
  }
  useEffect(() => {
    BorrowShow()
    EquipmentShow()
  }, [])
  const addBorrow = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata = {
      equipment_id: data.get("equipment"),
      user_id: user_id,
      amount: data.get("amount"),
    }
    axios.post('http://127.0.0.1:3002/add-borrow',
      jsondata
    )
      .then(response => {
        const data = response.data
        if (data.status == "success") {
          setOpen(false);
          Swal.fire({
            title: 'ยืมอุปกรณ์สำเร็จ',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload()
            }
          });
        }
        else {
          setOpen(false);
          Swal.fire({
            title: 'ไม่สามารถบันทึกข้อมูลได้',
            text: 'อุปกรณ์คงเหลือไม่เพียงพอ',
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
  const returnBorrow = (id, event) => {
    Swal.fire({
      title: 'ยืนยันการคืนอุปกรณ์',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put('http://127.0.0.1:3002/return-borrow/' + id,
        )
          .then(response => {
            const data = response.data
            if (data.status == "success") {
              Swal.fire({
                title: 'ยืนยันการคืนอุปกรณ์',
                icon: 'success',
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload();
                }
              });
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'ไม่สามารถคืนอุปกรณ์ได้',
              icon: 'error',
            })
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
      }
    })
  }
  const selectEquipment = (event) => {
    setSelectEquipment(event.target.value);
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
                  รายการยืม-คืน อุปกรณ์
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={handleOpen} sx={styles.customButton}>ยืมอุปกรณ์</Button>
              </Box>
            </Box>
            <hr />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...styles.tablehead, width: '20%' }}>อุปกรณ์</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '30%' }} >ชื่อผู้ยืม</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '10%' }} align="center">จำนวน</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '10%' }} >วันที่ยืม</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '10%' }} >วันที่คืน</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '10%' }} >สถานะ</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '10%' }} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {borrow.map((row, key) => (
                    <TableRow key={key}>
                      <TableCell sx={styles.tablebody}>{row.equipment.name}</TableCell>
                      <TableCell sx={styles.tablebody}>{row.user.first_name} {row.user.last_name} </TableCell>
                      <TableCell sx={styles.tablebody} align="center">{row.amount}</TableCell>
                      <TableCell sx={styles.tablebody}>{row.borrow_date}</TableCell>
                      <TableCell sx={styles.tablebody}>{row.return_date}</TableCell>
                      <TableCell sx={styles.tablebody} align="center">
                        {row.status === 1 ? (
                          <Typography id="modal-modal-title" variant="h6" sx={{ ...styles.badge, bgcolor: '#ffc107' }} component="h2">
                            รอคืน
                          </Typography>
                        ) : (
                          <Typography id="modal-modal-title" variant="h6" sx={{ ...styles.badge, bgcolor: '#00e676' }} component="h2">
                            สำเร็จ
                          </Typography>
                          //  #0DCAF0  
                        )}

                      </TableCell>
                      <TableCell sx={styles.tablebody} align="center">
                        {row.status === 1 && row.user_id == user_id ? (
                          <Button size='small' variant="outlined" onClick={() => returnBorrow(row.id)} endIcon={<SendIcon />} sx={{ borderRadius: 2, }} color="inherit">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                              คืนอุปกรณ์
                            </Typography>
                          </Button>
                        ) : ""}
                      </TableCell>
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
            เพิ่มอุปกรณ์
          </Typography>
          <hr />
          <Box component="form" onSubmit={addBorrow} sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">อุปกรณ์</InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="equipment"
                value={valEquipment}
                label="กรุณาเลือกอุปกรณ์"
                onChange={selectEquipment}
              >
                {equipments.map((row, index) => (
                  <MenuItem key={index} value={row.id}>{row.name} คงเหลือ: {row.amount}</MenuItem>
                ))}
              </Select>
              <TextField
                margin="normal"
                required
                fullWidth
                name="amount"
                label="จำนวนที่ต้องการยืม"
                type="number"
                id="amount"
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


export default BorrowList
