import React, { Suspense, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation, useParams } from "react-router-dom";
import Cart from "./components/Cart";
import Footer from "./components/Footer/Footer";
import HealthBlog from "./components/HealthBlog/Blog";
import BlogPost from "./components/HealthBlog/BlogRead";
import LoadingSpinner from "./components/LoadingSpinner";
import Navbar from './components/Navbar/Navbar';
import PrivacyPolicy from "./components/Rules/PrivacyPolicy";
import TermsAndConditions from "./components/Rules/TermsAndConditions";
import ContactScreen from './components/screens/ContactScreen';
import ErrorScreen from './components/screens/ErrorScreen';
import HealthTool from './components/screens/HealthToolCal';
import HomeScreen from './components/screens/HomeScreen';
import ProductDetailScreen from './components/screens/ProductDetailScreen';
import ProductsScreen from './components/screens/ProductsScreen';
import ServicesDetailScreen from './components/screens/ServicesDetailScreen';
import Services from "./components/Services/Services";
import './index.css';

// ErrorBoundary Component (unchanged)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1><ErrorScreen /></h1>;
    }
    return this.props.children;
  }
}

// PageTitle Component (unchanged)
const PageTitle = () => {
  const location = useLocation();
  const { title } = useParams();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/':
        document.title = 'Pharmacy - Home';
        break;
      case '/products':
        document.title = 'Pharmacy - Products';
        break;
      case '/health-tool':
        document.title = 'Pharmacy - Health Tool';
        break;
      case '/health-blog':
        document.title = 'Pharmacy - Health Blog';
        break;
      case '/contact':
        document.title = 'Pharmacy - Contact Us';
        break;
      case '/services':
        document.title = 'Pharmacy - Services';
        break;
        case '/privacy-policy':
          document.title = 'Pharmacy - Privacy policy';
          break;
          case '/terms-conditions':
          document.title = 'Pharmacy - Trems & Conditions';
          break;
      default:
        if (path.includes('/health-blog/')) {
          document.title = `Pharmacy - Blog Post: ${title}`;
        } else {
          document.title = 'Pharmacy';
        }
        break;
    }
  }, [location, title]);

  return null;
};

// App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div className="text-center">Loading components...</div>}>
          <Navbar />
          <PageTitle />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/products/:id" element={<ProductDetailScreen />} />
            <Route path="/health-tool" element={<HealthTool />} />
            <Route path="/health-blog" element={<HealthBlog />} />
            <Route path="/health-blog/:id" element={<BlogPost />} /> {/* Corrected Route */}
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServicesDetailScreen />} /> {/* Ensure path is :id */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
