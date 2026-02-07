"use client";

import React, { useState, useEffect, useMemo } from "react";

type Card = {
  id: number;
  value: number;
  isFlipped: boolean;
  isMatched: boolean;
};

const generateCards = (size: number): Card[] => {
  const numPairs = (size * size) / 2;
  const values = Array.from({ length: numPairs }, (_, i) => i + 1);
  const cardValues = [...values, ...values];

  // Proste tasowanie (algorytm Fisher-Yates)
  for (let i = cardValues.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardValues[i], cardValues[j]] = [cardValues[j], cardValues[i]];
  }

  return cardValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};

export default function Home() {
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const isGameOver = useMemo(() => {
    return cards.length > 0 && cards.every((card) => card.isMatched);
  }, [cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = flippedCards;

      if (firstCard.value === secondCard.value) {
        // Para znaleziona
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.value === firstCard.value
              ? { ...card, isMatched: true, isFlipped: true }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      } else {
        // Brak pary
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards]);

  const handleCardClick = (clickedCard: Card) => {
    if (isChecking || clickedCard.isFlipped || flippedCards.length === 2) {
      return;
    }

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );

    setFlippedCards((prev) => [...prev, { ...clickedCard, isFlipped: true }]);
  };

  const startGame = (size: number) => {
    setBoardSize(size);
    setCards(generateCards(size));
    setFlippedCards([]);
    setIsChecking(false);
  };

  const resetGame = () => {
    setBoardSize(null);
    setCards([]);
  };

  if (!boardSize) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui", textAlign: "center" }}>
        <h1>Gra w Pamięć</h1>
        <p>Wybierz rozmiar planszy:</p>
        <button onClick={() => startGame(4)} style={{ marginRight: 16, padding: '8px 16px' }}>4x4</button>
        <button onClick={() => startGame(8)} style={{ padding: '8px 16px' }}>8x8</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", textAlign: "center" }}>
      <h1>Gra w Pamięć</h1>
      {isGameOver ? (
        <div>
          <h2>Gratulacje! Wygrałeś!</h2>
          <button onClick={resetGame} style={{ padding: '8px 16px' }}>Zagraj ponownie</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${boardSize}, 1fr)`, gap: '10px', maxWidth: '600px', margin: 'auto' }}>
          {cards.map((card) => (
            <div key={card.id} onClick={() => handleCardClick(card)} style={{
              width: '60px', height: '60px',
              backgroundColor: card.isFlipped ? '#fff' : '#60a5fa',
              border: '2px solid #1e3a8a', borderRadius: '5px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', fontWeight: 'bold', cursor: 'pointer',
              transition: 'transform 0.5s', transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              opacity: card.isMatched ? 0.5 : 1,
            }}>
              {card.isFlipped ? card.value : ''}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
