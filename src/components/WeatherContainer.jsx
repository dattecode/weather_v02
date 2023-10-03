import React, { useState } from "react";
import "../styles/cardStyle.css";
import tempSvg from "../svg/temp.svg";
import { AnimatePresence, motion } from "framer-motion";
import Load from "./Load";

export const WeatherContainer = ({ weather }) => {
  //State
  const [temp, setTemp] = useState(true);
  //logic
  const kelvinToCelsius = (kelvin) => {
    const celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  };

  const kelvinToFahrenheit = (kelvin) => {
    const fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
    return fahrenheit.toFixed(2);
  };

  //animated
  const changeBtn = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      backgroundColor: "#6A00FF",
    },
    click: {
      scale: 0.8,
    },
  };

  const textAnimate = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const infAnimate = {
    initial: {
      y: 0,
    },
    animate: {
      y: [1, 2, 1, 0, -1, -2, -1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  //handle
  const handleTemp = () => {
    setTemp(!temp);
  };

  //animate

  return (
    <article className="weatherContainer">
      <article className=" descriptionHeader">
        <motion.h1 className="cityTitle"
        variants={changeBtn}
        whileHover="hover"
        >{weather?.name}</motion.h1>
        <section className="tempHeader">
          <motion.h3
            className="temp"
            initial="hidden"
            animate={"visible"}
            variants={textAnimate}
            transition={{ duration: 1 }}
            key={Math.random()}
          >
            temp : <img src={tempSvg} className="svg" />
            {temp
              ? kelvinToCelsius(weather?.main.temp)
              : kelvinToFahrenheit(weather?.main.temp)}
          </motion.h3>
          <div className="description">
            <motion.img
              variants={infAnimate}
              animate="animate"
              src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
            />
            <h3>{weather?.weather[0].description}</h3>
          </div>
        </section>
      </article>

      <article className="mainContainer">
        <section className="tempMinMax">
          <motion.div
            initial="hidden"
            animate={"visible"}
            variants={textAnimate}
            transition={{ duration: 1 }}
            key={Math.random()}
          >
            TempMin <img src={tempSvg} className="svg" />
            {temp
              ? kelvinToCelsius(weather?.main.temp_min)
              : kelvinToFahrenheit(weather?.main.temp_min)}
          </motion.div>
          <motion.div
            initial="hidden"
            animate={"visible"}
            variants={textAnimate}
            transition={{ duration: 1 }}
            key={Math.random()}
          >
            TempMax <img src={tempSvg} className="svg" />
            {temp
              ? kelvinToCelsius(weather?.main.temp_max)
              : kelvinToFahrenheit(weather?.main.temp_max)}
          </motion.div>
        </section>
        <section className="stat">
          <motion.div className="statType" variants={changeBtn} whileHover="hover" >Pressure: {weather?.main.pressure}</motion.div>
          <motion.div className="statType" variants={changeBtn} whileHover="hover" >Humidity: {weather?.main.humidity}</motion.div>
          <motion.div className="statType" variants={changeBtn} whileHover="hover" >Wind: {weather?.wind.speed}</motion.div>
        </section>
      </article>

      <div className="contBtn">
        <motion.button
          onClick={handleTemp}
          className="weatherBtn"
          whileHover="hover"
          whileTap="click"
          variants={changeBtn}
        >
          <motion.span
            initial="hidden"
            animate={"visible"}
            variants={textAnimate}
            transition={{ duration: 0.3 }}
            key={Math.random()}
          >
            {temp ? "Celsius" : "Fahrenheit"}
          </motion.span>
        </motion.button>
      </div>
    </article>
  );
};
