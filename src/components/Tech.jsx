import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { textVariant } from './../utils/motion';

const Tech = () => {
  // const styles = {
  //   display: 'grid',
  //   gridTemplateColumns: 'repeat(4, 1fr)',
  //   gap: '2rem',
  //   placeItems: 'center'
  // }
  return (
    <div id="skills">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center mb-6`}  >Skills</p>
       {/* <h2 className={`${styles.sectionHeadText}`}>Projects.</h2> */}
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10" >
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    <div/>
  );
};

export default SectionWrapper(Tech, "");
