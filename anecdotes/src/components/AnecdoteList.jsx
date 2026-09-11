import { useNotificationActions } from "../notificationStore";
import { useAnecdoteActions, useAnecdotes } from "../store";

const AnecdoteList = () => {
	const anecdotes = useAnecdotes();
	const { setMessage } = useNotificationActions();

	const { vote, remove } = useAnecdoteActions();
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => {
								vote(anecdote.id);
								setMessage(`you voted '${anecdote.content}'`);
								setTimeout(() => {
									setMessage(null);
								}, 5000);
							}}
						>
							vote
						</button>
						{anecdote.votes === 0 && (
							<button onClick={() => remove(anecdote.id)}>delete</button>
						)}
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
