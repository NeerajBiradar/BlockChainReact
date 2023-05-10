import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DeveloperTable from './Developer';
import DeveloperNavabar from './DeveloperNavbar'

function DeveloperRoute() {
    return (
        <div className="App">
            <Router>
                <DeveloperNavabar/>
                <Routes>
                    <Route path='/UploadPatch' element={<DeveloperTable/>} />
                    {/* <Route path='/Login' element={<Logout/>} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default DeveloperRoute;
