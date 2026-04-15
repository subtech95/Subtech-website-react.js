"use client";

import { useEffect, useId, useState } from "react";
import { motion, useAnimation } from "framer-motion";

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleColor?: string;
  particleDensity?: number;
}

export function SparklesCore({
  id,
  className,
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  speed = 1,
  particleColor = "#ffffff",
  particleDensity = 100,
}: SparklesCoreProps) {
  const [init, setInit] = useState(false);
  const controls = useAnimation();
  const generatedId = useId();

  useEffect(() => {
    initParticlesEngine(async (engine: unknown) => {
      // @ts-expect-error — tsparticles type mismatches
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    if (init) {
      controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });
    }
  }, [init, controls]);

  return (
    <motion.div animate={controls} initial={{ opacity: 0 }} className={className}>
      {init && (
        <Particles
          id={id || generatedId}
          options={{
            background: {
              color: { value: background },
            },
            fullScreen: { enable: false },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: false },
                onHover: { enable: true, mode: "grab" as const },
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.1 } },
              },
            },
            particles: {
              color: { value: particleColor },
              links: { enable: false },
              move: {
                enable: true,
                speed: { min: speed * 0.2, max: speed },
                direction: "none" as const,
                random: true,
                straight: false,
                outModes: { default: "out" as const },
              },
              number: {
                density: { enable: true, width: 400, height: 400 },
                value: particleDensity,
              },
              opacity: {
                value: { min: 0.1, max: 0.8 },
                animation: {
                  enable: true,
                  speed: 0.8,
                  startValue: "random" as const,
                  destroy: "none" as const,
                },
              },
              shape: { type: "circle" as const },
              size: {
                value: { min: minSize, max: maxSize },
                animation: {
                  enable: true,
                  speed: 2,
                  startValue: "random" as const,
                  destroy: "none" as const,
                },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
}
