import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Analytics from "./pages/Analytics";
import Predictions from "./pages/Predictions";
import FinalPaper from "./pages/FinalPaper";
import AnswerBook from "./pages/AnswerBook";
import Papers from "./pages/Papers";
import AnalyzePaper from "./pages/AnalyzePaper";
import UploadPaper from "./pages/UploadPaper";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          element={<MainLayout />}
        >
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/subjects"
            element={<Subjects />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/analyze"
            element={<AnalyzePaper />}
          />

          <Route
            path="/papers"
            element={<UploadPaper />}
          />

          <Route
            path="/papers/:subjectId"
            element={<Papers />}
          />

          <Route
            path="/analytics/:subjectId"
            element={<Analytics />}
          />

          <Route
            path="/predictions/:subjectId"
            element={<Predictions />}
          />

          <Route
            path="/final-paper/:subjectId"
            element={<FinalPaper />}
          />

          <Route
            path="/answer-book/:subjectId"
            element={<AnswerBook />}
          />

          <Route
            path="/analytics"
            element={<Navigate to="/subjects" replace />}
          />

          <Route
            path="/predictions"
            element={<Navigate to="/subjects" replace />}
          />

          <Route
            path="/final-paper"
            element={<Navigate to="/subjects" replace />}
          />

          <Route
            path="/answer-book"
            element={<Navigate to="/subjects" replace />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
