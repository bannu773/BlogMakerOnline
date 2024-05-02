import { motion } from "framer-motion";
import { slideIn } from "../../utils/motion";
import { styles } from "../../styles";
import { EarthCanvas } from "../../canvas";
import { assets } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import '../../components/main/main.css'
import { Context } from "../../context/Context";
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { addOutline } from "../../store/outline";
import { useDispatch } from "react-redux";

const Hero = () => {
  const navigate = useNavigate();
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
    prompt,
    setPrompt,
  } = useContext(Context);
  const dispatch = useDispatch();
  const renderJsonData = (data) => {
    // Define the regex to extract JSON wrapped with '''json ... '''
    console.log(data);
    const regex = /```json\s*(.*?)```/gs;
    const matches = data.match(regex);
    console.log(matches);

    // Check if there are matches and extract the JSON string
    const cleanData = matches && matches.length > 0 ? matches[0].replace(/```json\s*|```/gs, '') : '';
    console.log(cleanData);

    try {
      const parsedData = JSON.parse(cleanData);
      dispatch(addOutline(parsedData));
      return (
        <Typist cursor={{ show: false }} avgTypingDelay={10} onTypingDone={() => navigate('/blogpost')}  >
          {
            Object.keys(parsedData).filter(key => key.startsWith('heading')).map((key) => {
              const subheadingsKey = `subheadings_${key.split('_')[1]}`;
              console.log(key);
              console.log(subheadingsKey); // Construct the subheadings key based on the heading key
              return (
                <div className="outline" key={key}>
                  <h2>{parsedData[key]}</h2>
                  <ul>
                    {parsedData[subheadingsKey].map((sub, index) => (
                      <li  key={index}>
                        <Chip color="info" sx={{
                          height: 'auto',
                          '& .MuiChip-label': {
                            display: 'block',
                            whiteSpace: 'normal',
                            fontSize: '1.3rem',
                            padding: '0.5rem',
                            color: 'white',
                          },
                        }} label={sub} variant="outlined" />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })
          }
        </Typist>
      )
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return <p>Error parsing data</p>;
    }
  };


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

            {
              resultData !== "" || loading ? (<div className="result-data bg-indigo-900 bg-opacity-90 rounded-lg pt-10 pb-20 pl-10 pr-10">
                {/* <img src={assets.gemini_icon} alt="" /> */}
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <div>{renderJsonData(resultData)}</div>
                )}
              </div>) : (
                null
              )

            }
          </div>
          <div className="main-bottom bottom-10 ">
            <div className="search-box">
              <textarea
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                value={prompt}
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
