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
import { getAll } from '../api/supportApi';
import Reply from "../components/modals/reply";

export default function SupportList() {

  const [support, setSupport] = useState([]);

  useEffect(() => {
    getAll().then(res => {
      setSupport(res.data)
    })
  }, [support])

  const [supportId, setSupportId] = useState('');

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const reply = (id) => () => {
    setSupportId(id)
    handleOpen()
  }

  return (
    <div>
      <Navbar />
      {open && (
        <Reply open={open} handleOpen={handleOpen} handleClose={handleClose} supportId={supportId} />
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
                        <th className="border-0">Support ID</th>
                        <th className="border-0">User ID</th>
                        <th className="border-0">Support Type</th>
                        <th className="border-0">Support Text</th>
                        <th className="border-0">Email</th>
                        <th className="border-0">Staus</th>
                        <th className="border-0"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {support && support.map((data, index) => {
                        return (
                          <tr className="mt-2">
                            <td className="border-0">{index + 1}</td>
                            <td className="border-0">{data.id}</td>
                            <td className="border-0">{data.userID}</td>
                            <td className="border-0">{data.supportType}</td>
                            <td className="border-0">{data.supportText}</td>
                            <td className="border-0">{data.fromEmail}</td>
                            <td className="border-0">{data.status}</td>
                            {data.isReplied && (
                              <td className="border-0"><Button disabled={true}>Replied</Button></td>
                            )}
                            {!data.isReplied && (
                              <td className="border-0" onClick={reply(data._id)}><Button>Reply</Button></td>
                            )}
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
  );
}