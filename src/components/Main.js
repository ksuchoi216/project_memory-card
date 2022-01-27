import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { capitalizeFirstLetter, shuffleArray } from "../utils";
import Data from "../data/Data";

const Main = () => {
  const TheNumberOfCards = 12;

  const [cards, setCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(Data.currentScore);
  const [bestScore, setBestScore] = useState(Data.bestScore);
  const [clickedCard, setClickedCard] = useState(Data.clickedCard);

  console.log(currentScore, bestScore, clickedCard);

  // [CreateCard] -------------------------------------------------------------------------
  useEffect(() => {
    const loadCards = async () => {
      setCards(shuffleArray(await fetchDatafromAPI(TheNumberOfCards)));
    };

    loadCards();
  }, []);

  const fetchDatafromAPI = async (amount) => {
    const pokemons = [];

    for (let i = 1; i <= amount; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      const response = await fetch(url);
      const pokemon = await response.json();
      const id = pokemon.id;
      const name = capitalizeFirstLetter(pokemon.name);
      const image = pokemon.sprites.front_default;
      pokemons.push({ id, name, image });
    }

    return pokemons;
  };

  // [ClickHandle] -------------------------------------------------------------------------
  const handleClickCard = (e) => {
    const pokemonName = e.target.parentNode.lastChild.textContent;
    PlayGame(pokemonName);
    setCards(shuffleArray(cards))
  };

  const PlayGame = (pokemonName) => {
    if (clickedCard.includes(pokemonName)) {
      resetGame();
    } else {
      const newScore = currentScore + 1;
      if (newScore > bestScore) {
        // userInfo.bestScore = newScore;
        setBestScore(newScore);
      }
      setCurrentScore(newScore);
      setClickedCard((prevState) => [...prevState, pokemonName]);
    }
  };

  const resetGame = () => {
    setClickedCard([])
    setCurrentScore(0)
  };

  return (
    <MainWapper>
      <ScoreBoard currentScore={currentScore} bestScore={bestScore}/>
      <GridBoardForCards cards={cards} onClick={handleClickCard} />
    </MainWapper>
  );
};

const MainWapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondarygrey};
`;

export default Main;

// [Scoreboad]--------------------------------------------------------------------------------------------
const ScoreBoard = ({currentScore, bestScore}) => {
  return (
    <ScoreBoardContainer>
      <h3>ScoreBoard</h3>
      <ScoreBoardWapper>
        <CurrentScore>Current Score:{currentScore}</CurrentScore>
        <BestScore>Best Score:{bestScore}</BestScore>
      </ScoreBoardWapper>
    </ScoreBoardContainer>
  );
};

const ScoreBoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondaryblue};
  margin: 20px 0px;
  border-radius: 10px;
  padding: 10px;
  width: 300px;
`;

const ScoreBoardWapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CurrentScore = styled.div`
  background-color: ${({ theme }) => theme.colors.hightlight};
  margin: 4px;
  padding: 8px;
  border-radius: 5px;
`;

const BestScore = styled.div`
  background-color: ${({ theme }) => theme.colors.secondarydark};
  margin: 4px;
  padding: 8px;
  border-radius: 5px;
`;

// [Grid]--------------------------------------------------------------------------------------------
const GridBoardForCards = ({ cards, onClick }) => {
  const pokemonCards = cards.map((card) => {
    return (
      <Card
        key={card.id}
        pokemon_name={card.name}
        pokemon_img={card.image}
        onClick={onClick}
      />
    );
  });

  return (
    <GridBoardWapper>
      <GridBoard>{pokemonCards}</GridBoard>
    </GridBoardWapper>
  );
};

const GridBoardWapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

// [Grid][Card]--------------------------------------------------------------------------------------------
const Card = ({ pokemon_name, pokemon_img, onClick }) => {
  return (
    <CardWapper onClick={onClick}>
      <Image src={pokemon_img} alt={pokemon_name} />
      <Caption>{pokemon_name}</Caption>
    </CardWapper>
  );
};

const CardWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondarydark};
  border-radius: 5px;
  margin: 10px;
  width: 100px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  background-color: ${({ theme }) => theme.colors.hightlight};
  margin: 4px;
  border-radius: 5px;
  padding: 4px;
  width: 80px;
`;

const Caption = styled.div`
  margin: 4px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 4px;
  width: 80px;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
`;
