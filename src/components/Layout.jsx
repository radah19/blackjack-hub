import { Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = () => {
  return (
    <div style={{position: 'fixed', top: 0, right: 0, width: "100%",overflowY:'scroll', height:'100vh', backgroundColor:'#474747'}}>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Navbar.Brand>Blackjack Hub</Navbar.Brand>
                    <Nav.Link><Link to={"/"}>Home</Link></Nav.Link>
                    <Nav.Link><Link to={"/new"}>Create</Link></Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        <br />

      <Outlet />
    </div>
  );
};

export default Layout;