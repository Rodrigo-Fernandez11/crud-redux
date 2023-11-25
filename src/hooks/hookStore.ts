import type { TypedUseSelectorHook } from "react-redux"; //importamos los tipos
import type { AppDispatch, RootState } from "../store"; //importamos los tipos
 // importamos useDispatch = "forma de enviar acciones" 
 // useSelector = "optener parte especifica del estado"
import { useDispatch, useSelector } from "react-redux";

//es una buena practica por que nos resuelve los errores de Typescript

// Definimos un custom hook para seleccionar parte del estado en componentes
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Definimos un custom hook para obtener la función 'dispatch' del store en componentes
export const useAppDispatch: () => AppDispatch = useDispatch;
