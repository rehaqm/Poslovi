import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { CreateJob } from "./pages/create-job";
import { SavedJobs } from "./pages/saved-jobs";
import { Auth } from "./pages/auth";
import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/create-job" element={<CreateJob />}></Route>
          <Route path="/saved-jobs" element={<SavedJobs />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
