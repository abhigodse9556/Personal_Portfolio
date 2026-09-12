"use client";

import { links } from "@/data/links";
import Image from "next/image";
import { motion } from "motion/react";
import Typewriter from "./ui/typewriter";

const Hero = () => {
  return (
    <div className="flex font-mono">
      <main className="flex flex-col min-h-[90vh] items-center justify-center md:flex-row px-6 py-8 mt-8">
        <div id="hero-text" className="flex min-w-[50vw] items-center">
          <div className="flex flex-col gap-2 p-2 md:p-4 lg:p-20">
            <motion.h1
              className="text-xl text-text-secondary font-bold md:text-xl"
              initial={{ translateX: -100 }}
              animate={{ translateX: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hello, It&apos;s me
            </motion.h1>
            <motion.h1
              className="text-3xl text-text-primary font-mono font-bold md:text-5xl lg:text-6xl xl:text-7xl"
              initial={{ opacity: 0, scale: -6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 1.5 }}
            >
              Abhishek Godse
            </motion.h1>
            <motion.h2
              className="text-lg font-mono md:text-2xl lg:text-3xl xl:text-3xl"
              initial={{ opacity: 0, translateX: 100, scale: 0.5 }}
              animate={{ opacity: 1, translateX: 0, scale: 1 }}
              transition={{ delay: 2, duration: 1.25 }}
            >
              I&apos;m a Software Engineer
            </motion.h2>
            <motion.div
              className="mt-4 text-sm md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.25 }}
            >
              <Typewriter
                text="I code to solve real-world problems and make a positive impact."
                delay={3}
                speed={0.05}
              />
            </motion.div>
            <motion.div
              className="flex justify-center items-center gap-4 mt-4 text-sm md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1.25 }}
            >
              <a
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-2 text-primary-foreground transition-colors hover:bg-primary/80 max-w-50"
                href="#contact"
              >
                <Image
                  className="dark:invert h-3.5 w-4"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={16}
                  height={14}
                />
                Get in Touch
              </a>
              <a
                className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] max-w-50"
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </motion.div>
          </div>
        </div>
        <motion.div
          id="hero-images"
          className="flex md:min-w-[40vw] md:min-h-[80vh] items-center justify-center border-0 border-dashed border-black/8 dark:border-white/[.145]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 3 }}
        >
          <Image
            className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/app-development-frameworks.png"
            alt="Abhishek Godse"
            width={1500}
            height={1500}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Hero;
