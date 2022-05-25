import { useState, useRef } from "react";
import styled from "styled-components";
import Latex from "./Latex";
import Input from "./Input";
import {data} from "../data";

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
  padding: 80px 20px;
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
  color: #23BBDC;
  align-items: center;
`;
const NextButton = styled.button`
  height: auto;
  width: auto;
  padding: 10px 15px;
  background: #23BBDC;
  color: white;
  border: none;
  border-radius: 5px;
`
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
  background-position: right 20px center, right bottom, right bottom, right bottom; 
  width: 100%;
  background: #23BBDC;
  color: #fff;
  font-size: 15px;
`;
const Option = styled.option`
  height: 45px;
`;
const InfoContainer = styled.div`
  color: #23BBDC;
`;

export default function AddScreen({getQuestion}) {
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
  const [correctIndex, setCorrectIndex] = useState(null);
  const [mainData, setMainData] = useState(null);
  const subjects = ["Math 1st Paper", "Math 2nd Paper", "Physics 1st Paper", "Physics 2nd Paper", "Chemistry 1st Paper", "Chemistry 2nd Paper", "Biology 1st Paper", "Biology 2nd Paper"];
  // handling actions
  const handleQuestionSubmit = () => {
    const genQuestionData = {
      text: question,
      options: [optionOne, optionTwo, optionThree, optionFour],
      correctIndex: correctIndex,
      subject: subject,
      chapter: chapter
    };
    console.log(genQuestionData);
    setMainData(genQuestionData);
    alert(JSON.stringify(genQuestionData))
  }
  // content vars
  const addQuestionContent = (
    <>
          <Title>
          <h4>Enter a question</h4>
          <NextButton onClick={() => {
            setShowAddQuestion(false);
            setShowAddChapter(true);
          }}>Back</NextButton>
          <NextButton onClick={handleQuestionSubmit}>Submit</NextButton>
          </Title>
          <InfoContainer>
            <h4>Subject: {subject && subject}</h4>
            <h4>Chapter: {chapter && chapter}</h4>
          </InfoContainer>
          <Input getValue={(val) => {
            setQuestion(val);
          }} />
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
              <h4>Correct index</h4>
              <Input showValue={false} getValue={(val) => setCorrectIndex(Number(val) - 1)} canDraw={false} placeholder="Enter index i.e. 1,2,3.." type="number" />
              <h5>{mainData && JSON.stringify(mainData)}</h5>
            </>
          )}
    </>
  );
  const addSubjectContent = (
      <Add callback={() => {
        setShowAddSubject(false);
        setShowAddChapter(true);
      }} options={subjects}
        title="Choose a subject"
        onNext={val => setSubject(val)} 
        />
  );
  const addChapterContent = (
    <Add callback={() => {
      setShowAddChapter(false);
      setShowAddQuestion(true);
    }} options={data[subject].chapters} 
    title="Choose a chapter" 
    onNext={val => setChapter(val)} 
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
          {showAddQuestion && addQuestionContent}
          {showAddSubject && addSubjectContent}
          {showAddChapter && addChapterContent}
        </Container>
      </AddScreenContainer>
    </Latex>
  );
}

const Add = ({onNext, callback, options, title, buttonText = "Next", backBtnExists, onBack}) => {
  const [val, setVal] = useState(options && options[0].toLowerCase().split(" ").join("_"));
  return (
    <form onKeyDown={e => {
      if (e.keyCode === 13) {
        onNext(val);
        callback();
      }
    }}
    onSubmit={(e) => {
      e.preventDefault();
      console.log(val);
      onNext(val);
      callback();
    }}
    >
      <Title>
        <h4>{title}</h4>
        {backBtnExists && <NextButton type="button" onClick={onBack}>Back</NextButton>}
        <NextButton type="submit">{buttonText}</NextButton>
      </Title>
      <SubjectContainer>
          <Select onChange={e => setVal(e.target.value.split(" ").join("_"))}>
            {options && options.map((sub, i) => <Option key={i} value={sub.toLowerCase()}>{sub}</Option>)}
          </Select>
      </SubjectContainer>
    </form>
  );
}