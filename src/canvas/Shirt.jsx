import React from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/shirt_baked.glb');

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);

    // We will be playing with easing for a bit to apply color smoothly and not dramatically
    useFrame((state, delta) => {
        easing.dampC(materials.lambert1.color,
            snap.color,
            0.25,
            delta
        )
    })

    return (
        <group>
            <mesh
                castShadow
                geometry={nodes.T_Shirt_male.geometry}
                material={materials.lambert1}
                material-roughness={1}
                dispose={null} // to avoid memory leaks
            >
                {
                    snap.isFullTexture && (
                        <Decal
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            scale={1} // the size of the decal
                            map={fullTexture} // the texture
                        />
                    )
                }
                {
                    snap.isLogoTexture && (
                        <Decal
                            position={[0, 0.04, 0.15]}
                            rotation={[0, 0, 0]}
                            scale={0.15} // the size of the decal
                            map={logoTexture} // the texture
                            map-anisotropy={16} // to change the quality of the texture
                            depthTest={false} // to avoid z-fighting, when true the logo will be displayed on top of every layer but here we only want it to be on top of shirt
                            depthWrite={true}
                        />
                    )
                }
            </mesh>
        </group>
    )
}

export default Shirt