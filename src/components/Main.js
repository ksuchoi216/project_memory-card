import React {useState, useEffect} from "react";
import styled from "styled-components";
import { capitalizeFirstLetter } from "../utils";

const Main = () => {
  const TheNumberOfCards = 12
  



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

  return (
    <MainWapper>
      <ScoreBoard />
      <GridBoardForCards />
    </MainWapper>
  );
};

// [Main]--------------------------------------------------------------------------------------------
const MainWapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondarygrey};
`;

export default Main;

// [Scoreboad]--------------------------------------------------------------------------------------------
const ScoreBoard = () => {
  return (
    <ScoreBoardContainer>
      <h3>ScoreBoard</h3>
      <ScoreBoardWapper>
        <CurrentScore>Current Score:</CurrentScore>
        <BestScore>Best Score:</BestScore>
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
const GridBoardForCards = () => {
  const Cards = pokemons.map((pokemon) => {
    <Card></Card>;
  });

  return (
    <GridBoardWapper>
      <GridBoard></GridBoard>
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

// [Grid][Card]--------------------------------------------------------------------------------------------
const Card = () => {
  return (
    <CardWapper>
      <Img/>
      <Caption></Caption>
    </CardWapper>
  )
};

const CardWapper = styled.div`
  display: plex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  padding: 4px;
`;

const Caption = styled.p`
  padding: 4px;
`;
