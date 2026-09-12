import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
}

export default function Typewriter(props: TypewriterProps) {
  const { text, delay = 0, speed = 0.05 } = props;
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    // Animate the character count from 0 to the text length
    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * speed, // Dynamic duration based on text length
      delay: delay, // Configurable initial pause
      ease: "linear",
      onComplete: () => setAnimationCompleted(true),
    });

    return () => controls.stop();
  }, [text, delay, speed, count]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {/* Typed Text Output */}
      <motion.span>{displayText}</motion.span>

      {/* Blinking Terminal Cursor */}
      <motion.span
        animate={animationCompleted ? { opacity: 0 } : { opacity: [1, 0] }}
        transition={{
          repeat: animationCompleted ? 0 : Infinity,
          duration: 0.6,
          ease: "linear",
          times: [0, 0.49, 0.5, 0.99, 1],
        }}
        style={{
          display: "inline-block",
          width: "2px",
          height: "1em",
          backgroundColor: "currentColor",
          marginLeft: "2px",
        }}
      />
    </span>
  );
}
