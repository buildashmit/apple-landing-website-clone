import { useRef, useEffect } from "react"

const Hero = () => {

const videoRef = useRef();

useEffect(() =>{
    if(videoRef.current) videoRef.current.playbackRate = 2;
    
}, [])

return (
    <section id="hero">
        <div>
            <h1>Macbook Pro</h1>
            <img src="/title.png" alt="MacBook Title" />
        </div>

        <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />

        <button>Buy</button>
        <p>From &#x20B9;1,20,000 or &#x20B9;6000 for 12 months</p>
    </section>
  )
}

export default Hero