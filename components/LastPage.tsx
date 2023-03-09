import { IResult } from "@/interfaces/IResult";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import LoadingSpinner from "./SpinnerAnimation";

const CenterFP = styled.section`
  width: 95%;
  margin: 1px auto;
`;

const FPDiv = styled.div<TSStyledClickd>`
  cursor: pointer;
  margin: 14px 10px 5px 5px;
  height: 970px;
  width: 330px;
  background-color: #e4e4e4;
  border-radius: 2px 20px 20px 2px;
  transform: rotateX(10deg);
  transform-origin: center left;
  color: darkblue;
  font-size: 1.2rem;
  position: absolute;
  z-index: -5;
  /* the cover only opens once */
  ${(props) => {
    if (props.hasClicked) {
      return css`
        z-index: 1;
        transform: rotateX(10deg) rotateY(-180deg);
        transition-duration: 3s;
      `;
    }
    return "";
  }}
`;

const Content = styled.div<TSStyledClickd>`
  /* hide content when page has changed */
  ${(props) => {
    if (props.hasClicked) {
      return css`
        transition-delay: 1s;
        display: none;
        visibility: hidden;
      `;
    }
    return "";
  }}
  display: block;
  margin: 20px 0 12px 0;
  height: 840px;
  text-align: left;
  padding: 2px;
`;

const Wrapper = styled.div`
  height: auto;
  width: 100%;
  padding: 0px 16px 24px 16px;
  box-sizing: border-box;
`;

type TSStyledClickd = {
  hasClicked: boolean;
};

export interface ILastPageProps {
  onSendOption: (text: string) => void;
  result?: IResult;
  isLoading: boolean;
  resetPage: boolean;
}

export default function LastPage({
  onSendOption,
  result,
  isLoading,
  resetPage,
}: ILastPageProps) {
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    if (resetPage) {
      setHasClicked(false);
    }
  }, [resetPage]);

  return (
    <CenterFP onClick={() => setHasClicked(true)}>
      <FPDiv hasClicked={hasClicked}>
        {isLoading && !hasClicked ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <Content hasClicked={hasClicked}>
            <Wrapper>
              {result?.result &&
                result?.result.message.content.split("\n").map((str, k) => (
                  <span key={k}>
                    {str} <br />
                  </span>
                ))}
            </Wrapper>
          </Content>
        )}
      </FPDiv>
    </CenterFP>
  );
}
