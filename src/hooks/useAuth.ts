import React from "react";

import { GoogleAuthProvider, signInWithPopup, signOut, type User as FirebaseUser } from "firebase/auth";
import { useAtom, useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";

import { DEFAULT_ROUTE, ROUTES, STORAGE_KEY } from "@/constants";
import { loadStorage, removeStorage, saveStorage } from "@/helpers";
import { firebaseAuth } from "@/lib/firebase";
import { currentUserAtom, isAuthenticatedAtom, isAuthLoadingAtom } from "@/states";
import type { User } from "@/types";

import { useDatabase } from "./useDatabase";

const googleProvider = new GoogleAuthProvider();

type UseAuthOptions = {
	authedRoute?: boolean;
};

const extractUserFromFirebase = (firebaseUser: FirebaseUser): User => ({
	id: firebaseUser.uid,
	email: firebaseUser.email ?? "",
	fullName: firebaseUser.displayName ?? "",
	displayName: firebaseUser.displayName ?? undefined,
	isActive: true,
	isVerified: firebaseUser.emailVerified,
	createdAt: new Date(),
	updatedAt: new Date(),
});

export const useAuth = ({ authedRoute = false }: UseAuthOptions = {}) => {
	const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
	const isAuthLoading = useAtomValue(isAuthLoadingAtom);
	const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
	const navigate = useNavigate();
	const { saveData, getData } = useDatabase();

	React.useEffect(() => {
		if (authedRoute && !isAuthLoading && !isAuthenticated) {
			navigate(ROUTES.LOGIN.path, { replace: true });
		}
	}, [authedRoute, isAuthLoading, isAuthenticated, navigate]);

	React.useEffect(() => {
		if (currentUser?.id) {
			return;
		}

		const storedUser = loadStorage<User>(STORAGE_KEY.USER, {
			needParse: true,
			isPersistent: true,
		});

		if (storedUser?.id) {
			setCurrentUser(storedUser);
			setIsAuthenticated(true);
		}
	}, [currentUser?.id, setCurrentUser, setIsAuthenticated]);

	const insertUserToDatabase = React.useCallback(
		async (user: User) => {
			await saveData(`users/${user.id}`, {
				id: user.id,
				email: user.email,
				fullName: user.fullName,
				displayName: user.displayName ?? user.fullName,
				isActive: user.isActive ?? true,
				isVerified: user.isVerified ?? false,
			});
		},
		[saveData],
	);

	const signInWithGoogle = React.useCallback(async (): Promise<void> => {
		const result = await signInWithPopup(firebaseAuth, googleProvider);

		if (!result.user) {
			return;
		}

		const firebaseUser = result.user;
		const existingUser = await getData<User>(`users/${firebaseUser.uid}`);

		const resolvedUser: User = existingUser?.id
			? existingUser
			: extractUserFromFirebase(firebaseUser);

		if (!existingUser?.id) {
			await insertUserToDatabase(resolvedUser);
		}

		setCurrentUser(resolvedUser);
		saveStorage(STORAGE_KEY.USER, resolvedUser, { needParse: true, isPersistent: true });
		setIsAuthenticated(true);
		navigate(DEFAULT_ROUTE.authenticated, { replace: true });
	}, [getData, insertUserToDatabase, navigate, setCurrentUser, setIsAuthenticated]);

	const logout = React.useCallback(() => {
		signOut(firebaseAuth)
			.then(() => {
				setIsAuthenticated(false);
				setCurrentUser(null);
				removeStorage(STORAGE_KEY.USER, true);
				navigate(DEFAULT_ROUTE.unauthenticated, { replace: true });
			})
			.catch((error) => {
				console.error("[useAuth] Error signing out:", error);
			});
	}, [navigate, setCurrentUser, setIsAuthenticated]);

	return { isAuthenticated, logout, signInWithGoogle };
};
