import { useNotificationActions } from "../notificationStore";
import { useAnecdoteActions, useAnecdotes } from "../store";

const AnecdoteList = () => {
	const anecdotes = useAnecdotes();
	const { setMessage } = useNotificationActions();
	const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

	const { vote } = useAnecdoteActions();
	return (
		<div>
			{sortedAnecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => {
								vote(anecdote.id);
								setMessage(`You voted "${anecdote.content}"`);
								setTimeout(() => {
									setMessage(null);
								}, 5000);
							}}
						>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
