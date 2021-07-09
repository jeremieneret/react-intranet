import Navbar from './components/Navbar';
import Home from './views/Home';
import List from './views/List';
import Create from './views/Create';
import Edit from './views/Edit';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />

      <Route path='/' component={Home} exact />
      <Route path='/list' component={List} />
      <Route path='/create' component={Create} />
      <Route path='/edit/:id' component={Edit} />
    </Router>
  );
}

export default App;
