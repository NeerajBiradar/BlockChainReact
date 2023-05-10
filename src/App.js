import React, { useState } from 'react';

import PreloginRoute from './component/Prelogin/RoutePrelogin';
import AdminRoute from './component/Admin/RouteAdmin';
import UserRoute from './component/User/RouteUser';
import LabelRoute from './component/Labeller/RouteLabel';
import DeveloperRoute from './component/Developer/RouteDeveloper';
import VerifyRoute from './component/Verifier/RouteVerifier';
import LoginPage from './component/Prelogin/LoginPage';


function App() {
  const [type, setType] = useState('');
  const handleType = (t) => {
    setType(t);
  }

  return (
    <div className="App">
      {/* {type == "user" ? (
        <UserRoute />
      ) : type == "admin" ? (
        <AdminRoute />
      ) : type == "labeller" ? (
        <LabelRoute />
      ) : type == "verifier" ? (
        <VerifyRoute />
      ) : type == "developer" ? (
        <DeveloperRoute />
      ) : (
        <PreloginRoute typeofUser={handleType} />
      )} */}
      <LabelRoute/>
    </div>
  );
}

export default App;
