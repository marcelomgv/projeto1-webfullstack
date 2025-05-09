import { useEffect } from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useZelda } from "../contexts/zeldaContext";

const Personagens = () => {
  const { characters, loading, listCharacters, hasMoreCharacters } = useZelda();

  useEffect(() => {
    if (characters.length === 0) {
      listCharacters(1);
    }
  }, [characters.length, listCharacters]);

  return (
    <>
      <p className="titulo">Galeria de Personagens</p>
      <Row className="row">
        {characters.map((character) => (
          <Col md={4} key={character.id} className="mb-4">
            <Link to={`/personagem/${character.id}`} style={{ textDecoration: "none" }}>
              <Card className="character-card">
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{character.name}</Card.Title>
                  {character.description && (
                    <Card.Text className="card-text">
                      {character.description.slice(0, 100)}...
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}

      {!hasMoreCharacters && !loading && (
        <div>
          <p>Fim da lista.</p>
        </div>
      )}
    </>
  );
}

export default Personagens;