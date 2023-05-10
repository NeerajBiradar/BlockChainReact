import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import VerifierNavbar from './VerifierNavbar';
import Verify from './Verifier';
function VerifierRoute() {
    return (
        <div className="App">
            <Router>
                <VerifierNavbar/>
                <Routes>
                    <Route path='/VerifyPatch' element={<Verify/>} />
                    {/* <Route path='/Login' element={<Logout/>} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default VerifierRoute;
