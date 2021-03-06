import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MathWriter from "./MathWriter";
import Latex from "./Latex";
import { PenTool, Image, X } from "react-feather";
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
  max-height: 50px;
  max-width: 50px;
  margin-left: 10px;
  border: none;
  background: #23bbdc;
  cursor: pointer;
  padding: 10px 15px;
  position: relative;
`;
const InputContainer = styled.div`
  display: flex;
`;
const Value = styled.h5`
  margin: 10px;
`;
const ImageInput = styled.input`
  &::-webkit-file-upload-button {
    visibility: hidden;
  }
  color: rgba(0, 0, 0, 0);
  position: absolute;
  max-width: 50px;
  height: 50px;
  top: 0;
  left: 0;
`;
const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const PreveiwImage = styled.div`
  background-image: url(${(props) => props.src});
  position: relative;
  background-size: cover;
  ${(props) =>
    props.src
      ? `
  height: 200px;
  width: 200px;
  `
      : `
  height: 0;
  width: 0;
  `}
`;
const DeleteHolder = styled.div`
  position: absolute;
  top: calc(-35px / 4);
  right: calc(-35px / 4);
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background: #23bbdc;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default function Input({
  getValue,
  showValue = true,
  canDraw = true,
  placeholder = "Enter a question",
  inputVal,
  setInputValue,
  doFocus = false,
  getImage,
  showImagePreview = true,
  ...rest
}) {
  const [showMathWriter, setShowMathWriter] = useState(false);
  const inputRef = useRef();
  const [image, setImage] = useState(null);
  const [previewUrl, setPerviewUrl] = useState(null);
  const clearImage = () => {
    setPerviewUrl("");
    setImage(null);
  };
  useEffect(() => {
    if (inputRef && doFocus && !showMathWriter) {
      inputRef.current?.focus();
    }
  }, [doFocus, showMathWriter]);
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    if (image) {
      getImage(image);
    }
  }, [getImage, image]);
  useEffect(() => {
    if (image) {
      const objUrl = URL.createObjectURL(image);
      setPerviewUrl(objUrl);
    }
  }, [image]);
  return (
    <Latex>
      <InputHolder>
        <InputContainer>
          <InputMain ref={inputRef} placeholder={placeholder} {...rest} />
          {canDraw && (
            <Button onClick={() => setShowMathWriter(!showMathWriter)}>
              <PenTool size={20} color="white" />
            </Button>
          )}
          {showImagePreview && (
            <Button>
              <ImageInput
                accept="image/*"
                onChange={handleImageUpload}
                type="file"
                capture="environment"
              />
              <Image color="white" size={20} />
            </Button>
          )}
        </InputContainer>
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
        {previewUrl && (
          <PreviewContainer>
            <PreveiwImage src={previewUrl}>
              <DeleteHolder onClick={clearImage}>
                <X color="white" size={18} />
              </DeleteHolder>
            </PreveiwImage>
          </PreviewContainer>
        )}
        {showValue && <Value>{inputVal}</Value>}
      </InputHolder>
    </Latex>
  );
}
