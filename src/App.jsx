import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const handleClick = () => {
    window.open('https://www.rockstargames.com/gta-v', '_blank');
  };
  
  

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".vi-mask-group", {
      rotate: 10,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
      duration: 2,
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main",{
        scale: 1,
        duration: 2,
        rotate: 0,
        delay: "-1",
        ease: "Expo.easeInOut",
    });

    gsap.to(".sky",{
        scale: 1.1,
        duration: 2,
        rotate: 0,
        delay: "-.8",
        ease: "Expo.easeInOut",
    });
    gsap.to(".bg",{
      scale: 1.1,
      duration: 2,
      rotate: 0,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".character",{
      scale: 1,
      x:"-50%",
      bottom:"-50%",
      duration: 2,
      rotate: 0,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".text",{
      scale: 1,
      duration: 2,
      rotate: 0,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;

      gsap.to(".imagesdiv .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });
  }, [showContent]);

  return (
    <>
    
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full bg-[#000] rotate-[-10deg] scale-[1.7] overflow-hidden">
          <div className="landing w-full h-screen bg-black relative overflow-hidden">
            <div className="navbar w-full py-10 px-10 absolute flex justify-between items-center top-0 left-0 z-[10]">
              <div className="logo flex gap-2 items-center " onClick={() => setMenuOpen(true)}>
                <div  className="lines flex flex-col gap-[2px]">
                  {/* <div className="line w-15 h-2 bg-white"></div>
                  <div className="line w-8 h-2 bg-white"></div>
                  <div className="line w-5 h-2 bg-white"></div> */}
                  <img src="https://www.svgrepo.com/show/331565/rockstar-games.svg" alt="rockstar-icon" className="w-15 h-13" />
                </div>
          
                <h3 
                  className="relative text-3xl mt-[-4px] leading-none text-white">
                  Rockstar
                {/* {dropdownOpen && (
                <ul className="absolute -left-8 text-2xl mt-4 w-48 bg-zinc-100 text-black rounded-sm shadow-lg z-10">
                  <li className="px-3 py-2 hover:bg-gray-300 cursor-pointer">GTA V</li>
                  <li className="px-3 py-2 hover:bg-gray-300 cursor-pointer">GTA VI</li>
                  <li className="px-3 py-2 hover:bg-gray-300 cursor-pointer">Red Dead Redemption 2</li>
                  <li className="px-3 py-2 hover:bg-gray-300 cursor-pointer">Bully</li>
                </ul>
              )} */}
                </h3>
                {showTrailer && (
                  <div
                    className="fixed top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
                    onClick={() => setShowTrailer(false)} // click to close
                  >
                    <div className="w-[90%] max-w-4xl aspect-video">
                      <iframe
                        className="w-full h-full rounded-xl shadow-lg"
                        src="https://www.youtube.com/embed/QdBZY2fkU-0?autoplay=1&controls=1"
                        title="GTA VI Official Trailer"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-white text-3xl mt-[-3px] cursor-pointer relative right-0 flex items-center gap-2">
                <i onClick={()=>setShowTrailer(true)} className="ri-play-circle-line"></i> 
                Tap to Play
              </div>

            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-screen">
              <img
                src="./sky.png"
                alt="sky"
                className="sky scale-[1.4] rotate-[-20deg] absolute top-0 left-0 w-full h-screen object-cover"
              />
              <img
                src="./bg.png"
                alt="bg"
                className="bg absolute scale-[1.6] rotate-[-3deg] top-0 left-0 w-full h-screen object-cover"
              />
              <div className="text text-white flex flex-col gap-2 absolute top-20 left-1/2 -translate-x-1/2 scale-[1.4] rotate-[-10deg]">
                <h1 className="text-[9rem] leading-none -ml-40">grand</h1>
                <h1 className="text-[10rem] leading-none ml-40">theft</h1>
                <h1 className="text-[9rem] leading-none -ml-40">auto</h1>
              </div>
              <img
                src="./girlbg.png"
                alt="girlbg"
                className="character absolute bottom-[-150%] left-1/2 -translate-x-1/2 scale-[2] rotate-[-20deg]"
              />
            </div>
            <div className="btmbar text-white w-full py-11 px-10 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent">
              <div className="flex gap-4 items-center">
                <i className="text-2xl ri-arrow-down-line"></i>
                <h3 onClick={scrollToBottom} className="cursor-pointer text-m font-[Helvetica_Now_Display]">
                  Scroll Down
                </h3>
              </div>
              <img
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[35px]"
                src="./ps5.png"
                alt="ps5"
              />
            </div>
          </div>
          <div className="w-full h-screen flex items-center justify-center bg-black">
            <div className="cntnr flex text-white w-full h-[80%]">
              <div className="limg relative w-1/2 h-full">
                <img
                  className="absolute scale-[0.9] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
                  src="./imag.png"
                  alt=""
                />
              </div>
              <div className="rg w-[40%] py-30">
                <h1 className="text-6xl">Still Running</h1>
                <h1 className="text-6xl">Not Hunting</h1>
                <p className="mt-8 text-m font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  voluptatum possimus consequatur obcaecati non at molestiae
                  numquam, officiis, sequi dignissimos, quidem velit recusandae!
                </p>
                <p className="mt-3 text-m font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  deserunt laboriosam. Inventore error cumque ad maxime deserunt
                  amet fugiat illo qui, iste repellat saepe nobis a sint nihil,
                  facilis quidem architecto magnam tempora earum quod.
                </p>
                <p className="mt-8 text-m font-[Helvetica_Now_Display]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  deserunt laboriosam. Inventore error cumque ad maxime deserunt
                  amet fugiat illo qui, iste repellat saepe nobis a sint nihil,
                  facilis quidem architecto magnam tempora earum quod.
                </p>
   
                <button onClick={handleClick} className="cursor-pointer bg-yellow-500 text-3xl mt-10 text-black px-7 py-7">
                  Download Now
                </button>
              </div>
            </div>
          </div>
          <div className="fixed flex gap-4 items-center z-50 bottom-10 left-10">
              <i className="text-2xl text-white ri-arrow-up-line"></i>
              <h3 onClick={scrollToTop} className="cursor-pointer text-white text-m font-[Helvetica_Now_Display]">
                Back to Top
              </h3>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
