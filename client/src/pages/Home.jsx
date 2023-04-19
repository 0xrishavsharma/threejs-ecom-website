import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from 'valtio';

import state from "../store"

import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimation
} from "../config/motion";
import { CustomButton } from '../components';

const Home = () => {
    const snap = useSnapshot(state)
    return (
        <AnimatePresence>
            {
                snap.isHome &&
                <motion.section className="home" {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')}>
                        <img
                            src="./threejs.png"
                            alt="logo"
                            className="w-8 h-8 object-contain"
                        />
                    </motion.header>
                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>
                                DON'T <br className='hidden xl:block' /> GIVE UP!
                            </h1>
                        </motion.div>
                        <motion.div className='flex flex-col gap-5' {...headContentAnimation}>
                            <p className='max-w-md font-normal text-gray-600 text-base' >
                                Create your unique and exclusive shirt with our brand-new 3D customization tool.{" "}
                                <strong>Unleash your imagination</strong>{" "}
                                and define your own style.
                            </p>
                            <CustomButton
                                type="filled"
                                title="Customize Now"
                                handleClick={() => state.isHome = false}
                                customStyles="w-fit px-8 py-3.5 font-bold text-base"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            }
        </AnimatePresence>
    )
}

export default Home