import { ChangeEvent } from "react"
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {
  const { dispatch } = useBudget()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type: 'add-filter-category', payload: {id: e.target.value}
    })
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-10"> 
      <form>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <label 
            className="text-center text-gray-600 text-2xl font-bold"
            htmlFor="category">
            Filtrar Gastos
          </label>

          <select 
          onChange={handleChange}
          className="bg-slate-100 p-3 flex-1 rounded"
          id="category">
            <option className="text-center" value="">
              --&gt; Todas las categorías &lt;--
            </option>

            {categories.map(category => (
              <option 
                key={category.id}
                value={category.id}>
                {category.name}
              </option>
            )
            )}
          </select>
        </div>
      </form>
    </div>
  )
}
