import { useContext } from "react";
import { useAnecdotes } from "../hooks/useAnecdotes";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
	const { addAnecdote: addAnecdoteToServer } = useAnecdotes();
	const { setNotification } = useContext(NotificationContext);

	const onCreate = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.reset();
		if (content.length < 5) {
			setNotification("too short anecdote, must have length 5 or more");
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		} else {
			addAnecdoteToServer(content);
			setNotification(`anecdote ${content} created`);
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
