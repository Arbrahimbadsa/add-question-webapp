import { useEffect } from "react";
import styled from "styled-components";
import * as katex from "katex";
import "katex/dist/katex.min.css";

const TextContainer = styled.div`
  height: auto;
  width: auto;
`;

export default function Renderer({ rawText }) {
  useEffect(() => {
    const latexes = [];
    const arr = rawText.split("$");
    for (let i = 1; i < arr.length; ++i) {
      const item = arr[i].split("#");
      const main = item[0];
      latexes.push(main);
    }
    latexes.forEach((latex) => {
      const elem = <div></div>;
    });
  }, []);
  const texts = <></>;
  return <TextContainer>{texts}</TextContainer>;
}
