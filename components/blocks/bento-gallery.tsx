"use client"

import { useRef } from "react"
import { useTheme } from "@/hooks/useTheme"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function BentoGallery() {
  const { isLight } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Smooth out the scroll progress for a "liquid" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 40,
    restDelta: 0.001
  })

  // Phase 1 (0–0.25): headline
  const textOpacity = useTransform(smoothProgress, [0, 0.05, 0.15, 0.22], [0, 1, 1, 0])
  const textY = useTransform(smoothProgress, [0, 0.05], [20, 0])

  // Phase 2 (0.20–0.75): 4 quadrants flying in from corners with staggered "organic" feel
  const range1 = [0.20, 0.60]
  const range2 = [0.22, 0.62]
  const range3 = [0.24, 0.64]
  const range4 = [0.26, 0.66]

  // Quadrant 1 (Top-Left)
  const q1X = useTransform(smoothProgress, range1, ["-100%", "0%"])
  const q1Y = useTransform(smoothProgress, range1, ["-100%", "0%"])
  const q1Op = useTransform(smoothProgress, range1, [0, 1])
  const q1Sc = useTransform(smoothProgress, range1, [0.85, 1])

  // Quadrant 2 (Top-Right)
  const q2X = useTransform(smoothProgress, range2, ["100%", "0%"])
  const q2Y = useTransform(smoothProgress, range2, ["-100%", "0%"])
  const q2Op = useTransform(smoothProgress, range2, [0, 1])
  const q2Sc = useTransform(smoothProgress, range2, [0.85, 1])

  // Quadrant 3 (Bottom-Left)
  const q3X = useTransform(smoothProgress, range3, ["-100%", "0%"])
  const q3Y = useTransform(smoothProgress, range3, ["100%", "0%"])
  const q3Op = useTransform(smoothProgress, range3, [0, 1])
  const q3Sc = useTransform(smoothProgress, range3, [0.85, 1])

  // Quadrant 4 (Bottom-Right)
  const q4X = useTransform(smoothProgress, range4, ["100%", "0%"])
  const q4Y = useTransform(smoothProgress, range4, ["100%", "0%"])
  const q4Op = useTransform(smoothProgress, range4, [0, 1])
  const q4Sc = useTransform(smoothProgress, range4, [0.85, 1])

  // Image Source
  const imgSrc = isLight 
    ? "/infographics/Home Page Illustration - light.png" 
    : "/infographics/Home Page Illustration - Dark.png"

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div
        className="sticky top-0 h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: isLight ? '#F7F2E8' : '#0F172A' }}
      >

        {/* ── Phase 1: Headline ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <p className="uppercase tracking-[0.25em] text-xs font-bold text-[#D1AF62] mb-5">
            Your Trading Education Partner
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-3xl" style={{ color: isLight ? '#3E3730' : '#E0E7FF' }}>
            Master The Markets
          </h2>
          <p className="mt-6 max-w-lg text-base md:text-lg font-medium leading-relaxed" style={{ color: isLight ? '#A38970' : '#CBD5E1' }}>
            Step into the world of professional trading with our comprehensive frameworks.
            Experience market dynamics through visual intelligence.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8 pointer-events-auto">
            <Link
              href="/courses"
              className="px-8 py-4 bg-[#D1AF62] text-white rounded-full font-bold text-base hover:bg-[#C09E51] hover:shadow-[0_0_24px_rgba(209,175,98,0.45)] transition-all duration-300 hover:scale-105"
            >
              Start Learning
            </Link>
          </div>
        </motion.div>

        {/* ── Phase 2: 2x2 Jigsaw Assembly ── */}
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center p-4 md:p-8">
          <div className="relative w-full h-full max-w-[1200px] aspect-[16/9] grid grid-cols-2 grid-rows-2 gap-0 overflow-visible shadow-2xl rounded-lg overflow-hidden lg:scale-110">
            
            {/* Top-Left Quadrant */}
            <motion.div
              style={{ x: q1X, y: q1Y, opacity: q1Op, scale: q1Sc }}
              className="relative overflow-hidden w-full h-full will-change-transform"
            >
              <div className="absolute top-0 left-0 w-[200%] h-[200%]">
                <Image 
                  src={imgSrc} 
                  alt="Infographic TL" 
                  fill 
                  priority
                  className="object-cover" 
                />
              </div>
            </motion.div>

            {/* Top-Right Quadrant */}
            <motion.div
              style={{ x: q2X, y: q2Y, opacity: q2Op, scale: q2Sc }}
              className="relative overflow-hidden w-full h-full will-change-transform"
            >
              <div className="absolute top-0 left-[-100%] w-[200%] h-[200%]">
                <Image 
                  src={imgSrc} 
                  alt="Infographic TR" 
                  fill 
                  priority
                  className="object-cover" 
                />
              </div>
            </motion.div>

            {/* Bottom-Left Quadrant */}
            <motion.div
              style={{ x: q3X, y: q3Y, opacity: q3Op, scale: q3Sc }}
              className="relative overflow-hidden w-full h-full will-change-transform"
            >
              <div className="absolute top-[-100%] left-0 w-[200%] h-[200%]">
                <Image 
                  src={imgSrc} 
                  alt="Infographic BL" 
                  fill 
                  priority
                  className="object-cover" 
                />
              </div>
            </motion.div>

            {/* Bottom-Right Quadrant */}
            <motion.div
              style={{ x: q4X, y: q4Y, opacity: q4Op, scale: q4Sc }}
              className="relative overflow-hidden w-full h-full will-change-transform"
            >
              <div className="absolute top-[-100%] left-[-100%] w-[200%] h-[200%]">
                <Image 
                  src={imgSrc} 
                  alt="Infographic BR" 
                  fill 
                  priority
                  className="object-cover" 
                />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </div>
  )
}
