import { User, UserId, addNewUser, deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./hookStore";

// Gancho personalizado que contiene las acciones para manipular usuarios
export const useUserActions = () => {
	const dispatch = useAppDispatch(); // Obtener la función 'dispatch' del store de Redux

	// Función para agregar un nuevo usuario al store
	const addUser = ({ name, email, github }: User) => {
		dispatch(addNewUser({ name, email, github })); // Enviar la acción de agregar un nuevo usuario al store
	};

	// Función para eliminar un usuario del store
	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id)); // Enviar la acción de eliminar un usuario por su ID al store
	};

	return { addUser, removeUser }; // Devolver las funciones de agregar y eliminar usuarios
};
