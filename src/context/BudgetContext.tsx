import { useReducer, createContext, useMemo } from "react"
import { BudgetActions, BudgetState, budgetReducer, initialState } from "../reducers/budget-reducer"

interface BudgetContextProps {
  state: BudgetState
  dispatch: React.Dispatch<BudgetActions>,
  totalExpenses: number,
  remainingBudget: number
}

interface BudgetProviderProps {
  children: React.ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  
  const totalExpenses = useMemo(() => state.expense.reduce(
    (total, expense) => total + expense.expenseAmount, 0
  ), [state.expense])

  const remainingBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses])


  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}