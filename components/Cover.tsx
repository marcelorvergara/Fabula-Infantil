import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const CenterBook = styled.section`
  width: 95%;
  margin: 10px auto;
`;

const CoverBack = styled.div<TSStyledCoverBack>`
  cursor: pointer;
  height: 880px;
  width: 320px;
  background-image: linear-gradient(to top, #3c3c5c, #495a83, #49758a);
  border-radius: 2px 20px 20px 2px;
  box-shadow: 1px 1px 10px gray;
  transform: rotateX(10deg);
  transform-origin: center left;
  ${(props) => {
    if (props.hasHovered) {
      return css`
        transform: rotateX(10deg) rotateY(-180deg);
        transition-duration: 3s;
      `;
    }
    return "";
  }}
  color: white;
  font-size: 1.8rem;
  position: absolute;
  z-index: 1;
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const Content = styled.div<TSStyledCoverBack>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  padding: 48px;
  ${(props) => {
    if (props.hasHovered) {
      return css`
        animation: ${fadeOut} 2s linear;
        animation-fill-mode: forwards;
      `;
    }
    return "";
  }}
`;

const Title = styled.h1`
  font-family: "Arial", sans-serif;
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 16px 0;
  color: #ffd700;
`;

const Subtitle = styled.h2`
  font-family: "Arial", sans-serif;
  font-size: 1.5rem;
  font-weight: normal;
  text-align: center;
  margin: 0 0 8px 0;
  color: #ffffff;
`;

const Author = styled.h3`
  font-family: "Arial", sans-serif;
  font-size: 1.2rem;
  font-weight: normal;
  text-align: center;
  margin: 0 0 4px 0;
  color: #ffffff;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("URL_DA_IMAGEM_DO_FUNDO");
  background-size: cover;
  background-position: center;
  opacity: 0.5;
  z-index: -1;
`;

type TSStyledCoverBack = {
  hasHovered?: boolean;
};

export default function Book() {
  const [hasHovered, setHasHovered] = useState(false);

  useEffect(() => {
    const handleMouseOver = () => {
      setHasHovered(true);
    };

    if (!hasHovered) {
      const cover = document.getElementById("cover");
      if (cover) {
        cover.addEventListener("mouseover", handleMouseOver);
      }
    }

    return () => {
      const cover = document.getElementById("cover");
      if (cover) {
        cover.removeEventListener("mouseover", handleMouseOver);
      }
    };
  }, [hasHovered]);

  return (
    <CenterBook id="cover">
      <CoverBack hasHovered={hasHovered}>
        <Content hasHovered={hasHovered}>
          <Title>Fábula Infantil</Title>
          <Subtitle>Histórias Criadas por Você</Subtitle>
          {/* <Author>por Você Mesmo</Author> */}
        </Content>
      </CoverBack>
    </CenterBook>
  );
}
