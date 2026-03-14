// esto es lo principal de la app

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="*" element={<AppRoutes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
