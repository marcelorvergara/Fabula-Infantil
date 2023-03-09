import BackCover from "@/components/BackCover";
import Cover from "@/components/Cover";
import KeywordPage from "@/components/KeywordPage";
import FourthPage from "@/components/FourthPage";
import LastPage from "@/components/LastPage";
import AgePage from "@/components/AgePage";
import ThirdPage from "@/components/ThirdPage";
import { getText } from "@/helpers/fetchHelper";
import { IMessage, IResult } from "@/interfaces/IResult";
import { useEffect, useState } from "react";
import styled from "styled-components";

const MasterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.section`
  padding: 2px;
  margin-right: 18px;
  padding-right: 12px;
`;

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<IResult>();
  const [resetPage, setResetPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKw = (text: string) => {
    setKeyword(text);
  };

  const handleAge = async (text: string) => {
    try {
      setIsLoading(true);
      setAge(text);
      // got to the back-end api to generate story
      const result = await getText(keyword, age);
      const resultJson = (await result.json()) as IResult;
      setResult(resultJson);
      // if there is an error in the generation of the story
      if (resultJson.result.message.content.indexOf("\n") === -1) {
        setResetPage(true);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOption = async (text: string) => {
    try {
      setIsLoading(true);
      if (result?.result.message) {
        // store the first part of the story
        const choosedOption: IMessage = result?.result.message;
        // create the object to send the selected option
        const selectedOption = { role: "user", content: text };
        // create the array to send the first part and the selected option
        const continueStory = [choosedOption, selectedOption];
        // send to the back-end
        const resultOption = await getText(keyword, age, continueStory);
        setResult(await resultOption.json());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOption2 = async (text: string) => {
    try {
      setIsLoading(true);
      if (result?.result.message) {
        // store the first part of the story
        const choosedOption: IMessage = result?.result.message;
        // create the object to send the selected option
        const selectedOption = { role: "user", content: text };
        // create the array to send the first part and the selected option
        const continueStory = [choosedOption, selectedOption];
        continueStory.push({
          role: "user",
          content:
            "gere o final da história com a opção escolhida e não dê mais opções para o usuário escolher",
        });
        // send to the back-end
        const resultOption = await getText(keyword, age, continueStory);
        const resultOptionJson = await resultOption.json();
        setResult(resultOptionJson);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOption3 = (text: string) => {
    console.log(text);
  };

  const handleReset = (cond: boolean) => {
    setResetPage(cond);
    setResult({} as IResult);
  };

  useEffect(() => {
    if (resetPage) {
      setResetPage(false);
    }
  }, [resetPage]);

  return (
    <MasterDiv>
      <Wrapper>
        <Cover />
        <KeywordPage
          onSendKw={handleKw}
          resetPage={resetPage}
          result={result}
        />
        <AgePage onSendAge={handleAge} resetPage={resetPage} />
        <ThirdPage
          onSendOption={handleOption}
          resetPage={resetPage}
          result={result}
          isLoading={isLoading}></ThirdPage>
        <FourthPage
          onSendOption={handleOption2}
          resetPage={resetPage}
          result={result}
          isLoading={isLoading}></FourthPage>
        <LastPage
          onSendOption={handleOption3}
          resetPage={resetPage}
          result={result}
          isLoading={isLoading}></LastPage>
        <BackCover onSendReset={handleReset} />
      </Wrapper>
    </MasterDiv>
  );
}
