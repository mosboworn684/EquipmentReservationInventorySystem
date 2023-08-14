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
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
const EquipMent = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [equipments, setEquipment] = useState([]);
  const [getequipment, getEquipment] = useState();
  const modalOpenAddEquipment = () => setOpenAdd(true);
  const modalCloseAddEquipment = () => setOpenAdd(false);
  const modalOpenEditEquipMent = (id) => {
    EquipmentGet(id);
  };
  function EquipmentGet(id) {
    axios.get("http://127.0.0.1:3002/get-equipment/" + id).then(response => {
      const data = response.data
      getEquipment(data)
      if (data) {
        setOpenEdit(true);
      }
    })
  }

  const modalCloseEditEquipMent = () => setOpenEdit(false);
  function EquipmentShow() {
    axios.get("http://127.0.0.1:3002/show-equipment").then(response => {
      const data = response.data
      setEquipment(data)
    })
  }
  useEffect(() => {
    EquipmentShow()
  }, [])
  const addEquipment = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata = {
      name: data.get("equipMentName"),
      amount: data.get("amount"),
    }
    axios.post('http://127.0.0.1:3002/add-equipment',
      jsondata
    )
      .then(response => {
        const data = response.data
        if (data.status == "success") {
          setOpenAdd(false);
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
          setOpenAdd(false);
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
  const editEquipment = (event, id) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata = {
      name: data.get("equipMentName"),
      amount: data.get("amount"),
    }
    axios.put('http://127.0.0.1:3002/edit-equipment/' + id,
      jsondata
    )
      .then(response => {
        const data = response.data
        if (data.status == "success") {
          setOpenEdit(false);
          Swal.fire({
            title: 'แก้ไขข้อมูลสำเร็จ',
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
                  รายการอุปกรณ์
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={modalOpenAddEquipment} sx={{ mb: '15px', bgcolor: "teal" }}  >เพิ่มอุปกรณ์</Button>
              </Box>
            </Box>
            <hr />
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ ...styles.tablehead, width: '60%' }}>อุปกรณ์</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '30%' }} align="center">จำนวน</TableCell>
                    <TableCell sx={{ ...styles.tablehead, width: '10%' }} align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {equipments.map((row, key) => (
                    <TableRow key={key}>
                      <TableCell sx={styles.tablebody}>{row.name}</TableCell>
                      <TableCell sx={styles.tablebody} align="center">{row.amount} </TableCell>
                      <TableCell sx={styles.tablebody} align="center">
                        <IconButton onClick={() => modalOpenEditEquipMent(row.id)}>
                          <EditIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
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
      {/* Modal เพิ่มอุปกรณ์ */}
      <Modal
        open={openAdd}
        onClose={modalCloseEditEquipMent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalCreateUser}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            เพิ่มอุปกรณ์
          </Typography>
          <hr />
          <Box component="form" onSubmit={addEquipment} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="equipMentName"
              label="ชื่ออุปกรณ์"
              name="equipMentName"
              autoComplete="equipMentName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="จำนวน"
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
          </Box>
        </Box>
      </Modal>

      {/* Modal แก้ไขอุปกรณ์ */}
      <Modal
        open={openEdit}
        onClose={modalCloseAddEquipment}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles.modalCreateUser}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            แก้ไขอุปกรณ์
          </Typography>
          <hr />
          <Box component="form" onSubmit={(event) => editEquipment(event, getequipment ? getequipment.id : '')} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="equipMentName"
              label="ชื่ออุปกรณ์"
              name="equipMentName"
              defaultValue={getequipment ? getequipment.name : ''}
              autoComplete="equipMentName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amount"
              label="จำนวน"
              type="number"
              defaultValue={getequipment ? getequipment.amount : ''}
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
  tablehead: {
    fontWeight: 'bold',
    fontSize: 20,
    bgcolor: '#EEEEEE'
  },
  tablebody: {
    fontSize: 18
  },
}

export default EquipMent