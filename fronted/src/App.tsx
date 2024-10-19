import './App.css'
import {Route, Routes} from "react-router-dom";
import Body from "./Container/Body/Body.tsx";
import CreateUser from "./Components/User/CreateUser.tsx";
import LoginUser from "./Components/User/LoginUser.tsx";
import Header from "./Container/Header/Header.tsx";
import CreatePhotos from "./Components/Photos/CreatePhotos.tsx";

function App() {

  return (
      <>
          <header>
              <Header/>
          </header>
          <main>
              <Routes>
                  <Route path="/" element={<Body/>}></Route>
                  <Route path="/create-user" element={<CreateUser/>}/>
                  <Route path="/login-user" element={<LoginUser/>}/>
                  <Route path="/create-photo" element={<CreatePhotos/>}/>
              </Routes>
          </main>
      </>
  )
}

export default App
