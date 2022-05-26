import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MathWriter from "./MathWriter";
import Latex from "./Latex";
import { PenTool } from "react-feather";
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
  &:focus {
    outline-color: #23bbdc;
  }
`;
const Button = styled.button`
  height: auto;
  width: auto;
  margin-left: 10px;
  border: none;
  background: #23bbdc;
  cursor: pointer;
  padding: 10px 15px;
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
  doFocus = false,
  ...rest
}) {
  const [showMathWriter, setShowMathWriter] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef && doFocus) {
      inputRef.current.focus();
    }
  }, [doFocus]);
  return (
    <Latex>
      <InputHolder>
        {!showMathWriter && (
          <InputContainer>
            <InputMain ref={inputRef} placeholder={placeholder} {...rest} />
            {canDraw && (
              <Button onClick={() => setShowMathWriter(!showMathWriter)}>
                <PenTool size={20} color="white" />
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
