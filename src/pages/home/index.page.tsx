import { FC, Fragment, useEffect, useState } from 'react'
import { loginEndpoint, setClientToken } from '../../spotify.config'
import PlayerPage from '../player/index.page';
import Library from '../library/index.page';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export interface HomePageProps { }

const HomePage: FC<HomePageProps> = () => {
  const [token, setToken] = useState<string | null>('')

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  const loginSpotify = () => {
    window.open(loginEndpoint)
  }

  return (
    !token
      ?
      <Fragment>
        <button onClick={loginSpotify}>Login Spotify</button>
      </Fragment>
      : (
        <Fragment>
          <Router>
            <div className="main-body">
              <Routes>
                <Route path="/" element={<Library />} />
                <Route path="/player" element={<PlayerPage />} />
              </Routes>
            </div>
          </Router>
        </Fragment>
      )
  )
}

export default HomePage

