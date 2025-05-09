import { useEffect, useState } from "react";
import { Card, Col, Row, Spinner, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useZelda } from "../contexts/zeldaContext";

const Personagens = () => {
  const { characters, loading, listCharacters, hasMoreCharacters } = useZelda();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    listCharacters(query);
  }, [query, listCharacters]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  return (
    <>
      <p className="titulo">Character Gallery</p>

      <div className="search">
        <Form onSubmit={handleSubmit} className="mb-4 d-flex" role="search">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="me-2"
          />
          <Button type="submit" variant="primary">Search</Button>
        </Form>
      </div>

      <Row className="row">
        {characters.map((character) => (
          <Col md={4} key={character.id} className="mb-4">
            <Link to={`/personagens/${character.id}`} style={{ textDecoration: "none" }}>
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

      {!loading && characters.length === 0 && (
        <p className="text-center">No characters found.</p>
      )}

    </>
  );
};

export default Personagens;
