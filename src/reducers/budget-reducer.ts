import { v4 as uuidv4 } from 'uuid';
import { Category, DraftExpense, Expense } from "../types/types";

export type BudgetActions =
  | { type: 'add-budget', payload: { budget: number } }
  | { type: 'update-budget', payload: { budgetUpdate: number } }
  | { type: 'show-modal-budget' }
  | { type: 'close-modal-budget' }
  | { type: 'show-modal' }
  | { type: 'close-modal' }
  | { type: 'add-expense', payload: { expense: DraftExpense } }
  | { type: 'remove-expense', payload: { id: Expense['id'] } }
  | { type: 'get-expense-id', payload: { id: Expense['id'] } }
  | { type: 'update-expense', payload: { expense: Expense } }
  | { type: 'reset-app' }
  | { type: 'add-filter-category', payload: {id: Category['id']} }

export interface BudgetState {
  budget: number;
  modal: boolean;
  budgetModal: boolean;
  expense: Expense[];
  editingId: Expense['id'];
  currentCategory: Category['id']
}

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget')
  return localStorageBudget ? +localStorageBudget : 0
}

const localStorageExpense = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses')
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  budgetModal: false,
  expense: localStorageExpense(),
  editingId: '',
  currentCategory: ''
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
) => {
  if (action.type === 'add-budget') {
    return {
      ...state,
      budget: action.payload.budget,
      budgetModal: false
    };
  }

  if (action.type === 'update-budget') {
    return {
      ...state,
      budget: state.budget + action.payload.budgetUpdate, // Actualiza el presupuesto original
      budgetModal: false,
    };
  }

  if (action.type === 'show-modal-budget') {
    return {
      ...state,
      budgetModal: true,
    };
  }

  if (action.type === 'close-modal-budget') {
    return {
      ...state,
      budgetModal: false,
      editingId: ''
    };
  }

  if (action.type === 'show-modal') {
    return {
      ...state,
      modal: true,
    };
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      editingId: ''
    };
  }

  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense);

    return {
      ...state,
      expense: [...state.expense, expense],
      modal: false,
    };
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expense: state.expense.filter(
        expense => expense.id !== action.payload.id
      ),
    };
  }

  if (action.type === 'get-expense-id') {
    return {
      ...state,
      editingId: action.payload.id,
      modal: true,
    };
  }

  if (action.type === 'update-expense') {
    return {
      ...state,
      expense: state.expense.map(
        expenseItem => expenseItem.id === action.payload.expense.id ? action.payload.expense : expenseItem
      ),
      modal: false,
      editingId: ''
    };
  }

  if (action.type === 'reset-app') {
    return {
      ...state,
      budget: 0,
      expense: []
    }
  }

  if (action.type === 'add-filter-category') {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }

  return state;
};
