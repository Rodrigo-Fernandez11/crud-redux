import { configureStore, Middleware } from "@reduxjs/toolkit";
import { toast } from 'sonner'; // Imagina 'sonner' como un servicio de notificaciones

import usersReducer, { rollbackUser } from "./users/slice"; // Importamos el reducer y acciones del slice de usuarios

// Middleware para persistir el estado en localStorage
const persistenceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
	next(action); // Procesamos la acción antes de guardarla en localStorage
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState())); // Guardamos el estado en localStorage después de cada acción
};

// Middleware para sincronizar cambios con una base de datos simulada
const syncWithDatabaseMiddleware: Middleware = store => next => action => {
	const { type, payload } = action;
	const previousState = store.getState() as RootState;
	next(action); // Procesamos la acción

	if (type === 'users/deleteUserById') { // Verificamos si se eliminó un usuario
		const userIdToRemove = payload;
		const userToRemove = previousState.users.find(user => user.id === userIdToRemove);

		// Simulamos una petición DELETE a una API para eliminar un usuario
		fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
			method: 'DELETE'
		})
			.then(res => {
				// En un entorno real, verificaríamos si la eliminación fue exitosa y mostraríamos una notificación
				// if (res.ok) {
				// 	toast.success(`Usuario ${payload} eliminado correctamente`)
				// }
				throw new Error('Error al eliminar el usuario');
			})
			.catch(err => {
				// Si falla la eliminación en la base de datos simulada, mostramos una notificación y deshacemos la acción
				toast.error(`Error deleting user ${userIdToRemove}`);
				if (userToRemove) store.dispatch(rollbackUser(userToRemove)); // Deshacemos la eliminación en el estado local
				console.log(err);
			});
	}
};

// Configuramos el store de Redux
export const store = configureStore({
	reducer: {
		users: usersReducer, // Agregamos el reducer del slice de usuarios al store
	},
	middleware: [persistenceLocalStorageMiddleware, syncWithDatabaseMiddleware], // Añadimos los middlewares al store
});

// Definimos tipos para acceder al estado y dispatch del store en toda la aplicación
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
