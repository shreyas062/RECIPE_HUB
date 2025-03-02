import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import "./App.css"; // Import CSS file
import RecipeList from "./components/RecipeList"; // Import RecipeList

// Lazy Load Components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Signup = lazy(() => import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const CreateRecipe = lazy(() => import("./pages/CreateRecipe"));
const RecipeDetails = lazy(() => import("./pages/RecipeDetails"));

function App() {
  return (
    <Router>
      <Navbar /> {/* Place Navbar outside Suspense and Routes */}
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
