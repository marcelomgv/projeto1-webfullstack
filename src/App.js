import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Routes from './routes';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar className="navbar">
        <Container className="contNavBar">
          <Navbar.Brand as={Link} to='/'>
            Zelda Compendium
          </Navbar.Brand>
          <Nav className="links">
            <Nav.Link as={Link} to='/personagens'>
              Personagens
            </Nav.Link>
            <Nav.Link as={Link} to='/monstros'>
              Monstros
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Routes />
      </Container>
    </>
  );
};

export default App;
