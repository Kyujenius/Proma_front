import React, { useState } from "react";
import styles from "./ExpandableButton.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { myPageState } from "../../../recoil/community/myPageRecoilState";
import { communityPromptListPageState } from "../../../recoil/community/communityRecoilState";

function ExpandableButton({ buttonText }) {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [, setIsMyPageState] = useRecoilState(myPageState);
    const [, setCurrentPage] = useRecoilState(communityPromptListPageState);
    const userName = localStorage.getItem("userName");
    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const handleMouseLeaveExpanding = () => {
        setIsExpanded(false);
    };

    const handleClick = (type) => {
        setIsMyPageState(type);
        setCurrentPage(0);
    };
    const handleLogout = () => {
        localStorage.clear("accessToken");
        localStorage.clear("refreshToken");
        localStorage.clear("userName");
        navigate("/login");
    };
    const handleLogin = () => {
        navigate("/login");
    };
    return (
        <>
            <div
                className={styles.container}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.button}>{buttonText}</div>
                <div
                    onMouseLeave={handleMouseLeaveExpanding}
                    className={`${styles.expandableSection} ${isExpanded ? styles.expanded : ""}`}
                >
                    <Link to={`/mypage`} onClick={() => handleClick("like")}>
                        좋아요
                    </Link>
                    <Link to={`/mypage`} onClick={() => handleClick("write")}>
                        작성한글
                    </Link>
                    {userName ? (
                        <p onClick={handleLogout} style={{ color: "red" }}>
                            로그아웃
                        </p>
                    ) : (
                        <p onClick={handleLogin} style={{ color: "blue" }}>
                            로그인
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ExpandableButton;
