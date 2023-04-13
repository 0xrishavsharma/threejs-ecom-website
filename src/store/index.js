import { proxy } from "valtio";

const state = proxy({
    isHome: true,
    color: '#5e00d8',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: "./threejs.png",
    fullDecal: "./threejs.png",
});

export default state;