'use client';

import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';
import { CartItem, DeviceModel } from '../types';

type State = {
  items: CartItem[];
  deviceModel: DeviceModel | null;
  brandName: string;
};

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR' }
  | { type: 'SET_DEVICE'; payload: { model: DeviceModel; brandName: string } }
  | { type: 'HYDRATE'; payload: State };

const initialState: State = {
  items: [],
  deviceModel: null,
  brandName: '',
};

const STORAGE_KEY = 'cart_state';

function loadFromStorage(): State {
  if (typeof window === 'undefined') return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as State) : initialState;
  } catch {
    return initialState;
  }
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    case 'CLEAR':
      return initialState;
    case 'SET_DEVICE':
      return {
        ...state,
        deviceModel: action.payload.model,
        brandName: action.payload.brandName,
      };
    default:
      return state;
  }
}

type CartContextValue = State & {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setDevice: (model: DeviceModel, brandName: string) => void;
  subtotal: number;
  discount: number;
  locationFee: number;
  total: (atendimento?: 'LOJA' | 'LOCAL') => number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const MULTI_DISCOUNT = 0.05;
const LOCATION_FEE = 0.07;
const MIN_SERVICES_DISCOUNT = 2;

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hidrata a partir do localStorage na montagem inicial
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved.items.length > 0 || saved.deviceModel) {
      dispatch({ type: 'HYDRATE', payload: saved });
    }
  }, []);

  // Persiste no localStorage sempre que o estado mudar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((sum, item) => sum + item.price, 0),
    [state.items]
  );

  const discount = useMemo(
    () =>
      state.items.length >= MIN_SERVICES_DISCOUNT
        ? subtotal * MULTI_DISCOUNT
        : 0,
    [state.items.length, subtotal]
  );

  const locationFee = useMemo(
    () => (subtotal - discount) * LOCATION_FEE,
    [subtotal, discount]
  );

  const total = (atendimento: 'LOJA' | 'LOCAL' = 'LOJA') => {
    const base = subtotal - discount;
    return atendimento === 'LOCAL' ? base + locationFee : base;
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        clearCart: () => dispatch({ type: 'CLEAR' }),
        setDevice: (model, brandName) =>
          dispatch({ type: 'SET_DEVICE', payload: { model, brandName } }),
        subtotal,
        discount,
        locationFee,
        total,
        itemCount: state.items.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
