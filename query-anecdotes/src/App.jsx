import { useContext } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useAnecdotes } from "./hooks/useAnecdotes";
import NotificationContext from "./NotificationContext";

const App = () => {
	const { setNotification } = useContext(NotificationContext);
	const { anecdotes, isPending, isError, voteAnecdote } = useAnecdotes();

	if (isPending) {
		return <div>loading data...</div>;
	} else if (isError) {
		return <div>anecdote service not available due to problems in server</div>;
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button
							onClick={() => {
								voteAnecdote(anecdote);
								setNotification(`anecdote ${anecdote.content} voted`);
								setTimeout(() => {
									setNotification(null);
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

export default App;
