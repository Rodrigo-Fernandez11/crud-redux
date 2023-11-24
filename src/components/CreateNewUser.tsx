import { Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useState } from "react"
import { useUserActions } from "../hooks/useUserActions"

// Componente React para crear un nuevo usuario
export function CreateNewUser() {
	const { addUser } = useUserActions(); // Obtener la función addUser del hook useUserActions
	const [result, setResult] = useState<"ok" | "ko" | null>(null); // Estado para el resultado de la creación del usuario

	// Manejador de envío del formulario para agregar un nuevo usuario
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // Evitar el comportamiento por defecto del formulario

		setResult(null); // Reiniciar el resultado

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			// Validación de campos
			return setResult("ko"); // Establecer el resultado como error si faltan campos
		}

		addUser({ name, email, github }); // Llamar a la acción addUser para agregar el nuevo usuario
		setResult("ok"); // Establecer el resultado como éxito
		form.reset(); // Reiniciar el formulario después de agregar el usuario
	};

	return (
		<Card style={{ marginTop: "16px" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit} className="">
				<TextInput name="name" placeholder="Aquí el nombre" />
				<TextInput name="email" placeholder="Aquí el email" />
				<TextInput name="github" placeholder="Aquí el usuario de GitHub" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Crear usuario
					</Button>
					<span>
						{result === "ok" && (
							<Badge color='green'>Guardado correctamente</Badge>
						)}
						{result === "ko" && <Badge color='red'>Error con los campos</Badge>}
					</span>
				</div>
			</form>
		</Card>
	)
}
