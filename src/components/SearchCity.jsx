import React from "react";
import searchBtn from "../svg/search.svg";
import "../styles/searchCss.css";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const SearchCity = ({ setCity }) => {
  const { register, handleSubmit,reset } = useForm();

  const btnAnimate = {
    hover: {scale: 1.2},
    tap: {scale: 0.9}
  }

  const handleCity = ({ city }) => {
    setCity(city)
    reset({
      city:""
    })
  };

  return (
    <form onSubmit={handleSubmit(handleCity)} className="containerSearch">
      <div>
        <input
          type="text"
          id="city"
          placeholder="search City"
          className="inputText"
          {...register("city")}
          autoComplete="off"
        />
      </div>
      <motion.button 
      className="btnSearch"
      variants={btnAnimate}
      whileHover="hover"
      whileTap="tap"
      >
        <img src={searchBtn} className="svgS" />
      </motion.button>
    </form>
  );
};

export default SearchCity;
