import React from "react";
import styles from "./DeletePromptModal.module.css";
import ModalContainer from "../../../../common/ModalContainer";
import ModalButton from "../../../../common/ModalButton";
import { H5, B5 } from "../../../../../styles/font-styles";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { promptListState } from "../../../../../recoil/prompt/promptRecoilState";
import { useChattingRoomHooks } from "../../../../../api/chatting/chatting";
import PromptDetail from "../../../../common/Prompt/PromptDetail";
import {t} from "i18next";

function DeletePromptModal({ isOpen, onClose, promptId }) {
    const promptList = useRecoilValue(promptListState);
    const setPromptList = useSetRecoilState(promptListState);
    const prompt = promptList.find((p) => p.promptId === promptId);

    const { promptTitle, promptDescription, promptCategory, listPromptAtom } =
        prompt;

    const { deletePrompt } = useChattingRoomHooks();

    if (!isOpen) return null;

    const handleDeleteClick = () => {
        deletePrompt(promptId);
        setPromptList((oldPromptList) => {
            return oldPromptList.filter(
                (prompt) => prompt.promptId !== promptId,
            );
        });
        onClose();
    };

    return (
        <ModalContainer
            isOpen={isOpen}
            onClose={onClose}
            title={t(`sideBar.deletePrompt`)}
            onSubmit={handleDeleteClick}
        >
            <div className={styles.contentContainer}>
                <PromptDetail listPromptAtom={listPromptAtom} />
                <H5>{t(`promptMaking.promptTitle`)}</H5>
                <B5>{promptTitle}</B5>
                <H5>{t(`promptMaking.promptCategory`)}</H5>
                <B5>{promptCategory}</B5>
                <H5>{t(`promptMaking.promptDescription`)}</H5>
                <B5>{promptDescription}</B5>
            </div>
            <ModalButton title={t(`sideBar.delete`)} variant="primary" type="submit" />
        </ModalContainer>
    );
}

export default DeletePromptModal;
