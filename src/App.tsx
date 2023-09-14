import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Upload from './components/Upload/Index';
import Compose from './components/Compose/Index';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Upload />} />
                    <Route path="/compose" element={<Compose />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
