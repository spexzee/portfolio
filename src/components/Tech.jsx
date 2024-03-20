import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { textVariant } from './../utils/motion';

const Tech = () => {
  return (
    <div id="skills">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center mb-6`}>Skills</p>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10" >
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
            <p className="text-center">{technology.name}</p>
          </div>
        ))}
      </div>
    </div>
    
  );
}

export default SectionWrapper(Tech, "");