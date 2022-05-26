import { useState } from "react";
import styled from "styled-components";
import MathWriter from "./MathWriter";
import Latex from "./Latex";
const InputHolder = styled.div`
  margin: 10px 0;
`;
const InputMain = styled.input`
  height: auto;
  width: 100%;
  padding: 15px;
  border: none;
  background: #eee;
  font-size: 15px;
`;
const Button = styled.button`
  height: auto;
  width: 100px;
  margin-left: 10px;
  border: none;
  background: #eee;
  cursor: pointer;
  padding: 5px;
`;
const InputContainer = styled.div`
  display: flex;
`;
const Value = styled.h5`
  margin: 10px;
`;

export default function Input({
  getValue,
  showValue = true,
  canDraw = true,
  placeholder = "Enter a question",
  inputVal,
  setInputValue,
  ...rest
}) {
  const [showMathWriter, setShowMathWriter] = useState(false);
  return (
    <Latex>
      <InputHolder>
        {!showMathWriter && (
          <InputContainer>
            <InputMain placeholder={placeholder} {...rest} />
            {canDraw && (
              <Button onClick={() => setShowMathWriter(!showMathWriter)}>
                Draw
              </Button>
            )}
          </InputContainer>
        )}
        {showMathWriter && (
          <MathWriter
            getLatex={(latex) => null}
            show={showMathWriter}
            onClose={(latex) => {
              setShowMathWriter(false);
              if (latex) {
                const val = inputVal + " $" + latex + "$ ";
                setInputValue(val);
              }
            }}
          />
        )}
        {showValue && <Value>{inputVal}</Value>}
      </InputHolder>
    </Latex>
  );
}
