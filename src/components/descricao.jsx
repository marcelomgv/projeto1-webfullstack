import { Card, Spinner } from "react-bootstrap";
import { useZelda } from "../contexts/zeldaContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function DetalhesItem() {
  const { id } = useParams();
  const {
    loading,
    currentCharacter,
    getCharacterDetails,
    getGameById,
    games,
  } = useZelda();

  useEffect(() => {
    getCharacterDetails(id);
  }, [id, getCharacterDetails]);

  useEffect(() => {
    if (currentCharacter?.appearances) {
      currentCharacter.appearances.forEach((url) => {
        const match = url.match(/\/games\/([^/]+)/);
        if (match) {
          const gameId = match[1];
          getGameById(gameId);
        }
      });
    }
  }, [currentCharacter, getGameById]);

  if (loading || !currentCharacter) {
    return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  }

  const item = currentCharacter;

  return (
    <Card className="mt-4 shadow">
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>

        <Card.Text>
          <strong>Description:</strong> {item.description || "Sem descrição."}
        </Card.Text>

        {item.gender && (
          <Card.Text>
            <strong>Gender:</strong> {item.gender}
          </Card.Text>
        )}

        {item.race && (
          <Card.Text>
            <strong>Race:</strong> {item.race}
          </Card.Text>
        )}

        {item.appearances?.length > 0 && (
          <Card.Text>
            <strong>Appearances:</strong>
            <ul>
              {item.appearances.map((url, i) => {
                const match = url.match(/\/games\/([^/]+)/);
                const gameId = match ? match[1] : null;
                const game = gameId ? games[gameId] : null;

                return (
                  <li key={i}>
                    {game ? (
                      game.name
                    ) : (
                      "Carregando nome do jogo..."
                    )}
                  </li>
                );
              })}
            </ul>
          </Card.Text>
        )}

      </Card.Body>
    </Card>
  );
}
