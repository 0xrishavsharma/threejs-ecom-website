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
                />
            case "aipicker":
                return <AIPicker />
            default:
                return null;
        }
    };

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;
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
                                    isActiveTab=''
                                    handleClick={() => { }}
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
