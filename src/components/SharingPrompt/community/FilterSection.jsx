import React, {useEffect, useState} from "react";
import styles from "./FilterSection.module.css";
import {ReactComponent as WriteIcon} from "../../../assets/images/writeIcon.svg";
import SelectPromptModal from "../modal/SelectModal/SelectPromptModal";
import SortButton from "../components/FilterComponents/SortButton";
import CategoryButton from "../components/FilterComponents/CategoryButton";
import {useModalStack} from "../../../hooks/useModalStack";
import {useCommunityHooks} from "../../../api/community/community";
import {communityPromptListPageState, stateChange} from "../../../recoil/community/communityRecoilState";
import {useRecoilValue} from "recoil";

function FilterSection() {
    const [selectCategory, setSelectCategory] = useState("전체"); // 단일 선택
    const [sortOrder, setSortOrder] = useState("latest");
    const [searchQuery, setSearchQuery] = useState("");
    const modalStack = useModalStack();
    const isStateChange = useRecoilValue(stateChange);
    const {currentPage} = useRecoilValue(communityPromptListPageState) ?? {currentPage: 0};
    const {getCommunityPromptList, getMakePromptList} = useCommunityHooks();

    const handleListModal = () => {
        getMakePromptList();
        modalStack.push({
            key: 'promptListModal',
            Component: SelectPromptModal,
            componentProps: {},
            backdropTransparent: true,
        });
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // 엔터 키 기본 동작(폼 제출 등) 방지
            let categoryParam = selectCategory === "전체" ? null : selectCategory;

            getCommunityPromptList(categoryParam, sortOrder, searchQuery, currentPage);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let categoryParam = selectCategory === "전체" ? null : selectCategory;

            getCommunityPromptList(categoryParam, sortOrder, searchQuery, currentPage);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectCategory, sortOrder, searchQuery, isStateChange]);

    console.log({
        params: {
            category: selectCategory === "전체" ? "" : selectCategory,
            sort: sortOrder,
        },
    });

    return(
        <div>
            <div className={styles.searchBarSection}>
                <input className={styles.searchBar} type="text"
                       placeholder={"검색"}
                       value={searchQuery}
                       onChange={handleSearchInputChange}
                       onKeyDown={handleSearchKeyDown}
                />
            </div>
            <CategoryButton setSelectCategory={setSelectCategory}/>
            <div className={styles.buttonSection}>
                <SortButton setSortOrder={setSortOrder}/>
                <div>
                    <button className={styles.writeButton} onClick={handleListModal}>
                        <WriteIcon/>
                        작성하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FilterSection;