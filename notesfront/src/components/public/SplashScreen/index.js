/* eslint-disable react-hooks/exhaustive-deps */
//JSX
import "./splashscreen.css";
import { useSession } from "../../../hooks/Session";
import { Fragment, useEffect } from "react";
import { privateaxios, setUnAuthInterceptor } from '../../../store/axios';
import { SEC_LOGOUT } from "../../../store/reducers/sec";
import { APP_INIT, APP_MIN } from "../../../store/reducers/app";
const SplashScreen = ({children}) => {
  const [ {app, sec}, dispatch ] = useSession();
  const logoutHandler = ()=>{
    dispatch({ type: SEC_LOGOUT });
    dispatch({ type: APP_INIT });

  }
  useEffect(async ()=>{
    setUnAuthInterceptor(logoutHandler);
    if (sec.isLogged) {
      try {
        let data = await privateaxios.get('/api/utils/ping');
        dispatch({ type: APP_INIT });
      } catch (ex) {
        dispatch({ type: SEC_LOGOUT });
      }
    } else {
      dispatch({ type: APP_INIT });
    }
  }, []);
  useEffect(()=>{
    setTimeout(()=>{
      dispatch({ type:APP_MIN});
    }, 3000)
  },[])
  if (!(app.initialized && app.minTimeElapsed)){
  return (
    <section className="SplashScreen">
      <div>
        <h1>Note App V1</h1>
        <h2>Initialized: {app.initialized && "OK"}</h2>
        <h2>Time Elapsed: {app.minTimeElapsed && "OK" } </h2>
      </div>
    </section>
  );
  } else {
    return (
      <Fragment>
        {children}
      </Fragment>
    )
  }
}

export default SplashScreen;
