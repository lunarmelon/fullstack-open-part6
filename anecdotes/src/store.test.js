import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./services/anecdote", () => ({
	default: {
		getAll: vi.fn(),
		createNew: vi.fn(),
		update: vi.fn(),
	},
}));

import anecdoteService from "./services/anecdote";
import useAnecdoteStore, {
	useAnecdoteActions,
	useAnecdotes,
	useFilter,
} from "./store";

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
