import { useAtomValue } from "jotai";
import { Navigate, Route, Routes } from "react-router-dom";

import { DEFAULT_ROUTE, ROUTES } from "@/constants";
import { Login } from "@/pages/Login";
import { Modules } from "@/pages/Modules";
import { Profile } from "@/pages/Profile";
import { Register } from "@/pages/Register";
import { isAuthenticatedAtom } from "@/states";

export const AppRouter = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const defaultRoute = isAuthenticated
    ? DEFAULT_ROUTE.authenticated
    : DEFAULT_ROUTE.unauthenticated;

  return (
    <Routes>
      <Route path={ROUTES.LOGIN.path} element={<Login />} />
      <Route path={ROUTES.REGISTER.path} element={<Register />} />
      <Route path={ROUTES.PROFILE.path} element={<Profile />} />
      <Route path={ROUTES.MODULES.path} element={<Modules />} />
      <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </Routes>
  );
};
