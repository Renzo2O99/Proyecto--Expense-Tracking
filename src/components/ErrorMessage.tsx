'use client'

import { PropsWithChildren, useEffect } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"

interface ErrorMessageProps extends PropsWithChildren {
  isVisible: boolean;
  onDismiss: () => void;
}

export function ErrorMessage({ children, isVisible, onDismiss }: ErrorMessageProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({ opacity: 1, y: 0 });

      const timer = setTimeout(() => {
        controls.start({ opacity: 0, y: -10 }).then(() => {
          onDismiss(); // Llama a onDismiss después de que la animación de salida termine
        });
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, controls, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={controls}
          exit={{ opacity: 0, y: -10 }} // Mantener la misma animación de salida
          transition={{ duration: 0.5 }} // Asegúrate de que la duración sea suficiente
          className="absolute top-0 left-0 right-0 z-10"
        >
          <div className="bg-red-600 p-2 text-white font-bold text-sm text-center rounded shadow-md">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
