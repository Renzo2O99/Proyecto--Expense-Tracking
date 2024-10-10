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
          className="flex-1 bg-slate-100 p-3 w-full text-md md:text-lg rounded-lg border-2 border-gray-300 focus:border-purple-900 focus:ring focus:ring-purple-200 focus-visible:outline-none transition duration-200"
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