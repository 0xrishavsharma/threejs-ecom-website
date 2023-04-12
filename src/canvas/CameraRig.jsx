import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from "maath";
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
    const snap = useSnapshot(state);
    const group = useRef();

    // useFrame hook allows us to execute code on every frame
    useFrame((state, delta) => {

        // Defining breakpoints so that our shirt looks good on all screen sizes
        const isBreakpoint = window.innerWidth <= 1260;
        const isMobile = window.innerWidth <= 600;

        // set the initial position of the model
        let targetPosition = [-0.4, 0, 2];
        if (snap.isHome) {
            if (isBreakpoint) targetPosition = [0, 0, 2];
            if (isMobile) targetPosition = [0, 0.2, 2.5];
        } else {
            if (isMobile) targetPosition = [0, 0, 2.5];
            else targetPosition = [0, 0, 2];
        }

        // set model camera position
        easing.damp3(
            state.camera.position,
            targetPosition,
            0.25,
            delta
        )

        // Making the camera follow the mouse or making the shirt rotate with the movement of mouse
        easing.dampE(
            group.current.rotation,
            [state.pointer.y / 10, -state.pointer.x / 5, 0],
            0.25,
            delta
        )
    })


    return (
        <group ref={group}>
            {children}
        </group>
    )
}

export default CameraRig