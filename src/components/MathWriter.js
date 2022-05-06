import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  ArrowLeft,
  ArrowRight,
  Copy,
  CornerUpLeft,
  CornerUpRight,
  Trash2,
  X,
} from "react-feather";
import * as iink from "iink-js";
import * as katex from "katex";
import "katex/dist/katex.min.css";
const MathWriterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;
`;
const Output = styled.div`
  height: auto;
  min-height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
`;
const OutputText = styled.div``;
const ControlContainer = styled.div`
  height: auto;
  width: 100%;
  padding: 20px 20px;
  display: flex;
  justify-content: center;
`;
const IconContainer = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: black;
  margin-right: 10px;
  padding: 8px;
  cursor: pointer;
  border-radius: 8px;
`;

const EditorContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const Editor = styled.div`
  height: 100%;
  width: 8000px;
  touch-action: none;
`;

const cleanLatex = (latexExport) => {
  if (latexExport.includes("\\\\")) {
    const steps = "\\begin{align*}" + latexExport + "\\end{align*}";
    return steps
      .replace("\\begin{aligned}", "")
      .replace("\\end{aligned}", "")
      .replace(new RegExp("(align.{1})", "g"), "aligned");
  }
  return latexExport.replace(new RegExp("(align.{1})", "g"), "aligned");
};

export default function MathWriter({ getLatex, onClose, show }) {
  const outputText = useRef(null);
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
  const [canDelete, setCanDelete] = useState(false);
  const [editor, setEditor] = useState(null);
  const [latex, setLatex] = useState("");
  useEffect(() => {
    if (latex) {
      katex.render(cleanLatex(latex), outputText.current, {
        displayMode: true,
      });
      getLatex(latex);
    } else {
      outputText.current.innerText = "";
    }
  }, [latex, getLatex]);
  useEffect(() => {
    editorRef.current.addEventListener("exported", (evt) => {
      const exports = evt.detail.exports;
      if (exports && exports["application/x-latex"]) {
        setLatex(cleanLatex(exports["application/x-latex"]));
      }
    });
    editorRef.current.addEventListener("changed", (evt) => {
      setCanDelete(evt.detail.canClear);
    });
    const edtr = iink.register(editorRef.current, {
      recognitionParams: {
        type: "MATH",
        protocol: "WEBSOCKET",
        apiVersion: "V4",
        server: {
          scheme: "https",
          host: "webdemoapi.myscript.com",
          applicationKey: "1463c06b-251c-47b8-ad0b-ba05b9a3bd01",
          hmacKey: "60ca101a-5e6d-4159-abc5-2efcbecce059",
        },
        iink: {
          math: {
            mimeTypes: ["application/x-latex", "application/vnd.myscript.jiix"],
            solver: {
              enable: false,
            },
          },
          export: {
            jiix: {
              strokes: true,
            },
          },
        },
      },
    });
    setEditor(edtr);
  }, []);
  return (
    <MathWriterContainer>
      <Output>
        <OutputText ref={outputText}></OutputText>
      </Output>
      <ControlContainer>
        <IconContainer onClick={() => editor.undo()}>
          <CornerUpLeft size={20} color={"#fff"} />
        </IconContainer>
        <IconContainer onClick={() => editor.redo()}>
          <CornerUpRight size={20} color={"#fff"} />
        </IconContainer>
        <IconContainer
          onClick={() => {
            if (canDelete) {
              editor.clear();
              setLatex(null);
            }
            editorContainerRef.current.scrollLeft = 0;
          }}
        >
          <Trash2 size={20} color={"#fff"} />
        </IconContainer>
        {/* <IconContainer onClick={() => canConvert && editor.convert()}>
          <ArrowUpRight size={20} color={"#fff"} />
        </IconContainer> */}
        <IconContainer
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(latex);
            } else {
              const input = document.createElement("textarea");
              input.innerText = latex;
              document.body.appendChild(input);
              input.select();
              document.execCommand("copy");
              input.remove();
            }
          }}
        >
          <Copy size={20} color={"#fff"} />
        </IconContainer>
        <IconContainer
          onClick={() => {
            editorContainerRef.current.scrollLeft -= 20;
          }}
        >
          <ArrowLeft size={20} color={"#fff"} />
        </IconContainer>
        <IconContainer
          onClick={() => {
            editorContainerRef.current.scrollLeft += 20;
          }}
        >
          <ArrowRight size={20} color={"#fff"} />
        </IconContainer>
        <IconContainer
          onClick={() => {
            onClose(latex);
          }}
        >
          <X size={20} color={"#fff"} />
        </IconContainer>
      </ControlContainer>
      <EditorContainer ref={editorContainerRef}>
        <Editor ref={editorRef} />
      </EditorContainer>
    </MathWriterContainer>
  );
}
