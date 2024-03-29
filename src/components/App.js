import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import WelcomeContent from './welcome/WelcomeContent';
import LoginContent from './login/LoginContent';
import SignUpContent from "./signup/SignUpContent";
import { AuthProvider } from "./AuthProvider";
import SearchContent from "./search/SearchContent";
import AuthorContent from "./author/AuthorContent";
import CourseContent from "./course/CourseContent";
import StudyMapContent from "./studymap/StudyMapContent";
import WatchCourseContent from "./watch/WatchCourseContent";
import PaymentContent from "./payment/PaymentContent";
import CallContent from "./call/CallContent";
import SecuredRoute from "./SecuredRoute";
import ProfileContent from "./profile/ProfileContent";
import StudyMapCreationContent from "./studymap/StudyMapCreationContent";
import CourseCreationContent from "./course/CourseCreationContent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider style={{ minHeight: "100%" }} dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<WelcomeContent />} />
            <Route
              path="/login"
              element={<LoginContent />} />
            <Route
              path="/signup"
              element={<SignUpContent />} />
            <Route
              path="/search"
              element={<SearchContent />} />
            <Route
              path="/author/:author"
              element={<AuthorContent />} />
            <Route
              path="/course/:courseId"
              element={<CourseContent />} />
            <Route
              path="/map/:mapId"
              element={<StudyMapContent />} />
            <Route
              path="/watch/:courseId"
              element={
                <SecuredRoute>
                  <WatchCourseContent />
                </SecuredRoute>
              } />
            <Route
              path="/order"
              element={
                <SecuredRoute>
                  <PaymentContent />
                </SecuredRoute>
              } />
            <Route
              path="/call/:callId"
              element={
                <SecuredRoute>
                  <CallContent />
                </SecuredRoute>
              } />
            <Route
              path="/profile"
              element={
                <SecuredRoute>
                  <ProfileContent />
                </SecuredRoute>
              } />
            <Route
              path="/map/create"
              element={
                <SecuredRoute>
                  <StudyMapCreationContent />
                </SecuredRoute>
              } />
            <Route
              path="/course/create"
              element={
                <SecuredRoute>
                  <CourseCreationContent />
                </SecuredRoute>
              } />
          </Routes>
        </Router>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default App;
