//14 and 16 -> presentation and control
import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useGesture } from "@use-gesture/react";


const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE =5;

const fadeMeshes = (group, opacity) =>{
    if(!group) return;

    group.traverse((child) => {
        if(child.isMesh){
            child.material.transparent = true;
            gsap.to(child.material, {
                opacity, duration: ANIMATION_DURATION })
            }
    })
}

const moveGroup = (group, x) => {
    if(!group) return; 
    
    gsap.to(group.position, {
        x, duration: ANIMATION_DURATION
    })
}


const ModelSwitcher = ({scale, isMobile}) => {

    const SCALE_LARGE_DESKTOP = 0.08;
    const SCALE_LARGE_MOBILE = 0.05;

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();
    //const groupRef = useRef();

    //console.log('ModelSwitcher rendered, isMobile:', isMobile);

    //const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

    useGSAP(() => {
        if(showLargeMacbook){
        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
        moveGroup(largeMacbookRef.current, 0);

        fadeMeshes(smallMacbookRef.current, 0);
        fadeMeshes(largeMacbookRef.current, 1);
        } else {
        moveGroup(smallMacbookRef.current, 0);
        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

        fadeMeshes(smallMacbookRef.current, 1);
        fadeMeshes(largeMacbookRef.current, 0);
        }
    }, [scale])

    /*const bind = useGesture({
        onDrag: ({ offset: [x, y] }) => {
            console.log('Drag detected:', { x, y, isMobile });
            if (isMobile && groupRef.current) {
                console.log('Applying rotation');
                const newRotationY = x * 0.01;
                const newRotationX = -y * 0.01;

                setRotation({ x: newRotationX, y: newRotationY });

                gsap.to(groupRef.current.rotation, {
                    y: newRotationY,
                    x: newRotationX,
                    duration: 0.3
                });
            }
        }
    });*/


    const controlsConfig = {
        snap: true,
        speed: isMobile ? 0.5 : 1,
        zoom: 1,
        //polar: [-Math.PI, Math.PI],
        polar: [-Math.PI * 0.7, Math.PI * 0.7],
        azimuth: [-Infinity, Infinity],
        config: { mass: 1, tension: 100, friction: 30 }
    }

  return (
    <>
        <PresentationControls {...controlsConfig}>
            <group ref={largeMacbookRef}>
                <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
            </group>
        </PresentationControls>

        <PresentationControls {...controlsConfig}>
            <group ref={smallMacbookRef}>
                <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
            </group>
        </PresentationControls>
    </>
  )
}


export default ModelSwitcher