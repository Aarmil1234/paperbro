import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../features/auth/pages/LoginPage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import AnalyzePapersPage from "../features/papers/pages/AnalyzePapersPage";
import PaperBankPage from "../features/papers/pages/PaperBankPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
  path="/dashboard"
  element={<DashboardPage />}
/>

<Route
  path="/dashboard/analyze"
  element={<AnalyzePapersPage />}
/>

<Route
  path="/dashboard/paper-bank"
  element={<PaperBankPage />}
/>

        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}