import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
	const getId = () => (100000 * Math.random()).toFixed(0);

	const { add } = useAnecdoteActions();

	const addAnecdote = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		add({ id: getId(), content, votes: 0 });
		e.target.reset();
	};

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name="anecdote" data-testid="new" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
