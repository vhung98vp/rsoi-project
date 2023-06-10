import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import ResponsiveAppBar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Library from './pages/Library';
import Admin from './pages/Admin';
import SetForm from './pages/SetForm';
import SetInfo from './pages/SetInfo';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import Test from './pages/Test';
import Category from './pages/Category';

function App() {
  return (
    <Auth0Provider
        domain="https://dev-kcel8p8ubov758p0.us.auth0.com"
        clientId="ItS7wOhJUoq8Rd5Gjke8w8ZqjZ9g6De7"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'rsoi',
          scope: 'openid profile email read:current_user'
        }}
      >
    <div className="App">
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/admin" index element={<Admin />} />
          <Route path="/category" index element={<Category />} />
          <Route path="/" index element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" index element={<Profile />} />
          <Route path="/sets/form" index element={<SetForm />} />
          <Route path="/sets/info" index element={<SetInfo />} />
          <Route path="/sets/learn" index element={<Learn />} />
          <Route path="/sets/test" index element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </Auth0Provider>
  );
}

export default App;
