"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import "react-circular-progressbar/dist/styles.css"
import BudgetModal from "./BudgetModal"
import { motion } from "framer-motion"

export const BudgetTracker = () => {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <motion.div 
      className="pb-10 grid grid-cols-1 md:grid-cols-2 md:p-16 gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-center px-5 md:m-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <CircularProgressbar 
          value={percentage}
          className="font-semibold"
          styles={buildStyles({
            pathColor: percentage >= 80 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textSize: 9,
            textColor: percentage >= 80 ? '#DC2626' : '#3B82F6',
          })}
          text={`${percentage}% Gastado`}
        />
      </motion.div>

      <div className="flex flex-col justify-center items-center mt-5 gap-6 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <AmountDisplay 
            label="Presupuesto"
            amount={state.budget}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AmountDisplay 
            label="Disponible"
            amount={remainingBudget}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <AmountDisplay 
            label="Gastado"
            amount={totalExpenses}
          />
        </motion.div>

        <motion.div
          className="flex justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <BudgetModal />
        </motion.div>

        <motion.button
          type="button"
          onClick={() => dispatch({type: 'reset-app'})}
          className="bg-red-500 w-2/3 py-3 px-2 text-white uppercase font-bold rounded-lg hover:bg-red-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Resetear App
        </motion.button>
      </div>
    </motion.div>
  )
}