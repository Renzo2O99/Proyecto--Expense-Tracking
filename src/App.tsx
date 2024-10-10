"use client"

import { useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpenseList } from "./components/ExpenseList"
import { FilterByCategory } from "./components/FilterByCategory"
import BudgetModal from "./components/BudgetModal"

function App() {
  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expense))
  }, [state])

  return (
    <div className="relative min-h-screen">
      <motion.header 
        className={`${isValidBudget ? 'bg-blue-600' : 'glass-header absolute top-0 left-0 right-0 z-10' }`}

        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className={`uppercase text-center px-8 py-8 font-black text-2xl text-white md:p-8 md:text-4xl`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Planificador de Gastos
        </motion.h1>
      </motion.header>

      <motion.div 
        className={`relative bg-white shadow-lg ${isValidBudget ? 'mt-10 rounded-lg md:mx-16 md:my-10' : 'background-home min-h-screen flex items-center justify-center'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {isValidBudget ? <BudgetTracker /> : <BudgetModal />}
      </motion.div>

      <AnimatePresence>
        {isValidBudget && (
          <motion.main 
            className="max-w-3xl mx-auto py-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AnimatePresence>
              {state.expense.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FilterByCategory />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <ExpenseList />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <ExpenseModal />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App