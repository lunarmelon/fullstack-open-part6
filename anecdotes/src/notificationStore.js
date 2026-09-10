import { create } from "zustand";

const useNotificationStore = create((set) => ({
	message: null,
	actions: {
		setMessage: (value) => set(() => ({ message: value })),
	},
}));

export const useNotificationActions = () =>
	useNotificationStore((state) => state.actions);
export const useNotification = () =>
	useNotificationStore((state) => state.message);
