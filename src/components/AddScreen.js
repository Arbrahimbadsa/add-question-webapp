import { useState } from "react";
import styled from "styled-components";
import Latex from "./Latex";
import Input from "./Input";

const AddScreenContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: #eee;
`;
const Container = styled.div`
  background: #fff;
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
// const Input = styled.input`
//   height: 30px;
//   width: 200px;
//   margin: 10px 0;
// `;

export default function AddScreen() {
  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");
  return (
    <Latex>
      <AddScreenContainer>
        <Container>
          <h4>Enter a question</h4>
          <Input getValue={(val) => setQuestion(val)} />
          {question && (
            <>
              <h4>Option one</h4>
              <Input getValue={(val) => setOptionOne(val)} />
              <h4>Option two</h4>
              <Input getValue={(val) => setOptionTwo(val)} />
              <h4>Option three</h4>
              <Input getValue={(val) => setOptionThree(val)} />
              <h4>Option four</h4>
              <Input getValue={(val) => setOptionFour(val)} />
            </>
          )}
        </Container>
      </AddScreenContainer>
    </Latex>
  );
}
