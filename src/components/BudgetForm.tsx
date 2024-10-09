import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export const BudgetForm = () => {

  const [budget, setBudget] = useState<number>(0)
  const { dispatch } = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch({
      type: 'add-budget',
      payload: {budget}
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-xs mx-auto space-y-5">
      <div className="flex flex-col space-y-5">
        <label htmlFor="budget" className="text-2xl text-blue-600 font-bold text-center md:text-3xl">
          Defina el monto inicial
        </label>

        <input 
          id="budget"
          name="budget"
          type="number"
          value={budget === 0 ? "" : budget}
          onChange={handleChange}
          className="w-[95%] mx-auto bg-white border-2 border-gray-200 rounded-md p-2"
          placeholder="Defina su presupuesto"
        />
      </div>

      <input 
        type="submit"
        disabled={isValid}
        value="Definir Presupuesto"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black uppercase rounded-lg disabled:opacity-50"
      />

      <p className="overflow-hidden text-center mt-10 font-black text-4xl">
        {budget}
      </p>
    </form>
  )
}
