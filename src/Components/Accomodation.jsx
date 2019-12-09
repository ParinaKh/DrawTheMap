import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

export default function Accomodation(props) {
  const [accomodations, setAccomodations] = useState([]);
  const [formValues, setFormValues] = useState({});
  const selectRef = useRef();

  console.log(props);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/itinerary-planner")
      .then(res => {
        setAccomodations(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    // console.log("i have been submitted");
    if (!formValues.accomodation) {
      formValues.accomodation = selectRef.current.value;
    }

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/previous-travels", formValues)
      .then(res => {
        props.history.push("/previous-travels");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Accomodation</h2>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" name="name" placeholder="Name" />
        <label htmlFor="name">Address</label>
        <input id="address" type="text" name="address" placeholder="Address" />
        <label htmlFor="BookingRef">Booking Reference</label>
        <input type="text" name="bookingRef" placeholder="BookingRef" />
        <label htmlFor="checkIn">Check-in</label>
        <input type="date" name="checkIn" placeholder="date" />
        <label htmlFor="checkOut">Check-out</label>
        <input type="date" name="checkOut" placeholder="date" />
        <button>Add</button>
      </form>
    </div>
  );
}
