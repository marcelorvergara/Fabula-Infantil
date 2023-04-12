import BackCover from "@/components/BackCover";
import Cover from "@/components/Cover";
import KeywordPage from "@/components/KeywordPage";
import FourthPage from "@/components/FourthPage";
import LastPage from "@/components/LastPage";
import AgePage from "@/components/AgePage";
import ThirdPage from "@/components/ThirdPage";
import {
  generateImage,
  getText,
  shareStoryHelper,
} from "@/helpers/fetchHelper";
import { IMessage, IResult } from "@/interfaces/IResult";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getFirst60Percent } from "@/helpers/generalFunctions";

const FirstDiv = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 22px;
`;

const MotherDiv = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  /* Styles for desktop */
  @media (min-width: 768px) {
    justify-content: center;
  }
  /* Styles for smartphones */
  @media (max-width: 340px) {
    justify-content: start;
  }
`;

const Wrapper = styled.section`
  padding: 2px;
  margin-right: 18px;
  padding-right: 12px;
  width: 340px;
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
  const [firstImage, setFirstImage] = useState(placeHolderImg);
  const [secondImage, setSecondImage] = useState(placeHolderImg);
  const [thirdImage, setThirdImage] = useState(placeHolderImg);
  const [firstPart, setFirstPart] = useState<IMessage[]>([
    {
      role: "",
      content: "",
    },
  ]);

  const handleKw = (kw: string) => {
    if (kw === "") {
      setKeyword("Uma história legal");
    } else {
      setKeyword(kw);
    }
  };

  const handleAge = async (ageStr: string) => {
    try {
      setIsLoading(true);
      setAge(ageStr);
      // send to the back-end api to generate story
      const res = await getText(keyword, ageStr);
      const resultJson = (await res.json()) as IResult;

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
        const continueStory = [
          {
            role: "system",
            content:
              "lembre-se de dar as 3 opções mencionadas no início desse chat",
          },
          choosedOption,
          selectedOption,
        ];
        // send to the back-end
        const resultOption = await getText(keyword, age, continueStory);
        const resultJson = (await resultOption.json()) as IResult;
        // store the first part to send to the backend
        setFirstPart([choosedOption, selectedOption]);

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
        // store the second part of the story
        const choosedOption: IMessage = result?.result.message;
        // create the object to send the selected option
        const selectedOption = { role: "user", content: text };
        // create the array to send the first, second part and the selected option
        const continueStory = [...firstPart, choosedOption, selectedOption];
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

  async function shareStory() {
    const storyId = await shareStoryHelper(
      story,
      firstImage,
      secondImage,
      thirdImage
    );

    if (storyId !== null) {
      const storyIdJson = await storyId.json();
      // time necessary to store images in storage
      setTimeout(function () {
        window.open(`https://story.contaumconto.com/shareStory/${storyIdJson}`);
      }, 1500);
    }
  }

  return (
    <FirstDiv>
      <MotherDiv>
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
      </MotherDiv>
    </FirstDiv>
  );
}
