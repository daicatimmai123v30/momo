import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';

const AppRouter = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    return (
        <BrowserRouter>
            <Routes>
                {/* Route Login */}
                {/* <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} /> */}

                {/* Nếu chưa đăng nhập, chỉ cho phép vào trang Login */}
                {isAuthenticated ? (
                    <>
                        <Route path="HomePage">
                            <Route index path="TwitterAccount" element={<HomePage />} />
                            <Route index path="SchedulePage" element={<SchedulePage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/HomePage/TwitterAccount" replace />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" replace />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
