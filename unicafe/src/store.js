import { create } from "zustand";

export const useFeedbackStore = create((set) => ({
	good: 0,
	neutral: 0,
	bad: 0,
	actions: {
		incrementGood: () => set((state) => ({ good: state.good + 1 })),
		incrementNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
		incrementBad: () => set((state) => ({ bad: state.bad + 1 })),
	},
}));

export const useFeedbackStats = () => {
	const good = useFeedbackStore((state) => state.good);
	const neutral = useFeedbackStore((state) => state.neutral);
	const bad = useFeedbackStore((state) => state.bad);

	const all = good + neutral + bad;
	const average = all === 0 ? 0 : (good - bad) / all;
	const positive = all === 0 ? 0 : (good / all) * 100;

	return { all, average, positive };
};
