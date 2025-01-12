import React, { useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import { getIsFirstVisited, setIsFirstVisited, setTourFinish } from "../util/localStorage";
import { t } from "i18next";

const PromptMakingTour = () => {
    const [runTour, setRunTour] = useState(true);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const tourSteps = [
            {
                target: '[data-tour="categories"]',
                content:
                    t(`tour.promptMakingTour.step1`),
                disableBeacon: true,
            },
            {
                target: '[data-tour="blocks"]',
                content: t(`tour.promptMakingTour.step2`),
            },
            {
                target: '[data-tour="combinationArea"]',
                content: t(`tour.promptMakingTour.step3`),
            },
            {
                target: '[data-tour="promptPreview"]',
                content: t(`tour.promptMakingTour.step4`),
            },
            {
                target: '[data-tour="saveButton"]',
                content: t(`tour.promptMakingTour.step5`),
            },
        ];

        setSteps(tourSteps);
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRunTour(false);
            setIsFirstVisited(false);
            setTourFinish(false);
        }
    };
    
    if (!getIsFirstVisited()) return null;

    return (
        <Joyride
            steps={steps}
            run={runTour}
            continuous
            showSkipButton
            showProgress
            styles={{
                options: {
                    arrowColor: 'var(--color-gray1)',
                    backgroundColor: 'var(--color-gray1)',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                    primaryColor: 'var(--block-main-color)',
                    textColor: 'var(--color-gray9)',
                    width: 300,
                    zIndex: 1000
                },
                beacon: {
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                },
                tooltip: { 
                    padding: 20,
                    borderRadius: 10,
                },
                buttonNext: {
                    backgroundColor: 'var(--block-main-color)',
                    border: '1px solid var(--block-main-color)',
                    borderRadius: 30,
                    padding: '8px 12px',
                },
                buttonSkip: {
                    backgroundColor: "transparent",
                    color: "var(--color-gray5)",
                    border: "none",
                },
            }}
            callback={handleJoyrideCallback}
        />
    );
};

export default PromptMakingTour;
