import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export const BudgetForm = () => {

  const [budget, setBudget] = useState<number>(0)
  const { state, dispatch } = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    state.budget === 0 ? dispatch({type: 'add-budget', payload: {budget}}) : 
    dispatch({ type: 'update-budget', payload: { budgetUpdate: budget } });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-xs mx-auto space-y-5">
      <div className="flex flex-col space-y-8">
        <label htmlFor="budget" className="text-2xl text-blue-600 font-bold text-center pb-4 md:text-3xl">
          {state.budget === 0 ? 'Defina el monto inicial' : 'Actualice el monto'}
        </label>

        <input 
          id="budget"
          name="budget"
          type="number"
          value={budget === 0 ? "" : budget}
          onChange={handleChange}
          className="w-[95%] mx-auto bg-white border-2 border-gray-200 rounded-md p-2 mt-12 text-center"
          min="0"
          placeholder={state.budget === 0 ? "Defina su presupuesto" : "Actualice su presupuesto"}
        />
      </div>

      <input 
        type="submit"
        disabled={isValid}
        value={state.budget === 0 ? "Añadir Presupuesto" : "Actualizar Presupuesto"}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer p-2 text-white font-black uppercase rounded-lg disabled:opacity-50"
      />
    </form>
  )
}
