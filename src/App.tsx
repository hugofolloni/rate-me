import Homepage from './pages/Homepage';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Product from './pages/Product';
import Category from './pages/Category';
import Search from './pages/Search';
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

  const SearchProps = {
    title: 'Search',
    element: <Search/>,
    path: '/search'
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route {...HomepageProps} />
          <Route {...LoginProps} />
          <Route {...UserProfileProps} />
          <Route  {...ProductProps} />
          <Route {...CategoryProps} />
          <Route {...SearchProps} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// JSON-SERVER:   npx json-server --watch data/database.json --port 8000   