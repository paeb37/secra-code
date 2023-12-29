import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken(); // useToken() is custom

  return (
    // parent component
    <BrowserRouter> 
      <div className="App">
        <Header token={removeToken}/>
        {/* if no token, login */}
        {!token && token !== "" && token !== undefined?  
        <Login setToken={setToken} />
        :(
          <>
            <Routes>
              <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;