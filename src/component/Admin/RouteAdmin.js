import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import PatchRequest from './PatchRequest';
import ApprovedPatch from './ApprovedPatch'; 
import RejectedPatch from './RejectedPatch';
import DeployedPatch from './DeployedPatch';
import Logout from '../Prelogin/LoginPage';

function AdminRoute() {
    return (
        <div className="App">
            <Router>
                <AdminNavbar/>
                <Routes>
                    <Route path='/PatchRequest' element={<PatchRequest/>}/>
                    <Route path='/ApprovedPatches' element={<ApprovedPatch/>} />
                    <Route path='/RejectedPatches' element={<RejectedPatch/>} />
                    <Route path='/DeployedPatches' element={<DeployedPatch/>} />
                    <Route path='/Login' element={<Logout/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default AdminRoute;
