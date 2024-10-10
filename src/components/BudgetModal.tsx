import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import { BudgetForm } from './BudgetForm'
import { motion } from 'framer-motion'

export default function BudgetModal() {

  const { state, dispatch } = useBudget()

  return (
    <>
      {state.budget === 0 ? (
        <div className="glass-header flex items-center justify-center">
          <motion.button
            onClick={() => dispatch({type: 'show-modal-budget'})}
            className="px-6 py-2 text-lg font-semibold text-white rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}>
            Iniciar Aplicación
          </motion.button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => dispatch({type: 'show-modal-budget'})}
          className="bg-lime-500 w-2/3 mt-4 py-3 px-2 text-white uppercase font-bold rounded-lg hover:bg-lime-600">
          Añadir Monto Adicional
        </button>
      )}

      <Transition appear show={state.budgetModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => dispatch({type: 'close-modal-budget'})}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="grid items-center w-full h-[35vh] max-w-3xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all md:h-[50vh] md:w-1/2">
                  <BudgetForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}