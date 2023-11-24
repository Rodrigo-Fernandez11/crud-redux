import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";

// Definimos un gancho personalizado para seleccionar parte del estado en componentes de React
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Definimos un gancho personalizado para obtener la función 'dispatch' del store en componentes de React
export const useAppDispatch: () => AppDispatch = useDispatch;
