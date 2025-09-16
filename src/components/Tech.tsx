import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { motion } from 'framer-motion';
import { styles } from "../styles";
import { textVariant } from './../utils/motion';
import { Technology } from "../constants";
import { useGetTechnologies } from "../API/tech";
import { SimpleLoader } from "./";

const Tech: React.FC = () => {
  const { data: technologies = [], isLoading, error } = useGetTechnologies();

  if (isLoading) {
    return (
      <div id="skills" className="flex justify-center items-center min-h-[200px]">
        <SimpleLoader />
      </div>
    );
  }

  if (error) {
    console.error('Error loading technologies:', error);
  }

  return (
    <div id="skills">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center mb-6`}>Skills</p>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10" >
        {technologies.map((technology: Technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon ??''} />
            <p className="text-center">{technology.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SectionWrapper(Tech, "");