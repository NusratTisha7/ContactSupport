import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap'
import {
  Button
} from "@mui/material";
import Navbar from '../components/navbar';
import { getAll,deleteSupport } from '../api/supportApi';
import jwt_decode from 'jwt-decode';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSupport from "../components/modals/addSupport";
import EditSupport from "../components/modals/editSupport";

export default function Home() {

  const [token, setToken] = useState('');
  const [id, setId] = useState('');
  const [support, setSupport] = useState([]);

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('jwt')))
    const decoded = jwt_decode(JSON.parse(localStorage.getItem('jwt')));
    setId(decoded.id)
  }, [])

  useEffect(() => {
    getAll().then(res => {
      setSupport(res.data)
    })
  }, [support])


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [edit, setEdit] = useState(false);
  const [supportId, setSupportId] = useState('');

  const handleEditOpen = (id) => ()=>{
    setSupportId(id)
    setEdit(true)};
  const handleEditClose = () => setEdit(false);

  const deleteContactSupport = (id)=>()=>{
    deleteSupport(id)
  }

  return (
    <div>
      <Navbar />
      <div className="text-center mt-4">
        <button className='btn btn-success' onClick={handleOpen} >Add Contact Support</button>
        {open && (
          <AddSupport open={open} handleOpen={handleOpen} handleClose={handleClose} token={token} id={id} />
        )}
        {edit && (
          <EditSupport edit={edit} handleOpen={handleEditOpen} handleEditClose={handleEditClose} token={token} supportId={supportId}/>
        )}
        <div className="mx-5">
          {support && support.filter(filteredData => filteredData.userID === id).map((support, index) => (
            <div className="m-2 p-2">
              <Card>
                <Card.Body>
                  <Card.Title>{support.supportType}</Card.Title>
                  <Card.Text>
                    {support.supportText} <br />
                    Status: {support.status}
                  </Card.Text>
                  <Button variant="primary" onClick={handleEditOpen(support._id)}><ModeEditIcon /></Button>
                  <Button variant="primary" onClick={deleteContactSupport(support._id)}><DeleteIcon /></Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}