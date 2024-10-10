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

  const budgetState = state.budget === 0 ? true : false

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    budgetState ? dispatch({type: 'add-budget', payload: {budget}}) : 
    dispatch({ type: 'update-budget', payload: { budgetUpdate: budget } });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-xs mx-auto space-y-5">
      <div className="flex items-center justify-center">
        <div className="bg-white overflow-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-8">
            {budgetState ? 'Ingrese su presupuesto' : 'Ingrese el monto adicional'}
          </h2>

          <div className="space-y-5">
            <label 
              htmlFor="presupuesto" 
              className="block text-sm font-medium text-gray-700">
              {budgetState ? 'Defina el monto inicial' : 'Actualice el monto'}
            </label>

            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                $
              </span>

              <input
                required
                type="number"
                id="presupuesto"
                onChange={handleChange}
                placeholder={budgetState ? "Defina su presupuesto" : "Actualice su presupuesto"}
                className="pl-6 md:pl-8 pr-4 py-2 w-full text-md md:text-lg rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:ring focus:ring-purple-200 focus-visible:outline-none transition duration-200"
              />
            </div>

            <input
              type="submit"
              disabled={isValid}
              value={budgetState ? "Añadir Presupuesto" : "Actualizar Presupuesto"}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg mt-6 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"></input>
          </div>
        </div>
      </div>
    </form>
  )
}
