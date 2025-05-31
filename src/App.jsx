import { useState , useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import Card from './components/Card'
import './index.css'
// import './App.css'

function App() {
  const [theme, setTheme] = useState("dark");

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme in localStorage
    document.body.className = newTheme; // Apply theme to body
  };

  // Load saved theme from localStorage on page load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme); // Apply saved theme
      document.body.className = savedTheme; // Apply saved theme to body
    }
  }, []);

  return (
    <>
      <div className={theme === "dark" ? "dark" : "light"}>

        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <Card theme={theme}/>
      </div>
    </>
  )
}

export default App
