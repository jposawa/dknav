import React from "react";

import { onAuthStateChanged } from "firebase/auth";
import { useAtomValue, useSetAtom } from "jotai";

import { MainNav } from "@/fragments";
import { getInitialUser } from "@/helpers";
import { useTheme } from "@/hooks";
import { firebaseAuth } from "@/lib/firebase";
import { AppRouter } from "@/pages/router";
import { currentUserAtom, isAuthenticatedAtom, isAuthLoadingAtom } from "@/states";

import styles from "./App.module.css";

const App = () => {
	const { theme } = useTheme();
	const isAuthenticated = useAtomValue(isAuthenticatedAtom);
	const setIsAuthenticated = useSetAtom(isAuthenticatedAtom);
	const setIsAuthLoading = useSetAtom(isAuthLoadingAtom);
	const setCurrentUser = useSetAtom(currentUserAtom);

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
			if (firebaseUser) {
				const cachedUser = getInitialUser();

				if (cachedUser) {
					setCurrentUser(cachedUser);
					setIsAuthenticated(true);
				}
			}

			setIsAuthLoading(false);
			unsubscribe();
		});

		return unsubscribe;
	}, [setCurrentUser, setIsAuthenticated, setIsAuthLoading]);

	return (
		<div className={`theme-${theme} ${styles.appShell}`}>
			{isAuthenticated && <MainNav />}
			<AppRouter />
		</div>
	);
};

export default App;
