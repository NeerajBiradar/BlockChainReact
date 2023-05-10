import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import FeatureReport from './Feature';
import BugReport from './Bug';
import User from './UserHome';
import Download from './Download';
import LoginPage from '../Prelogin/LoginPage';


function UserRoute() {
    return (
        <div className="App">
            <Router>
                <UserNavbar/>
                <Routes>
                    <Route path='/User' element={<User/>} />
                    <Route path='/FeatureReport' element={<FeatureReport/>} />
                    <Route path='/BugReport' element={<BugReport/>} />
                    <Route path='/DownloadPatch' element={<Download/>} />
                    <Route path='/Login' element={<LoginPage/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default UserRoute;
