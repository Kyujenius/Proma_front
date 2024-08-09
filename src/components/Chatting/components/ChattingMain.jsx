import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { H1 } from "../../../styles/font-styles";
import styles from "./ChattingMain.module.css";
import PromptCreateButton from "./Prompt/PromptCreateButton";
import characterIcon from "../../../assets/images/characterIcon.svg";
import taskIcon from "../../../assets/images/taskIcon.svg";
import freeIcon from "../../../assets/images/freeIcon.svg";
import { promptMethodState } from "../../../recoil/prompt/promptRecoilState";
import { useSetRecoilState } from "recoil";
import { useChattingRoomHooks } from "../../../api/chatting/chatting";
import { setLocalPromptMethod } from "../../../util/localStorage";

function ChattingMain() {
    const navigate = useNavigate();
    const setPromptMethod = useSetRecoilState(promptMethodState);
    const { getChattingRoomList } = useChattingRoomHooks();
    const userName = localStorage.getItem("userName");
    const handlePromptCreateClick = (type) => {
        setPromptMethod(type);
        setLocalPromptMethod(type);
        navigate(`/promptMaking/`);
    };

    useEffect(() => {
        getChattingRoomList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={styles.container}>
            {userName ? (
                <H1 color="purpleGradient">{userName}님의 프롬프트 만들기</H1>
            ) : (
                <H1 color="purpleGradient">나만의 프롬프트 만들기</H1>
            )}
            <div className={styles.typeContainer}>
                <PromptCreateButton
                    type="Character"
                    icon={characterIcon}
                    onClick={() => handlePromptCreateClick("Character")}
                />
                <PromptCreateButton
                    type="Task/Research"
                    icon={taskIcon}
                    onClick={() => handlePromptCreateClick("Task/Research")}
                />
                <PromptCreateButton
                    type="Free"
                    icon={freeIcon}
                    onClick={() => handlePromptCreateClick("Free")}
                />
            </div>
        </div>
    );
}
export default ChattingMain;
