import { Column, Container, Row } from "@/components/Grid";
import { generateImage } from "@/helpers/fetchHelper";
import Image from "next/image";

export async function getServerSideProps(context: {
  params: { Story: string };
}) {
  const storyArr = context.params.Story.split("\\;");

  try {
    const [image1Response, image2Response, image3Response] = await Promise.all([
      generateImage(storyArr[0] + storyArr[1]),
      generateImage(storyArr[3]),
      generateImage(storyArr[5]),
    ]);

    const [imageData1, imageData2, imageData3] = await Promise.all([
      image1Response.json(),
      image2Response.json(),
      image3Response.json(),
    ]);

    return {
      props: {
        storyArr,
        imageData: {
          result: [imageData1.result, imageData2.result, imageData3.result],
        },
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      props: {
        storyArr: [],
        imageData: { result: [] },
        error: error.message,
      },
    };
  }
}

interface Props {
  storyArr: string[];
  imageData: { result: string[] };
}

export default function Story({ storyArr, imageData }: Props) {
  return (
    <Container>
      <Row>
        <Column mobile={12} tablet={12} desktop={12}>
          <span>{storyArr[0]}</span>
        </Column>
      </Row>
      {/* first image */}
      <Row>
        <Column mobile={2} tablet={5} desktop={5}>
          <Image
            src={imageData.result[0]}
            alt={storyArr[0]}
            width={256}
            height={256}
          />
        </Column>
        <Column mobile={2} tablet={4} desktop={4}>
          {storyArr[1]}
        </Column>

        {/* second image */}
        <Column>
          <Image
            src={imageData.result[1]}
            alt={storyArr[0]}
            width={256}
            height={256}
          />
        </Column>
        <Column mobile={12} tablet={12} desktop={12}>
          <span>{storyArr[3]}</span>
        </Column>

        {/* third image */}
        <Column>
          <Image
            src={imageData.result[2]}
            alt={storyArr[0]}
            width={256}
            height={256}
          />
        </Column>
        <Column mobile={4} tablet={4} desktop={4}>
          <span>{storyArr[5]}</span>
        </Column>
      </Row>
    </Container>
  );
}
