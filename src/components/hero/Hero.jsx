import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { styles } from "../../styles";
import { EarthCanvas } from "../../canvas";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import '../../components/main/main.css'
import { Context } from "../../context/Context";

const Hero = () => {

  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);
  return (
    <motion.div variants={slideIn('right', 'tween', 0.2, 1)} initial="hidden" whileInView="show" className="">

      <section className={`relative w-full h-screen mx-auto bg-img `}>

        <div
          className={`absolute  top-[120px] mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
          style={{ zIndex: 0, pointerEvents: "none" }}
        >
          <marquee scrollamount="40" >
            <h1 className={`${styles.heroHeadText} mt-8 opacity-20   glow`} style={{ fontFamily: "Outfit", fontSize: "600px" }}>
              BUILDBLOG
            </h1>
          </marquee>
        </div>


        <EarthCanvas />



        <div className="w-full flex justify-center ">
          <div className="main-bottom bottom-20  ">

            <div className="result-data bg-indigo-900 bg-opacity-90 rounded-lg pl-10 pr-10">
              {/* <img src={assets.gemini_icon} alt="" /> */}
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
          <div className="main-bottom bottom-10 ">
            <div className="search-box">
              <textarea
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
                placeholder="Enter the Prompt Here"
              />
              <div>
                {/* <img src={assets.gallery_icon} alt="" />
                <img src={assets.mic_icon} alt="" /> */}
                <img
                  src={assets.dark_send_icon}
                  alt=""
                  onClick={() => {
                    onSent();
                  }}
                />
              </div>
            </div>
          </div>
        </div>



      </section>
    </motion.div>
  );
};

export default Hero;
