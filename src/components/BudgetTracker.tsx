import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import { useBudget } from "../hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import "react-circular-progressbar/dist/styles.css"

export const BudgetTracker = () => {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: percentage >= 80 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentage >= 80 ? '#DC2626' : '#3B82F6',
          })}
          text={`${percentage}% Gastado`}
        />
      </div>

      <div className="flex flex-col justify-center items-center mt-5 gap-5 md:mt-0">
        <AmountDisplay 
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay 
          label="Disponible"
          amount={remainingBudget}
        />

        <AmountDisplay 
          label="Gastado"
          amount={totalExpenses}
        />

        <button
          type="button"
          onClick={() => dispatch({type: 'reset-app'})}
          className="bg-red-500 w-2/3 py-3 px-2 text-white uppercase font-bold rounded-lg hover:bg-red-600"
          >
          Resetear App
        </button>
      </div>
    </div>
  )
}
