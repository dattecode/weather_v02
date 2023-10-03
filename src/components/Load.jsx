import React from 'react'
import { animate, motion } from 'framer-motion'
import loadSvg from "../svg/loading.svg"
import "../styles/loadingCss.css"

const Load = () => {
  const animateLoad = {
    initial:{
      y:-500,
      opacity:0
    },
    animate:{
      y:0,
      opacity:1
    },
    exit:{
      y:500,
      opacity:0
    }
  }

  const infAnimate = {
    initial: {
      x: 0,
    },
    animate: {
      x: [3, 20, 3, 0, -3, -20, -3, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div 
    className='containerLoad'
    variants={animateLoad}
    initial="initial"
    animate="animate"
    transition={{duration:0.4}}
    >
      <motion.img 
      src={loadSvg} 
      className='svgL'
      variants={infAnimate}
      initial="initial"
      animate="animate"
       />
      <h2>Loading . . . </h2>
    </motion.div>
  )
}

export default Load