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
import TourReport from "./pages/admin/TourReport";
import Faq from "./pages/Faq";
import AirportTransferManager from "./pages/admin/AirportTransferManager";
import AirportTransferEdit from "./pages/admin/AirportTransferEdit";
import DetailAirportTransfer from "./pages/DetailAirportTransfer";
import BookRideManager from "./pages/admin/BookRideManager";
import PaymentBookRide from "./pages/PaymentBookRide";
import DetailBookRide from "./pages/DetailBookRide";
import Flights from "./pages/Flights";
import DetailTicketFlight from "./pages/DetailTicketFlight";
import PaymentFlightTicket from "./pages/PaymentFlightTicket";
import FlightManager from "./pages/admin/FlightManager";
import FlightUpdate from "./pages/admin/FlightUpdate";
import FlightBookingManager from "./pages/FlightBookingManager";
import FlightReport from "./pages/admin/FlightReport";

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
        <Route path="/faq" element={<Faq />} />
        <Route path="/tours" element={<Tours />} />
        <Route
          path="/tour-detail/:tourId"
          element={
            <TourDetail
              roles={context?.roles}
              isAuthenticated={context.isAuthenticated}
              verifiedEmail={context.profile?.verifiedEmail}
            />
          }
        />
        <Route
          path="/detail-airport-transfer/:airportTransferId"
          element={<DetailAirportTransfer />}
        />
        <Route path="/flights" element={<Flights />} />

        {/* Phải xác nhận email mới xem được */}
        {!context.profile?.verifiedEmail && (
          <Route path="/verify-email" element={<VerifyEmail />} />
        )}
        {/* Phải đăng nhập mới xem được */}
        {context.isAuthenticated && (
          <>
            <Route path="/booking/:tourId" element={<Booking />} />
            <Route path="/payment/:tourId/:bookingCode" element={<Payment />} />
            <Route
              path="/booktour-detail/:tourId/:bookingCode"
              element={<BookingDetail />}
            />

            <Route
              path="/payment-bookride/:airportTransferId/:bookRideId"
              element={<PaymentBookRide />}
            />
            <Route
              path="/bookride-detail/:airportTransferId/:bookRideId"
              element={<DetailBookRide />}
            />
            <Route
              path="/payment-ticket-flight/:flightCode/:ticketId"
              element={<PaymentFlightTicket />}
            />
            <Route
              path="/ticket-flight-detail/:flightCode/:ticketId"
              element={<DetailTicketFlight />}
            />
          </>
        )}

        {/* Chưa đăng nhập */}
        {!context.isAuthenticated && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Route>

      {/* Phải đăng nhập và có quyền admin mới xem được */}
      {context.isAuthenticated && context.roles?.includes("ROLE_ADMIN") && (
        <Route element={<DashboardLayout />}>
          <Route path="/admin/*" element={<NotFound />} />
          <Route path="/admin" element={<Dashboard />} />
          {/* Tour */}
          <Route path="/admin/tour-report" element={<TourReport />} />
          <Route path="/admin/tour-management" element={<TourManagement />} />
          <Route path="/admin/tour-update/:tourId" element={<TourUpdate />} />
          <Route path="/admin/tour-booking/:tourId" element={<TourBooking />} />
          {/* User */}
          <Route path="/admin/user-management" element={<UserManagement />} />
          {/* Discount */}
          <Route
            path="/admin/discount-management"
            element={<DiscountManager />}
          />
          <Route path="/admin/discount-create" element={<DiscountCreate />} />
          {/* AirportTransfer */}
          <Route
            path="/admin/airport-transfer-management"
            element={<AirportTransferManager />}
          />
          <Route
            path="/admin/airport-transfer-edit/:airportTransferId"
            element={<AirportTransferEdit />}
          />
          <Route
            path="/admin/book-ride/:airportTransferId"
            element={<BookRideManager />}
          />
          {/* Chuyến bay */}
          <Route
            path="/admin/flight-management"
            element={<FlightManager />}
          />
          <Route
            path="/admin/flight-update/:flightCode"
            element={<FlightUpdate />}
          />
          <Route
            path="/admin/flight-booking-management/:flightCode"
            element={<FlightBookingManager />}
          />
          <Route
            path="/admin/flight-report"
            element={<FlightReport />}
          />
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
