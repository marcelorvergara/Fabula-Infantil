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
  background-color: #46485a;
  border-radius: 2px 20px 20px 2px;
  box-shadow: 1px 1px 10px gray;
  transform: rotateX(10deg);
  transform-origin: center left;
  /* the cover only opens */
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
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  padding: 12px;
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

const Btn = styled.button<{ buynow: boolean }>`
  background-color: ${({ buynow }) =>
    buynow ? "hsla(40, 72%, 50%, 1)" : "hsla(347, 49%, 46%, 1)"};
  border: 1px solid
    ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 60%, 1)" : "hsla(0, 0%, 0%, 0.4)"};
  color: hsla(150, 14%, 97%, 1);
  cursor: pointer;
  outline: none;
  font-size: 0.895rem;
  text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
  letter-spacing: 0.1rem;
  border-radius: 0.5rem;
  user-select: none;
  padding: 1.5rem 2rem;
  margin: 1rem;
  transition: all 0.1s ease-in;

  ::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 60%, 1)" : "hsla(347, 49%, 51%, 1)"};
    ${({ buynow }) => buynow && `transform: translateY(-3px)`}
  }

  &:active {
    background-color: ${({ buynow }) =>
      buynow ? "hsla(40, 72%, 35%, 1)" : "hsla(347, 49%, 26%, 1)"};
  }
`;

const SignInBtn = styled(Btn)`
  text-decoration: none;
  background-color: hsla(189, 85%, 28%, 1);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.0125),
    0 1px 1px rgba(0, 0, 0, 0.05);
  border-bottom-width: 0.5rem;

  &:hover {
    background-color: hsla(189, 85%, 32%, 1);
  }

  &:active {
    border-bottom-width: 0.1rem;
    border-top-width: 0.5rem;
  }
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
          <SignInBtn buynow>Era uma vez...</SignInBtn>
        </Content>
      </CoverBack>
    </CenterBook>
  );
}
