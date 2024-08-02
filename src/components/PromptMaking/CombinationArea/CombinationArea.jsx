import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styles from "./CombinationArea.module.css";
import PromptCategoryBlock from "../components/PromptCategoryBlock";
import PromptValueBlock from "../components/PromptValueBlock";
import { H2, H5 } from "../../../styles/font-styles";
import saveButtonIcon from "../../../assets/images/saveButtonIcon.svg";
import FinalPromptArea from "../FinalPromptArea/FinalPromptArea";
import {
  combinationsState,
  activeTypeState,
  categoryColorsState,
  refinedPromptPartsState,
  blockDetailsState,
  availableCategoriesState,
  categoryBlockShapesState
} from "../../../recoil/prompt/promptRecoilState";
import SavePromptModal from "./SavePromptModal";

const CombinationArea = () => {
  const combinations = useRecoilValue(combinationsState);
  const activeType = useRecoilValue(activeTypeState);
  const categoryColors = useRecoilValue(categoryColorsState);
  const categoryBlockShapes = useRecoilValue(categoryBlockShapesState);
  const refinedPromptParts = useRecoilValue(refinedPromptPartsState);
  const blockDetails = useRecoilValue(blockDetailsState);
  const categories = useRecoilValue(availableCategoriesState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <H5 color="gray5" >{activeType} PROMA</H5>
        <button onClick={openModal} className={styles.saveButton}>
          <img src={saveButtonIcon} className={styles.saveIcon} alt="save" />
        </button>
      </div>
      <div className={styles.combinationArea}>
        <H2 color="gray4" className={styles.dropYourBlocks}>
          이 곳에 블록을 끌어넣어보아요!
          <hr style={{ visibility: "hidden"}}/> 
          Drop your blocks!
        </H2>
        <div className={styles.categoryList}>
        {categories.map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${styles.categoryItem} ${
                  snapshot.isDraggingOver ? styles.draggingOver : ""
                }`}
                style={{
                  ...(snapshot.isDraggingOver && {
                    backgroundColor: "var(--color-gray3)",
                    border: `2px dashed ${categoryColors[category]}`,
                  }),
                }}
              >
                <PromptCategoryBlock 
                  category={category} 
                  color={categoryColors[category]} 
                  variant={categoryBlockShapes[category]}
                />
                <div className={styles.categoryValue}>
                  {combinations[category] ? (
                    <Draggable
                      draggableId={`${combinations[category]}|${category}`}
                      index={0}
                    >
                      {(provided, snapshot) => {
                        const block = blockDetails[combinations[category]];
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <PromptValueBlock 
                              color={categoryColors[category]} 
                              value={block.blockTitle} 
                              variant={categoryBlockShapes[category]} 
                              size="large" 
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  ) : (
                    <></>
                  )}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
        <FinalPromptArea />
      </div>
      <SavePromptModal
        isOpen={isModalOpen}
        onClose={closeModal}
        combinations={combinations}
        refinedPromptParts={refinedPromptParts}
      />
    </div>
    </div>
  );
};

export default CombinationArea;
