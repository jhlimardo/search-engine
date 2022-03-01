import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MoviesList from "./components/Home";
import MovieDetail from "./components/Detail";
import Landing from "./components/Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<MoviesList />} />
        <Route path="/home/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
