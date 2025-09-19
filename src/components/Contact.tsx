import React, { useRef, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { MobileCompatibilityWrapper } from "./";

interface FormData {
  name: string;
  email: string;
  message: string;
}

// WebGL detection hook
const useWebGLSupport = () => {
  const [webglSupported, setWebglSupported] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setWebglSupported(!!gl);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);
  
  return webglSupported;
};

const Contact: React.FC = () => {
  const webglSupported = useWebGLSupport();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Spexzee",
          from_email: form.email,
          to_email: "abub5979@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              required
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your E-mail</span>
            <input
              type='email'
              name='email'
              required
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Thought</span>
            <textarea
              rows={7}
              name='message'
              required
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className='bg-[#294a7e] py-3 px-8 rounded-xl outline-none w-100 text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        {webglSupported ? (
          <MobileCompatibilityWrapper 
            componentName="EarthCanvas"
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg border-2 border-blue-500/50 shadow-xl backdrop-blur-sm">
                <div className="text-center text-blue-200">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center shadow-2xl border border-blue-400/30">
                    <div className="text-8xl filter drop-shadow-lg">🌍</div>
                  </div>
                  <p className="text-xl font-bold text-white drop-shadow-lg">Earth View</p>
                  <p className="text-sm text-blue-300 mt-2">Fallback Mode</p>
                </div>
              </div>
            }
          >
            <EarthCanvas />
          </MobileCompatibilityWrapper>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-lg border-2 border-blue-500/50 shadow-xl backdrop-blur-sm">
            <div className="text-center text-blue-200">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center shadow-2xl border border-blue-400/30">
                <div className="text-8xl filter drop-shadow-lg">🌍</div>
              </div>
              <p className="text-xl font-bold text-white drop-shadow-lg">Earth View</p>
              <p className="text-sm text-blue-300 mt-2">WebGL Not Supported</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");