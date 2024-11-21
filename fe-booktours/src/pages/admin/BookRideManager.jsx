import React, { useEffect, useState } from "react";
import AirportTransferService from "../../services/AirportTransferService";
import { useParams } from "react-router-dom";

const BookRideManager = () => {
    const { airportTransferId } = useParams();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [bookRides, setBookRides] = useState([]);

  useEffect(() => {
    const fetchBookRides = async () => {
        const response = AirportTransferService.getBookRides(airportTransferId);
        console.log(response.data?.bookRides);
        setBookRides(response.data?.bookRides);
    };
    fetchBookRides();
  }, [selectedDate]);

  return <div>BookRideManager</div>;
};

export default BookRideManager;
