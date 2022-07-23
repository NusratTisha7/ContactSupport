import {
    Card,
    Table,
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";
import Navbar from '../components/navbar';
import { useState, useEffect } from "react";
import { getAll, deleteUserApi } from '../api/userApi';
import EditUser from "../components/modals/editUser";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from "../components/modals/addUser";

export default function SupportList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAll().then(res => {
            setUsers(res.data)
        })
    }, [users])

    const [userId, setUserId] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = (id) => () => {
        setOpen(true)
        setUserId(id)
    };
    const handleClose = () => setOpen(false);

    const [user, setUser] = useState(false);
    const handleUserOpen = () => setUser(true);
    const handleUserClose = () => setUser(false);


    const deleteUser = (id) => () => {
        deleteUserApi(id)
    }

    return (
        <div>
            <Navbar />
            <div className="text-center mt-4">
                <button className='btn btn-success' onClick={handleUserOpen} >Add User</button>
                {open && (
                    <EditUser open={open} handleClose={handleClose} userId={userId} />
                )}
                {user && (
                    <AddUser open={user}  handleClose={handleUserClose} />
                )}

                <div className="m-5">
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <Card className="strpied-tabled-with-hover">
                                    <Card.Body className="table-full-width table-responsive px-0">
                                        <Table className="table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th className="border-0">#</th>
                                                    <th className="border-0">User ID</th>
                                                    <th className="border-0">User Name</th>
                                                    <th className="border-0">Full Name</th>
                                                    <th className="border-0">Total Support</th>
                                                    <th className="border-0"></th>
                                                    <th className="border-0"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users && users.map((user, index) => {
                                                    return (
                                                        <tr className="mt-2">
                                                            <td className="border-0">{index + 1}</td>
                                                            <td className="border-0">{user.id}</td>
                                                            <td className="border-0">{user.userName}</td>
                                                            <td className="border-0">{user.fullName}</td>
                                                            <td className="border-0">{user.totalSupport}</td>
                                                            <td className="border-0"><Button variant="primary" onClick={handleOpen(user._id)}><ModeEditIcon /></Button></td>
                                                            <td className="border-0"><Button variant="danger" onClick={deleteUser(user._id)}><DeleteIcon /></Button></td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div >
    );
}