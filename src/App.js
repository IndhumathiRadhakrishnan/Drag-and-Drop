import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  useParams
} from "react-router-dom";
import Sidebar from './components/sidebar';
import DashBoard from './components/DashBoard';

function Routings() {
  return (
  <>
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route path="" element={<DashBoard />} />
            </Route>
          
          <Route path="/about" element={<About />} />
          <Route path="/topics" element={<Topics />} />          
        </Routes>
      </BrowserRouter>
      </>
  );
}
function App() {
  return (
    <div className="App">
      <Routings />      
    </div>
  );
}
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Topics() {

  return (
    <div>
      <h2>Topics</h2>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}

export default App;
