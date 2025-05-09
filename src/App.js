import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Routes from './routes';
import './App.css';

const App = () => {
  return (
    <>
    <div className="background">
      <div className="content">
      <Navbar className="navbar">
        <Container className="contNavBar">
          <Navbar.Brand as={Link} to='/'>
            Zelda Compendium
          </Navbar.Brand>
            <Nav.Link as={Link} to='/personagens'>
              Personagens
            </Nav.Link>
        </Container>
      </Navbar>
      <Container>
        <Routes />
      </Container>
      </div>
    
    </div>
    </>
  );
};

export default App;
