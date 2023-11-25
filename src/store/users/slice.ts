import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Definimos un array de usuarios por defecto
const DEFAULT_STATE = [
  {
    id: "1",
    name: "Yazman Rodriguez",
    email: "yazmanito@gmail.com",
    github: "yazmanito",
  },
  // ... otros usuarios ...
];

// Definimos tipos para identificador de usuario y para la información del usuario
export type UserId = string;

export interface User {
  name: string;
  email: string;
  github: string;
}

export interface UserWithId extends User {
  id: UserId;
}

// Inicializamos el estado con datos almacenados en localStorage si existen, de lo contrario, usamos el DEFAULT_STATE
const initialState: UserWithId[] = (() => {
  // Obtenemos los datos del localStorage o utilizamos DEFAULT_STATE si no hay datos
  const persistedState = localStorage.getItem("__redux__state__");
  return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

// Creamos un slice llamado 'usersSlice' utilizando la función createSlice de Redux Toolkit

export const usersSlice = createSlice({
  name: "users", // Nombre del slice para organizar en la store
  initialState, // Estado inicial del slice
  reducers: {

    // Reducer para añadir un nuevo usuario
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID(); // Generamos un ID único para el nuevo usuario
      return [...state, { id, ...action.payload }]; // Devolvemos un nuevo estado con el usuario agregado
    },

    // Reducer para eliminar un usuario por su ID
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id); // Devolvemos un nuevo estado filtrando el usuario por ID
    },

    // Reducer para deshacer (rollback) la eliminación de un usuario
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      );
      if (!isUserAlreadyDefined) {
        return [...state, action.payload]; // Si el usuario no existe, lo añadimos al estado
      }
      return state; // Devolvemos el estado actual si el usuario ya está definido
    },
  },
});

// Exportamos el reducer por defecto y las acciones específicas para ser usadas en otros módulos
export default usersSlice.reducer;
export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
