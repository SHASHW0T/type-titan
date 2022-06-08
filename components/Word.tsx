import { Ref, useState } from "react";
import styles from "../styles/Word.module.css";
import Letter from "./Letter";

type Props = {
  word: string;
  typedWord: string;
  wordRef: Ref<HTMLDivElement>;
  activeLetterIndex: number;
  status: string;
};

const Word = ({
  word,
  typedWord = "",
  wordRef,
  activeLetterIndex,
  status,
}: Props) => {
  let ref = null;
  const componentList = word.split("").map((char, i) => {
    let letterStatus = "passive";

    if (status === "active") {
      ref = wordRef;
      if (activeLetterIndex === i) letterStatus = "active";
    }
    if (typedWord.charAt(i) != "") {
      if (typedWord.charAt(i) === char) letterStatus = "correct";
      else letterStatus = "incorrect";
    }

    return <Letter char={char} status={letterStatus} key={i} />;
  });

  const suffix =
    typedWord.length > word.length ? typedWord.slice(word.length - 1, -1) : "";

  return (
    <div className={`${styles.word} ${styles[status]}`} ref={ref}>
      {componentList}
      {suffix.split("").map((char, i) => (
        <Letter char={char} status="incorrect" key={i} />
      ))}
    </div>
  );
};

export default Word;
