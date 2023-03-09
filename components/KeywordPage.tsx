import { IResult } from "@/interfaces/IResult";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const CenterFP = styled.section`
  width: 95%;
  margin: 6px auto;
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
  z-index: -1;
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
  margin: 40px 0 12px 0;
  height: 840px;
  text-align: right;
`;

const Input = styled.input`
  width: 80%;
  font-size: 18px;
  padding: 10px;
  margin: 10px;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: palevioletred;
  }
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  margin-bottom: 12px;
`;

const Result = styled.div`
  background-color: red;
  color: white;
`;

type TSStyledClickd = {
  hasClicked: boolean;
};

export interface IKeywordPageProps {
  onSendKw: (text: string) => void;
  resetPage: boolean;
  result?: IResult;
}

export default function KeywordPage({
  onSendKw,
  resetPage,
  result,
}: IKeywordPageProps) {
  const [hasClicked, setHasClicked] = useState(false);
  // keyword
  const [kw, setKw] = useState("");

  function handleKeyword() {
    onSendKw(kw);
  }
  function handleKwChange(event: React.ChangeEvent<HTMLInputElement>) {
    setKw(event.target.value);
  }

  function sendBtn() {
    handleKeyword();
    setHasClicked(true);
  }

  useEffect(() => {
    if (resetPage) {
      setHasClicked(false);
    }
  }, [resetPage]);

  return (
    <CenterFP>
      <FPDiv hasClicked={hasClicked}>
        <Content hasClicked={hasClicked}>
          <Input
            placeholder="digite aqui uma palavra"
            onChange={handleKwChange}></Input>
          <Button onClick={sendBtn}>Enviar</Button>
          {result?.result && <Result>{result?.result.message.content}</Result>}
        </Content>
      </FPDiv>
    </CenterFP>
  );
}
