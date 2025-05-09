import { useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Container>
            <Row className="home">
                <div className="descHome">
                    <h1>Zelda Compendium</h1>
                    <p>
                        Explore as características dos personagens e monstrons de todos os jogos da franquia Zelda.
                    </p>
                </div>
                <Col className="bttHome">
                    <Link to='/personagens'>
                        <Button className="btt">Personagens</Button>
                    </Link>
                    <Link to='/monstros'>
                        <Button className="btt">Monstros</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;