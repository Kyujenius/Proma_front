import React, { useState } from "react";
import styles from "./CreatePromptModal.module.css";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import PromptMethodButton from "../PromptMethodButton";
import characterIcon from "../../../../../assets/images/characterIcon.svg";
import taskIcon from "../../../../../assets/images/taskIcon.svg";
import freeIcon from "../../../../../assets/images/freeIcon.svg";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { promptMethodState } from "../../../../../recoil/prompt/promptRecoilState";
import { H5 } from "../../../../../styles/font-styles";

function CreatePromptModal({isOpen, onClose}) {
  const navigate = useNavigate();
  const setPromptMethod = useSetRecoilState(promptMethodState);
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!isOpen) return null;

  const handleCreateClick = () => {
    if (selectedMethod) {
      setPromptMethod(selectedMethod);
      navigate(`/promptMaking/`);
      onClose();
    }
  };

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
  }

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="새 프롬프트 추가하기" onSubmit={handleCreateClick}>
      <div className={styles.container}>
      <H5>프롬프트의 타입을 선택하세요</H5>
      <div className={styles.typeContainer}>
        <PromptMethodButton
          type="Character"
          icon={characterIcon}
          isSelected={selectedMethod === "Character"}
          onClick={() => handleMethodClick("Character")}
        />
        <PromptMethodButton
          type="Task/Research"
          icon={taskIcon}
          isSelected={selectedMethod === "Task/Research"}
          onClick={() => handleMethodClick("Task/Research")}
        />
        <PromptMethodButton
          type="Free"
          icon={freeIcon}
          isSelected={selectedMethod === "Free"}
          onClick={() => handleMethodClick("Free")}
        />
      </div>
      </div>
      <ModalButton title="선택 완료" variant="primary" size="medium" onClick={handleCreateClick}/>
    </ModalContainer>
  );
}

export default CreatePromptModal;