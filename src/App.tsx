import Homepage from './pages/Homepage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Product from './pages/Product';
import Category from './pages/Category';
import Search from './pages/Search';
import Register from './pages/Register';
import Add from './pages/Add';
import Header from './pages/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  const HomepageProps = {
    title: 'Homepage',
    element: <Homepage/>,
    path: '/'
  };

  const LoginProps = {
    title: 'Login',
    element: <Login/>,
    path: '/login'
  };

  const UserProfileProps = {
    title: 'User Profile',
    element: <UserProfile/>,
    path: '/user-profile'
  };

  const ProductProps = {
    title: 'Product',
    element: <Product/>,
    path: '/product'
  };

  const CategoryProps = {
    title: 'Category',
    element: <Category/>,
    path: '/category'
  };

  const AddProps = {
    title: 'Add',
    element: <Add/>,
    path: '/add'
  };

  const SearchProps = {
    title: 'Search',
    element: <Search/>,
    path: '/search'
  };

  const RegisterProps = {
    title: 'Register',
    element: <Register/>,
    path: '/register'
  }

  return (
    <Router>
      <Header/>
      <div className="App">
        <Routes>
          <Route {...HomepageProps} />
          <Route {...LoginProps} />
          <Route {...UserProfileProps} />
          <Route  {...ProductProps} />
          <Route {...CategoryProps} />
          <Route {...SearchProps} />
          <Route {...RegisterProps} />
          <Route {...AddProps} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// JSON-SERVER: npx json-server --watch data/database.json --port 8000   