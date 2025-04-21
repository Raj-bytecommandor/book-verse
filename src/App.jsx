import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import BookList from './pages/BookList';
import About from './pages/About';
import Articles from './pages/Articles';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import Marketplace from './pages/Marketplace/Marketplace';
import './index.css';
import { MarketplaceProvider } from './context/MarketplaceContext';
import Footer from './components/Footer';
import FloatingBackground from './components/FloatingBackground';
import { ProfileProvider } from './context/ProfileContext';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <ProfileProvider>
          <MarketplaceProvider>
            <div className="App">
              <FloatingBackground />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                } />
                <Route path="/books" element={
                  <>
                    <Navbar />
                    <BookList />
                  </>
                } />
                <Route path="/about" element={
                  <>
                    <Navbar />
                    <About />
                  </>
                } />
                <Route path="/articles" element={
                  <>
                    <Navbar />
                    <Articles />
                  </>
                } />
                <Route path="/saved" element={
                  <>
                    <Navbar />
                    <SavedBooks />
                  </>
                } />
                <Route path="/search" element={
                  <>
                    <Navbar />
                    <SearchBooks />
                  </>
                } />
                <Route path="/marketplace" element={
                  <>
                    <Navbar />
                    <Marketplace />
                  </>
                } />
              </Routes>
              <Footer />
            </div>
          </MarketplaceProvider>
        </ProfileProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
