import { FC, Fragment, useEffect, useState } from 'react'
import { loginEndpoint, setClientToken } from '../../spotify.config'

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
      : <Fragment>
        <div className='text-3xl text-center'>
          Home page 
        </div>
      </Fragment>
  )
}

export default HomePage

