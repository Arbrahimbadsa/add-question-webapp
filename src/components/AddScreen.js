import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Latex from "./Latex";
import Input from "./Input";
import { data } from "../data";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
const AddScreenContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;
const Container = styled.div`
  background: #fff;
  width: 60%;
  height: 100%;
  margin: 0 auto;
  padding: 20px 20px 80px 20px;
  overflow: scroll;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const SubjectContainer = styled.div`
  margin: 10px 0;
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  color: #23bbdc;
  align-items: center;
`;
const NextButton = styled.button`
  height: auto;
  width: auto;
  padding: 10px 15px;
  background: #23bbdc;
  color: white;
  border: none;
  border-radius: 5px;
`;
const Select = styled.select`
  font: 400 12px/1.3 sans-serif;
  -webkit-appearance: none;
  appearance: none;
  color: var(--baseFg);
  border: 1px solid var(--baseFg);
  line-height: 1;
  outline: 0;
  padding: 0.65em 2.5em 0.55em 0.75em;
  border-radius: var(--radius);
  background-color: var(--baseBg);
  background-image: linear-gradient(var(--baseFg), var(--baseFg)),
    linear-gradient(-135deg, transparent 50%, var(--accentBg) 50%),
    linear-gradient(-225deg, transparent 50%, var(--accentBg) 50%),
    linear-gradient(var(--accentBg) 42%, var(--accentFg) 42%);
  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
  background-size: 1px 100%, 20px 22px, 20px 22px, 20px 100%;
  background-position: right 20px center, right bottom, right bottom,
    right bottom;
  width: 100%;
  background: #23bbdc;
  color: #fff;
  font-size: 15px;
`;
const Option = styled.option`
  height: 45px;
`;
const InfoContainer = styled.div`
  color: #23bbdc;
  margin: 20px 0;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
`;
const Header = styled.div``;
const SiteTitle = styled.h2`
  border-bottom: 5px solid #23bbdc;
  margin-bottom: 30px;
  padding-bottom: 5px;
`;

export default function AddScreen({ getQuestion }) {
  const [question, setQuestion] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [optionFour, setOptionFour] = useState("");
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showAddSubject, setShowAddSubject] = useState(true);
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [subject, setSubject] = useState("math_1st_paper");
  const [chapter, setChapter] = useState("");
  const [correctIndex, setCorrectIndex] = useState("");
  const [mainData, setMainData] = useState(null);
  const [questionImage, setQuestionImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const subjects = [
    "Math 1st Paper",
    "Math 2nd Paper",
    "Physics 1st Paper",
    "Physics 2nd Paper",
    "Chemistry 1st Paper",
    "Chemistry 2nd Paper",
    "Biology 1st Paper",
    "Biology 2nd Paper",
  ];
  const saveImages = () => {
    const images = [questionImage, image1, image2, image3, image4];
    const storage = getStorage();
    images.forEach((img) => {
      if (img) {
        const imagesRef = storageRef(storage, "questionImages/" + img.name);
        // image data
        const blob = img;
        uploadBytes(imagesRef, blob)
          .then((snapshot) => {
            console.log("Images uploaded successfully.");
          })
          .catch((err) => console.log(err));
      }
    });
  };
  // handling actions
  const handleQuestionSubmit = () => {
    if (
      question &&
      optionOne &&
      optionTwo &&
      optionFour &&
      optionThree &&
      subject &&
      chapter &&
      correctIndex
    ) {
      const answerIndex = Number(correctIndex);
      if (answerIndex > 0 && answerIndex < 5) {
        const o1 = {
          text: optionOne,
          imageUrl: image1 ? image1.name : "",
        };
        const o2 = {
          text: optionTwo,
          imageUrl: image2 ? image2.name : "",
        };
        const o3 = {
          text: optionThree,
          imageUrl: image3 ? image3.name : "",
        };
        const o4 = {
          text: optionFour,
          imageUrl: image4 ? image4.name : "",
        };
        const genQuestionData = {
          text: question,
          imageUrl: questionImage ? questionImage.name : "",
          options: [o1, o2, o3, o4],
          correctIndex: answerIndex - 1,
          subject: subject,
          chapter: chapter,
        };
        const database = getDatabase();
        const id = uuidv4();
        set(ref(database, "/question" + id), genQuestionData);
        setMainData(genQuestionData);
        alert(JSON.stringify(genQuestionData));
        console.log(JSON.stringify(genQuestionData));
        // save images
        saveImages();
        handleClear();
      } else {
        alert("Incorrect index. Must be between 1 to 4.");
      }
    } else {
      alert("Enter all fields with valid values.");
    }
  };
  const handleClear = () => {
    setQuestion("");
    setOptionOne("");
    setOptionTwo("");
    setOptionThree("");
    setOptionFour("");
    setCorrectIndex(null);
    setMainData(null);
  };
  useEffect(() => {
    console.log(questionImage);
  }, [questionImage]);
  // content vars
  const addQuestionContent = (
    <>
      <Title>
        <h4>Submit Question</h4>
        <NextButton onClick={handleClear}>Clear</NextButton>
      </Title>
      <InfoContainer>
        <h4>Subject: {subject && data[subject].name.toUpperCase()}</h4>
        <h4>
          Chapter: {chapter && chapter.split("_").join(" ").toUpperCase()}
        </h4>
      </InfoContainer>
      <Input
        value={question}
        inputVal={question}
        setInputValue={setQuestion}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Write question or draw expression"
        getImage={(img) => setQuestionImage(img)}
      />
      {question && (
        <>
          <h4>1.</h4>
          <Input
            value={optionOne}
            placeholder="Enter option one"
            inputVal={optionOne}
            setInputValue={setOptionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            getImage={(img) => setImage1(img)}
          />
          <h4>2.</h4>
          <Input
            value={optionTwo}
            placeholder="Enter option two"
            inputVal={optionTwo}
            setInputValue={setOptionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            getImage={(img) => setImage2(img)}
          />
          <h4>3.</h4>
          <Input
            value={optionThree}
            placeholder="Enter option three"
            inputVal={optionThree}
            setInputValue={setOptionThree}
            onChange={(e) => setOptionThree(e.target.value)}
            getImage={(img) => setImage3(img)}
          />
          <h4>4.</h4>
          <Input
            value={optionFour}
            placeholder="Enter option four"
            inputVal={optionFour}
            setInputValue={setOptionFour}
            onChange={(e) => setOptionFour(e.target.value)}
            getImage={(img) => setImage4(img)}
          />
          <h4>Correct index</h4>
          <Input
            showValue={false}
            value={correctIndex}
            inputVal={correctIndex}
            setInputValue={setCorrectIndex}
            onChange={(e) => setCorrectIndex(e.target.value)}
            canDraw={false}
            placeholder="Enter index i.e. 1,2,3.."
            type="number"
            showImagePreview={false}
          />

          <h5>{mainData && JSON.stringify(mainData)}</h5>
        </>
      )}
      <ButtonContainer>
        <NextButton
          onClick={() => {
            setShowAddQuestion(false);
            setShowAddChapter(true);
          }}
        >
          Back
        </NextButton>
        <NextButton onClick={handleQuestionSubmit}>Submit</NextButton>
      </ButtonContainer>
    </>
  );
  const addSubjectContent = (
    <Add
      callback={() => {
        setShowAddSubject(false);
        setShowAddChapter(true);
      }}
      options={subjects}
      title="Choose a subject"
      onNext={(val) => setSubject(val)}
    />
  );
  const addChapterContent = (
    <Add
      callback={() => {
        setShowAddChapter(false);
        setShowAddQuestion(true);
      }}
      options={data[subject].chapters}
      title="Choose a chapter"
      onNext={(val) => setChapter(val)}
      backBtnExists
      onBack={() => {
        setShowAddChapter(false);
        setShowAddSubject(true);
      }}
    />
  );
  return (
    <Latex>
      <AddScreenContainer>
        <Container>
          <Header>
            <SiteTitle>Add Question V.1.5</SiteTitle>
          </Header>
          {showAddQuestion && addQuestionContent}
          {showAddSubject && addSubjectContent}
          {showAddChapter && addChapterContent}
        </Container>
      </AddScreenContainer>
    </Latex>
  );
}

const Add = ({
  onNext,
  callback,
  options,
  title,
  buttonText = "Next",
  backBtnExists,
  onBack,
}) => {
  const [val, setVal] = useState(
    options && options[0].toLowerCase().split(" ").join("_")
  );
  return (
    <form
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          onNext(val);
          callback();
        }
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onNext(val);
        callback();
      }}
    >
      <Title>
        <h4>{title}</h4>
        {backBtnExists && (
          <NextButton type="button" onClick={onBack}>
            Back
          </NextButton>
        )}
        <NextButton type="submit">{buttonText}</NextButton>
      </Title>
      <SubjectContainer>
        <Select onChange={(e) => setVal(e.target.value.split(" ").join("_"))}>
          {options &&
            options.map((sub, i) => (
              <Option key={i} value={sub.toLowerCase()}>
                {sub}
              </Option>
            ))}
        </Select>
      </SubjectContainer>
    </form>
  );
};
