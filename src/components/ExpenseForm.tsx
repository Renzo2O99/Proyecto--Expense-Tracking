import { categories } from "../data/categories"
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { ChangeEvent, useEffect, useState } from "react";
import { DraftExpense, Value } from "../types/types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export const ExpenseForm = () => {
  const [expense, setExpense] = useState<DraftExpense>({
    expenseAmount: 0,
    expenseName: '',
    expenseCategory: '',
    expenseDate: new Date()
  })

  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)
  const [previousAmount, setPreviousAmount] = useState(0)
  const [selectedOption] = useState("default");
  const { dispatch, state, remainingBudget } = useBudget()

  useEffect(() => {
      if (state.editingId) {
      const editingExpense = state.expense.filter(
        currentExpense => currentExpense.id === state.editingId
      )[0]

      setExpense(editingExpense)
      setPreviousAmount(editingExpense.expenseAmount)
    }
  }, [state.editingId, state.expense]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    const isAmountField = ['expenseAmount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? +value: value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      expenseDate: value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validación del formulario
    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios.');
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    } else if (expense.expenseAmount <= 0) {
        setError('El monto debe ser mayor que cero.');
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
        return;
    }

    // Validación del gasto:
    if ((expense.expenseAmount - previousAmount) > remainingBudget) {
      setError('El monto del gasto no puede ser mayor al presupuesto disponible.');
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    // Agregar o actualizar el gasto:
    if (state.editingId) {
      dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
    } else {
      dispatch({type: 'add-expense', payload: {expense}})
    }

    // Reiniciar el estado del formulario
    setExpense({
      expenseAmount: 0,
      expenseName: '',
      expenseCategory: '',
      expenseDate: new Date()
    })
    setPreviousAmount(0)
  }

    const handleDismiss = () => {
    setShowError(false);
  };

  return (
    <form
      className="space-y-5 md:mx-4"
      onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2 md:mx-auto md:w-1/3">
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>

      {showError && 
        <ErrorMessage
          isVisible={showError}
          onDismiss={handleDismiss}>
          {error}
        </ErrorMessage>
      }

      <div className="flex flex-col gap-2 pt-2">
        <label 
          htmlFor="expenseName"
          className="font-bold text-lg md:text-xl"
        >
          Añadir el Nombre del Gasto:
        </label>

        <input 
          type="text" 
          id="expenseName"
          name="expenseName"
          onChange={handleChange}
          value={expense.expenseName}
          placeholder="Agregue un nombre..."
          className="bg-slate-100 p-2"
        />
      </div>

      <div className="flex flex-col justify-center gap-2 pt-2 md:pt-5">
        <label 
          htmlFor="expenseAmount"
          className="font-bold text-lg md:text-xl"
        >
          Añadir el Monto del Gasto:
        </label>

        <input 
          type="number" 
          id="expenseAmount"
          name="expenseAmount"
          onChange={handleChange}
          value={expense.expenseAmount === 0 ? '' : expense.expenseAmount}
          className="bg-slate-100 p-2"
          placeholder="Agregue una cantidad..."
        />
      </div>

      <div className="flex flex-col gap-2 pt-2 md:pt-5">
        <label 
          htmlFor="expenseCategory"
          className="font-bold text-lg md:text-xl"
        >
          Añadir la Categoría del Gasto:
        </label>

        <select 
          id="expenseCategory"
          name="expenseCategory"
          className="bg-slate-100 p-2"
          value={expense.expenseCategory === '' ? selectedOption : expense.expenseCategory}
          onChange={handleChange}>
          <option
            disabled 
            value={"default"}>
            --&gt; Seleccione una Categoría &lt;--
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            )
          )}
        </select>
      </div>

      <div className="flex flex-col justify-center gap-2 pt-2 md:pt-5">
        <label 
          htmlFor="expenseAmount"
          className="font-bold text-lg md:text-xl"
        >
          Añadir la Fecha del Gasto:
        </label>

        <DatePicker 
          id="expenseDate"
          name="expenseAmount"
          onChange={handleChangeDate}
          value={expense.expenseDate}
          className="bg-slate-100 p-1 border-0"
        />
      </div>

      <div className="grid justify-center md:justify-normal pt-2 md:pt-5">
        <input 
          value={state.editingId ? 'Registrar Cambios' : 'Actualizar Registro'}
          type="submit"
          className="mx-auto bg-blue-600 cursor-pointer p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-700 md:w-1/2" 
        />
      </div>

    </form>
  )
}
