import { useMemo } from "react"
import { formatDate } from "../helpers"
import { Expense } from "../types/types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../data/categories"
import 'react-swipeable-list/dist/styles.css'
import { LeadingActions, SwipeAction, SwipeableList, SwipeableListItem, TrailingActions } from "react-swipeable-list"
import { useBudget } from "../hooks/useBudget"
import { Edit2, Trash2 } from "lucide-react"

interface ExpenseItemProps {
  expense: Expense
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const { dispatch } = useBudget()

  const categoryInfo = useMemo(() => categories.find(
    cat => cat.id === expense.expenseCategory
  ), [expense.expenseCategory])
  
  const handleUpdate = () => {
    dispatch({
      type: 'get-expense-id',
      payload: {id: expense.id}
    })
  }

  const handleDelete = () => {
    dispatch({
      type: 'remove-expense',
      payload: {id: expense.id}
    })
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleUpdate}>
        <div className="flex items-center justify-center h-full bg-blue-500 text-white">
          <Edit2 size={24} />
        </div>
      </SwipeAction>
    </LeadingActions>
  )
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={handleDelete} destructive={true}>
        <div className="flex items-center justify-center h-full bg-red-500 text-white">
          <Trash2 size={24} />
        </div>
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList threshold={0.5}>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <div className="relative space-y-4 flex items-center px-4 gap-4 sm:gap-5 bg-white shadow-md py-5 rounded-lg my-2 w-full border-b border-gray-200">
          <div className="flex-shrink-0">
            <img
              src={`/icono_${categoryInfo?.icon}.svg`} 
              alt={`Ícono Gasto ${categoryInfo?.name}`}
              className="w-12 sm:w-16" 
            />
          </div>

          <div className="flex-1 min-w-0 pr-16 sm:pr-20">
            <p className="text-sm sm:text-base font-bold uppercase text-slate-500 truncate mb-1">
              {categoryInfo?.name}
            </p>

            <p className="text-base sm:text-lg font-medium truncate mb-2">
              {expense.expenseName}
            </p>

            <p className="text-slate-600 text-sm sm:text-base">
              {formatDate(expense.expenseDate!.toString())}
            </p>
          </div>

          <div className="absolute top-1/4 right-9 sm:top-6 sm:right-6">
            <AmountDisplay
              amount={expense.expenseAmount}
            />
          </div>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}