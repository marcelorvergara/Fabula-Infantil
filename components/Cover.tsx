import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LoadingSpinner from "./SpinnerAnimation";

const CenterBook = styled.section`
  width: 95%;
  margin: 10px auto;
`;

const CoverBack = styled.div<TSStyledCoverBack>`
  cursor: pointer;
  margin: 10px 10px 5px 5px;
  height: 980px;
  width: 340px;
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

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  padding: 12px;
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
      document.addEventListener("mouseover", handleMouseOver);
    }

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [hasHovered]);

  return (
    <CenterBook>
      <CoverBack hasHovered={hasHovered}>
        <Content>Deixe-me contar uma história...</Content>
      </CoverBack>
    </CenterBook>
  );
}
