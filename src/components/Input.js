import { useEffect, useState } from "react";
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

export default function Input({ getValue, showValue = true }) {
  const [value, setValue] = useState("");
  const [showMathWriter, setShowMathWriter] = useState(false);
  useEffect(() => {
    if (value) getValue(value);
  }, [value, getValue]);
  return (
    <Latex>
      <InputHolder>
        {!showMathWriter && (
          <InputContainer>
            <InputMain
              placeholder="Enter the question"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button onClick={() => setShowMathWriter(!showMathWriter)}>
              Draw
            </Button>
          </InputContainer>
        )}
        {showMathWriter && (
          <MathWriter
            getLatex={(latex) => null}
            show={showMathWriter}
            onClose={(latex) => {
              setShowMathWriter(false);
              if (latex) {
                const val = value + " $" + latex + "$ ";
                setValue(val);
              }
            }}
          />
        )}
        {showValue && <Value>{value}</Value>}
      </InputHolder>
    </Latex>
  );
}
