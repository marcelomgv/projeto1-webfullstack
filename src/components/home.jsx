import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container>
            <Row className="home">
                <div className="home-desc">
                    <p className="titulo">Zelda Compendium</p>
                    <p>
                        Explore the characteristics of characters from the Zelda franchise games.
                    </p>
                </div>
                <Col className="home-btt">
                    <Link to='/personagens'>
                        <Button className="btt">Character Gallery</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;