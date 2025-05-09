import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container>
            <Row className="home">
                <div className="home-desc">
                    <p className="titulo">Zelda Compendium</p>
                    <p>
                        Explore as características dos personagens dos jogos da franquia Zelda.
                    </p>
                </div>
                <Col className="home-btt">
                    <Link to='/personagens'>
                        <Button className="btt">Galeria de Personagens</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;