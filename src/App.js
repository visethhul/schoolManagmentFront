//import logo from './logo.svg';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AboutPage from "./pages/aboutPage";
import MainLayout from "./components/layout/mainLayout";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
//import LoginLayout from './components/layout/loginLayout'
import ProtectedRoute from "./utils/ProtectedRoute";
import DashBoard from "./pages/DashBoardPage";
import TeachersTable from "./pages/teachers/teacherPage";
//import ErrorBoundary from './utils/ErrorBoundary';
import LoginLayout1 from "./components/layout/loginLayout1";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<LoginLayout1 />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <TeachersTable />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
