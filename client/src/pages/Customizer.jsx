import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import config from "../config/config";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";

import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";

import {
    AIPicker,
    ColorPicker,
    CustomButton,
    FilePicker,
    Tab,
} from "../components";

const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState("");

    const [prompt, setPrompt] = useState("");
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    // show a modal containing the tab content when any of the editor tab is active
    const generateTabModal = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />
            case "filepicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "aipicker":
                return <AIPicker
                    prompt={prompt}
                    setPrompt={setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}

                />
            default:
                return null;
        }
    };

    const handleSubmit = async (type) => {
        if (!prompt) {
            alert("Please enter a prompt");
            return;
        }
        try {
            // call our backend to generate an ai image for us
            setGeneratingImg(true);
            const response = await fetch('https://threejs-ai-project-4dt3.onrender.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt
                })
            })
            const data = await response.json();
            handleDecals(type, `data:image/png;base64,${data.photo}`);

        } catch (err) {
            alert(`Something went wrong. Please try again later.${err}`)
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    }

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        // after setting the state, updating the activeFilterTab
        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const readFile = (type) => {
        reader(file).then((result) => {
            handleDecals(type, result);
            setActiveEditorTab('')
        })
    }

    return (
        <AnimatePresence>
            {!snap.isHome && (
                <>
                    <motion.div
                        key='custom'
                        className='absolute top-0 left-0 z-10'
                        {...slideAnimation("left")}
                    >
                        <div className='flex items-center min-h-screen'>
                            <div className='editortabs-container tabs'>
                                {EditorTabs.map((tab, index) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        isActiveTab={activeEditorTab}
                                        handleClick={() =>
                                            setActiveEditorTab(tab.name)
                                        }
                                    />
                                ))}
                                {generateTabModal()}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className='absolute z-10 top-5 right-5'
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type='filled'
                            title='Go Back'
                            handleClick={() => (state.isHome = true)}
                        />
                    </motion.div>
                    <motion.div
                        className='filtertabs-container'
                        {...slideAnimation("up")}
                    >
                        {FilterTabs.map((tab, index) => {
                            return (
                                <Tab
                                    key={tab.name}
                                    tab={tab}
                                    isFilterTab
                                    isActiveTab={activeFilterTab[tab.name]}
                                    handleClick={() => handleActiveFilterTab(tab.name)}
                                />
                            );
                        })}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
