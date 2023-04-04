import BackCover from "@/components/BackCover";
import Cover from "@/components/Cover";
import KeywordPage from "@/components/KeywordPage";
import FourthPage from "@/components/FourthPage";
import LastPage from "@/components/LastPage";
import AgePage from "@/components/AgePage";
import ThirdPage from "@/components/ThirdPage";
import { generateImage, getText } from "@/helpers/fetchHelper";
import { IMessage, IResult } from "@/interfaces/IResult";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { getFirst60Percent } from "@/helpers/generalFunctions";

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

const placeHolderImg =
  "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState<IResult>();
  const [resetPage, setResetPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [story, setStory] = useState<string[]>([""]);
  const router = useRouter();
  const [firstImage, setFirstImage] = useState(placeHolderImg);
  const [secondImage, setSecondImage] = useState(placeHolderImg);
  const [thirdImage, setThirdImage] = useState(placeHolderImg);

  const handleKw = (kw: string) => {
    setKeyword(kw);
  };

  const handleAge = async (ageStr: string) => {
    try {
      setIsLoading(true);
      setAge(ageStr);
      // got to the back-end api to generate story
      const result = await getText(keyword, ageStr);
      const resultJson = (await result.json()) as IResult;
      // text to show in screen
      setResult(resultJson);
      // text to share after story is complete
      setStory([keyword]);
      // if there is an error in the generation of the story
      if (resultJson.result.message.content.indexOf("\n") === -1) {
        setResetPage(true);
        return;
      }
      // generate first image
      const image1 = await generateImage(
        "gere uma imgaem sem texto para uma criança com idade entre " +
          ageStr.replace("_", " e ") +
          " anos sobre o seguinte texto: " +
          keyword +
          ". " +
          getFirst60Percent(
            resultJson.result.message.content.replace("\\n", " ")
          )
      );
      const image1Json = await image1.json();
      setFirstImage(image1Json.result);
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
        const resultJson = (await resultOption.json()) as IResult;
        setResult(resultJson);
        // text to share after story is complete
        const storyCp = story;
        storyCp?.push(choosedOption.content, selectedOption.content);
        setStory(storyCp);
        // generate second image
        const image2 = await generateImage(
          "gere uma imgaem sem texto para uma criança com idade entre " +
            age.replace("_", " e ") +
            " anos sobre o seguinte texto: " +
            keyword +
            ". " +
            getFirst60Percent(
              resultJson.result.message.content.replace("\\n", " ")
            )
        );
        const image2Json = await image2.json();
        setSecondImage(image2Json.result);
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
        const resultJson = (await resultOption.json()) as IResult;
        setResult(resultJson);
        // text to share after story is complete
        const storyCp = story;
        storyCp?.push(
          choosedOption.content,
          selectedOption.content,
          resultJson.result.message.content
        );
        setStory(storyCp);
        // generate third image
        const image3 = await generateImage(
          "gere uma imgaem sem texto para uma criança com idade entre " +
            age.replace("_", " e ") +
            " anos sobre o seguinte texto: " +
            keyword +
            ". " +
            getFirst60Percent(
              resultJson.result.message.content.replace("\\n", " ")
            )
        );
        const image3Json = await image3.json();
        setThirdImage(image3Json.result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = (cond: boolean) => {
    setResetPage(cond);
    setResult({} as IResult);
    setFirstImage(placeHolderImg);
    setSecondImage(placeHolderImg);
    setThirdImage(placeHolderImg);
  };

  useEffect(() => {
    if (resetPage) {
      setResetPage(false);
    }
  }, [resetPage]);

  function shareStory() {
    router.push(`/stories/id/${encodeURIComponent(story.join("\\;"))}`);
  }

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
          isLoading={isLoading}
          image={firstImage}></ThirdPage>
        <FourthPage
          onSendOption={handleOption2}
          resetPage={resetPage}
          result={result}
          isLoading={isLoading}
          image={secondImage}></FourthPage>
        <LastPage
          resetPage={resetPage}
          result={result}
          isLoading={isLoading}
          image={thirdImage}></LastPage>
        <BackCover onSendReset={handleReset} shareStory={shareStory} />
      </Wrapper>
    </MasterDiv>
  );
}
