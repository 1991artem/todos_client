import { Navbar, Container, Nav } from "react-bootstrap";
import TodosIcon from './TodosIcon';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [state, setState] = useState(true)
  const navigate = useNavigate()
  const buttonHandler = () => {
    localStorage.removeItem('user')
    navigate('/')
    setState(prev => !prev)
  }
  return ( 
      <Navbar className="header" bg="primary" variant="dark">
        <TodosIcon />
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      <Button type="button" onClick={buttonHandler}>Logout</Button>
      </Navbar>
    );
}

export default Header;