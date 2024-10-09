import { useEffect, useMemo } from "react"
import { BudgetForm } from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import { BudgetTracker } from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import { ExpenseList } from "./components/ExpenseList"
import { FilterByCategory } from "./components/FilterByCategory"

function App() {

  const { state } = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expense))
  }, [state])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center px-8 font-black text-2xl text-white md:p-0 md:text-4xl">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10 py-10 md:p-10">
        {isValidBudget ? <BudgetTracker />  : <BudgetForm/>}
        
      </div>

      {isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  )
}

export default App
