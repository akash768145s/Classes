import { useState } from 'react'
import './App.css'
import LoginComponent from './components/login_1/LoginComponent'
import UserList from './components/case2/UserList'
import CounterList from './components/case3/CounterList'
import LifeCycleDemo from './components/case4/LifeCycleDemo'
import TamilGreetings from './components/case5/TamilGreetings'

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showUserList, setShowUserList] = useState(false)
  const [showCounterList, setShowCounterList] = useState(false)
  const [showHooksDemo, setShowHooksDemo] = useState(false)
  const [showTamilGreetings, setShowTamilGreetings] = useState(false)

  // Function to toggle between main page and login page
  const toggleLogin = () => {
    setShowLogin(!showLogin)
    setShowUserList(false)
    setShowCounterList(false)
    setShowHooksDemo(false)
    setShowTamilGreetings(false)
  }

  // Function to toggle between main page and user list page
  const toggleUserList = () => {
    setShowUserList(!showUserList)
    setShowLogin(false)
    setShowCounterList(false)
    setShowHooksDemo(false)
    setShowTamilGreetings(false)
  }

  // Function to toggle between main page and counter list page
  const toggleCounterList = () => {
    setShowCounterList(!showCounterList)
    setShowLogin(false)
    setShowUserList(false)
    setShowHooksDemo(false)
    setShowTamilGreetings(false)
  }

  // Function to toggle between main page and hooks demo page
  const toggleHooksDemo = () => {
    setShowHooksDemo(!showHooksDemo)
    setShowLogin(false)
    setShowUserList(false)
    setShowCounterList(false)
    setShowTamilGreetings(false)
  }

  // Function to toggle between main page and Tamil greetings page
  const toggleTamilGreetings = () => {
    setShowTamilGreetings(!showTamilGreetings)
    setShowLogin(false)
    setShowUserList(false)
    setShowCounterList(false)
    setShowHooksDemo(false)
  }

  // If showLogin is true, render the LoginComponent
  if (showLogin) {
    return (
      <div className="app-container">
        <LoginComponent />
        <button
          className="back-button"
          onClick={toggleLogin}
          style={{
            marginTop: '20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // If showUserList is true, render the UserList component
  if (showUserList) {
    return (
      <div className="app-container">
        <UserList />
        <button
          className="back-button"
          onClick={toggleUserList}
          style={{
            marginTop: '20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // If showCounterList is true, render the CounterList component
  if (showCounterList) {
    return (
      <div className="app-container">
        <CounterList />
        <button
          className="back-button"
          onClick={toggleCounterList}
          style={{
            marginTop: '20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // If showHooksDemo is true, render the LifeCycleDemo component
  if (showHooksDemo) {
    return (
      <div className="app-container">
        <LifeCycleDemo />
        <button
          className="back-button"
          onClick={toggleHooksDemo}
          style={{
            marginTop: '20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // If showTamilGreetings is true, render the TamilGreetings component
  if (showTamilGreetings) {
    return (
      <div className="app-container">
        <TamilGreetings />
        <button
          className="back-button"
          onClick={toggleTamilGreetings}
          style={{
            marginTop: '20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          Back to Home
        </button>
      </div>
    )
  }

  // Otherwise render the main app with all buttons
  return (
    <>
      <div className="button-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Login button */}
        <button
          onClick={toggleLogin}
          className="login-button"
          style={{
            marginTop: '20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          Go to Login Page
        </button>

        {/* User List button */}
        <button
          onClick={toggleUserList}
          className="user-list-button"
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s'
          }}
        >
          View User List
        </button>

        {/* Counter List button */}
        <button
          onClick={toggleCounterList}
          className="counter-list-button"
          style={{
            backgroundColor: '#6c5ce7',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(108, 92, 231, 0.3)',
            transition: 'all 0.3s'
          }}
        >
          Try Counter Demo
        </button>

        {/* Hooks Demo button */}
        <button
          onClick={toggleHooksDemo}
          className="hooks-demo-button"
          style={{
            backgroundColor: '#1a237e',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(26, 35, 126, 0.3)',
            transition: 'all 0.3s'
          }}
        >
          Explore Hooks Demo
        </button>

        {/* Tamil Greetings button */}
        <button
          onClick={toggleTamilGreetings}
          className="tamil-greetings-button"
          style={{
            backgroundColor: '#4a148c',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            boxShadow: '0 4px 6px rgba(74, 20, 140, 0.3)',
            transition: 'all 0.3s'
          }}
        >
          Try Tamil Greetings
        </button>
      </div>
    </>
  )
}

export default App
