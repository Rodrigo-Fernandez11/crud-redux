import "./App.css";
import { ListUsers } from "./components/ListUsers";
import { CreateNewUser } from './components/CreateNewUser';
import { Toaster } from "sonner";

function App() {
	return (
		<>
			<ListUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;