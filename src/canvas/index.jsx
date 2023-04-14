import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from '@react-three/drei';

import Backdrop from './Backdrop';
import Shirt from './Shirt';
import CameraRig from './CameraRig';

const CanvasModel = () => {
    return (
        <Canvas
            // Increasing the size of the shirt for that we need to play with shadows and camera positioning 
            // fov = field of view
            shadows
            camera={{ position: [0, 0, 0], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
            className='w-full h-full max-w-full transition-all ease-in'
        >
            <ambientLight intensity={0.5} />
            <Environment preset="city" />
            <CameraRig >
                <Backdrop />
                <Center>
                    <Shirt />
                </Center>
            </CameraRig>
        </Canvas>
    )
}

export default CanvasModel