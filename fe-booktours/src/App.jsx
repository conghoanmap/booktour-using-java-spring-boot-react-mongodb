import React, { useContext, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { GlobalContext } from "./contexts/GlobalProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tours from "./pages/Tours";
import Dashboard from "./pages/admin/Dashboard";
import TourManagement from "./pages/admin/TourManager";
import Layout2 from "./layouts/Layout2";
import Layout3 from "./layouts/Layout3";
import TourDetail from "./pages/TourDetail";
import TourUpdate from "./pages/admin/TourUpdate";
import TourBooking from "./pages/admin/TourBooking";
import Setting from "./pages/Setting";
import UserManagement from "./pages/admin/UserManager";
import BookingDetail from "./pages/BookingDetail";
import Payment from "./pages/Payment";
import VerifyEmail from "./pages/VerifyEmail";
import DiscountManager from "./pages/admin/DiscountManager";
import DiscountCreate from "./components/DiscountCreate";

function App() {
  const context = useContext(GlobalContext);

  return (
    <Routes>
      <Route element={<Layout2 />}>
        {/* Công khai */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route
          path="/tour-detail/:tourId"
          element={<TourDetail roles={context?.roles} isAuthenticated={context.isAuthenticated} verifiedEmail={context.profile?.verifiedEmail} />}
        />

        {/* Phải xác nhận email mới xem được */}
        {!context.profile?.verifiedEmail && (
          <Route path="/verify-email" element={<VerifyEmail />} />
        )}
        {/* Phải đăng nhập mới xem được */}
        {context.isAuthenticated && (
          <>
            <Route path="/booking/:tourId" element={<Booking />} />
            <Route path="/payment/:bookingCode" element={<Payment />} />
            <Route
              path="/booktour-detail/:tourId/:bookingCode"
              element={<BookingDetail />}
            />
          </>
        )}

        {/* Chưa đăng nhập */}
        {!context.isAuthenticated && (
          <>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Route>

      {/* Phải đăng nhập và có quyền admin mới xem được */}
      {context.isAuthenticated && context.roles?.includes("ROLE_ADMIN") && (
        <Route element={<DashboardLayout />}>
          <Route path="/admin/*" element={<NotFound />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/tour-management" element={<TourManagement />} />
          <Route path="/admin/tour-update/:tourId" element={<TourUpdate />} />
          <Route path="/admin/tour-booking/:tourId" element={<TourBooking />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/discount-management" element={<DiscountManager />} />
          <Route path="/admin/discount-create" element={<DiscountCreate />} />
        </Route>
      )}

      {/* Phải đăng nhập mới xem được */}
      {context.isAuthenticated && (
        <Route element={<Layout3 />}>
          <Route path="/setting" element={<Setting />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
