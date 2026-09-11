import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./services/anecdote", () => ({
	default: {
		getAll: vi.fn(),
		createNew: vi.fn(),
		update: vi.fn(),
	},
}));

import AnecdoteList from "./components/AnecdoteList";
import anecdoteService from "./services/anecdote";
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from "./store";

beforeEach(() => {
	useAnecdoteStore.setState({ anecdotes: [], filter: "" });
	vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
	it("initialize loads anecdotes from service", async () => {
		const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
		anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

		const { result } = renderHook(() => useAnecdoteActions());

		await act(async () => {
			await result.current.initialize();
		});

		const { result: anecdotesResult } = renderHook(() => useAnecdotes());
		expect(anecdotesResult.current).toEqual(mockAnecdotes);
	});

	it("voting increases the number of votes of an anecdote", async () => {
		const mockAnecdote = { id: 1, content: "testing vote", votes: 10 };
		useAnecdoteStore.setState({ anecdotes: [mockAnecdote] });
		anecdoteService.update.mockResolvedValue({ ...mockAnecdote, votes: 11 });

		const { result } = renderHook(() => useAnecdoteActions());

		await act(async () => {
			await result.current.vote(1);
		});

		const { result: anecdoteResult } = renderHook(() => useAnecdotes());
		expect(anecdoteResult.current[0].votes).toBe(11);
	});
});

describe("useAnecdotes", () => {
	const anecdotes = [
		{ id: 1, content: "A", votes: 11 },
		{ id: 2, content: "B", votes: 3 },
		{ id: 3, content: "C", votes: 39 },
	];

	beforeEach(() => {
		useAnecdoteStore.setState({ anecdotes });
	});

	it("anecdotes load from service sorted by votes", async () => {
		const { result } = renderHook(() => useAnecdotes());

		await waitFor(() => {
			expect(result.current).toHaveLength(3);
		});

		expect(result.current[0].content).toBe("C");
		expect(result.current[1].content).toBe("A");
		expect(result.current[2].content).toBe("B");
	});
});

describe("useAnecdotes filtering", () => {
	const anecdotes = [
		{ id: 1, content: "Testing a note", votes: 11 },
		{ id: 2, content: "Voting a note", votes: 3 },
		{ id: 3, content: "Law", votes: 39 },
	];

	beforeEach(() => {
		useAnecdoteStore.setState({ anecdotes });
	});

	it("returns all notes with no filter", () => {
		const { result } = renderHook(() => useAnecdotes());
		expect(result.current).toHaveLength(3);
	});

	it("filters important notes", () => {
		useAnecdoteStore.setState({ anecdotes, filter: "note" });
		const { result } = renderHook(() => useAnecdotes());
		expect(result.current).toHaveLength(2);
	});
});
