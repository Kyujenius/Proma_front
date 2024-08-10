import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SavePromptModal.module.css";
import { H5, B5, B3 } from "../../../styles/font-styles";
import ModalButton from "../../common/ModalButton";
import {
    promptMethodState,
    promptListState,
    blockDetailsState,
} from "../../../recoil/prompt/promptRecoilState";
import { useRecoilValue } from "recoil";
import RefinedPromptText from "../FinalPromptArea/RefinedPromptText";
import { usePromptHook } from "../../../api/prompt/prompt";
import { useChattingRoomHooks } from "../../../api/chatting/chatting";
import ModalContainer from "../../common/ModalContainer";
import { t } from "i18next";

const allCategories = ["IT", "게임", "글쓰기", "건강", "교육", "예술", "기타"];

const SavePromptModal = ({
    isOpen,
    onClose,
    combinations,
    refinedPromptParts,
    promptId,
}) => {
    const navigate = useNavigate();
    const promptList = useRecoilValue(promptListState);
    const blockDetails = useRecoilValue(blockDetailsState);
    const prompt = promptList.find((p) => p.promptId === promptId);
    const [promptTitle, setPromptTitle] = useState("");
    const [promptDescription, setPromptDescription] = useState("");
    const [promptCategory, setPromptCategory] = useState("IT");
    const promptMethod = useRecoilValue(promptMethodState);

    const { savePrompt } = usePromptHook();
    const { fetchPromptList, patchPromptBlock, patchPromptInfo } =
        useChattingRoomHooks();

    useEffect(() => {
        if (prompt) {
            setPromptTitle(prompt.promptTitle || "");
            setPromptDescription(prompt.promptDescription || "");
            setPromptCategory(prompt.promptCategory || "IT");
        } else {
            // Reset state if no prompt is found
            setPromptTitle("");
            setPromptDescription("");
            setPromptCategory("IT");
        }
    }, [prompt]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (prompt) {
            const listPromptAtom = Object.entries(combinations)
                .filter(([category, blockId]) => blockId)
                .map(([category, blockId]) => ({
                    blockId: Number(blockId),
                    blockCategory: category,
                    blockValue: blockDetails[blockId].blockValue,
                }));
            console.log("listPromptAtom:", listPromptAtom);
            patchPromptBlock(promptId, listPromptAtom);
            patchPromptInfo(
                promptId,
                promptTitle,
                promptDescription,
                promptCategory,
            );
        } else {
            const promptPreview = Object.values(refinedPromptParts).join(" ");
            const listPromptAtom = Object.values(combinations)
                .filter(Boolean)
                .map((value, index) => ({ blockId: value }));

            savePrompt(
                promptTitle,
                promptDescription,
                promptPreview,
                promptCategory,
                promptMethod,
                listPromptAtom,
            );

            console.log({
                promptTitle,
                promptDescription,
                promptPreview,
                promptCategory,
                promptMethod,
                listPromptAtom,
            });
            // 여기서 일반적으로 이 데이터를 백엔드로 보내거나 상태 관리 시스템에 저장합니다
        }
        navigate("/");
        fetchPromptList();
        onClose();
    };

    let title = "";
    if (prompt) {
        title = t(`promptMaking.promptPatch`);
    } else {
        title = t(`promptMaking.promptSave`);
    }

    return (
        <ModalContainer
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            onSubmit={handleSave}
            children
        >
            <div>
                <RefinedPromptText />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="promptTitle">
                    <H5>{t(`promptMaking.promptTitle`)}</H5>
                </label>
                <input
                    placeholder={t(`promptMaking.promptTitle`)}
                    value={promptTitle}
                    onChange={(e) => setPromptTitle(e.target.value)}
                    disabled={!!promptId} // promptId가 존재할 경우 비활성화
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="promptDescription">
                    <H5>{t(`promptMaking.promptDescription`)}</H5>
                </label>
                <input
                    placeholder={t(`promptMaking.promptDescription`)}
                    value={promptDescription}
                    onChange={(e) => setPromptDescription(e.target.value)}
                    disabled={!!promptId} // promptId가 존재할 경우 비활성화
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="category">
                    <H5>{t(`promptMaking.promptCategory`)}</H5>
                </label>
                <div className={styles.select}>
                    <ul className={styles.options}>
                        {allCategories.map((category) => (
                            <li
                                key={category}
                                onClick={(e) =>
                                    !promptId && setPromptCategory(category)
                                } // promptId가 없을 때만 변경 가능
                                className={`${styles.option} ${
                                    category === promptCategory
                                        ? styles.active
                                        : styles.none
                                }`}
                            >
                                <B5
                                    color={
                                        category === promptCategory
                                            ? "white"
                                            : "gray5"
                                    }
                                >
                                    {category}
                                </B5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.formGroup}>
                <label>
                    <H5>{t(`promptMaking.promptType`)}</H5>
                </label>
                <B3 color="black">{promptMethod} type</B3>
            </div>
            <ModalButton title="저장하기" variant="primary" type="submit" />
        </ModalContainer>
    );
};

export default SavePromptModal;
