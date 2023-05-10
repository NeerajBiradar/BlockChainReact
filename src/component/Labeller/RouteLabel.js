import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BugLabel from './BugLabel';
import FeatureLabel from './FeatureLabel';
import LabelNavbar from './LabelNavbar';
function LabelRoute() {
    return (
        <div className="App">
            <Router>
                <LabelNavbar/>
                <Routes>
                    <Route path='/BugLabel' element={<BugLabel/>} />
                    <Route path='/FeatureLabel' element={<FeatureLabel/>} />
                </Routes>
            </Router>
        </div>
    );
}

export default LabelRoute;
