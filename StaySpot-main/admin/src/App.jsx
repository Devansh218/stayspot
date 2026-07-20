import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Users from "./components/Users";
import Hotels from "./components/Hotels";
import Rooms from "./components/Rooms";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import NewUser from "./components/NewUser";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NewHotel from "./components/NewHotel";
import NewRoom from "./components/NewRoom";

const App = () => {
    const [openSidebar, setOpenSidebar] = useState(true);

    return (
        <div className="flex overflow-hidden h-screen">
            {openSidebar && <Sidebar />}

            <div className="bg-zinc-900 w-full h-screen overflow-y-auto overflow-x-hidden">
                <Navbar setOpenSidebar={setOpenSidebar} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <ProtectedRoute>
                                <Users />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hotels"
                        element={
                            <ProtectedRoute>
                                <Hotels />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/rooms"
                        element={
                            <ProtectedRoute>
                                <Rooms />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/user/new"
                        element={
                            <ProtectedRoute>
                                <NewUser />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hotel/new"
                        element={
                            <ProtectedRoute>
                                <NewHotel />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/room/new"
                        element={
                            <ProtectedRoute>
                                <NewRoom />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};

export default App;
