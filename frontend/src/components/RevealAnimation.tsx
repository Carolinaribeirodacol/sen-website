'use client'

import { ReactNode, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

type Props = {
  children: ReactNode
  className?: string
}

const revealVariants = {
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeIn' } },
  hidden: { y: 75, opacity: 0 }
}

export const RevealAnimation = ({ children, ...props }: Props) => {
  const ref = useRef(null)
  const inView = useInView(ref)
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);


  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={revealVariants}
      {...props}
    >
      {children}
    </motion.div>
  )
}