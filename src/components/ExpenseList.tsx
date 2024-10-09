import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseItem } from "./ExpenseItem"

export const ExpenseList = () => {
  const { state } = useBudget()

  
  const filteredExpenses = state.currentCategory ? state.expense.filter(
    expense => expense.expenseCategory === state.currentCategory 
  ) : state.expense
  
  const isEmpty = useMemo(() => filteredExpenses.length === 0, [state.expense])

  return (
    <div className="bg-white shadow-lg rounded-lg py-10 px-4 mt-10">
      {isEmpty ? 
        <p className="text-center text-gray-600 text-2xl font-bold">No se encontraron gastos...</p> 
        : (
          <>
            <p className="text-center text-gray-600 text-2xl font-bold mb-5">
              {filteredExpenses.length === 0 ? `No se han encontrado gastos relacionados` : 'Listado de Gastos'}
            </p>

            {filteredExpenses.map(expenseItem => (
              <ExpenseItem 
                key={expenseItem.id}
                expense={expenseItem}
              />
            ))}
          </>
        )}
    </div>
  )
}
