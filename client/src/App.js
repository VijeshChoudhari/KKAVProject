
import './App.css';
import {Outlet,Link} from 'react-router-dom';


function App() {
  return (
  <>
  
   <nav>
   <Link to="/">Logo</Link> | {" "}
   <Link to="/login">Login</Link> | {" "}
    <Link to="/signup">Register</Link>
   </nav>
   <Outlet/>

    
  </>
  );
}

export default App;
