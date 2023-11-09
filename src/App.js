import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/tickets/${ticketId}`);
      setTicketData(response.data);
      console.log("ticketData: ", ticketData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setTicketData(null);
    }
  };

  const handleChecking = async () => {
    try {
      const response = await axios.patch(`/api/tickets/${ticketId}/check`);
      console.log("data", response.data)
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" value={ticketId} onChange={(e) => setTicketId(e.target.value)} placeholder="Enter Ticket ID" />
        <button onClick={handleSearch}>Search</button>
        {ticketData && (
          <div className="ticket-result">
            <div>
              <strong>Ticket ID:</strong> {ticketData.ticketId}
            </div>
            <div>
              <strong>Event Name:</strong> {ticketData.event.eventName}
            </div>
            <div>
              <strong>Description:</strong> {ticketData.event.description}
            </div>
            <div>
              <strong>Event Date:</strong> {ticketData.event.eventDate}
            </div>
            <div>
              <strong>Event Time:</strong> {ticketData.event.eventTime}
            </div>
            <div>
              <strong>Venue:</strong> {ticketData.event.venue.place}
            </div>
            <div>
              <strong>Address:</strong> {ticketData.event.venue.streetAddress}
            </div>
            <div>
              <strong>Postal Code:</strong> {ticketData.event.venue.postalcode.postalcode}
            </div>
            <div>
              <strong>Post Office:</strong> {ticketData.event.venue.postalcode.postOffice}
            </div>
            <div>
              <strong>Ticket Type:</strong> {ticketData.ticketType.ticketType}
            </div>
            <div>
              <strong>Price:</strong> {ticketData.ticketType.price}
            </div>
            <div>
              <strong>Transaction Amount:</strong> {ticketData.transaction.amount}
            </div>
            <div>
              <strong>Transaction Date:</strong> {ticketData.transaction.transactionDate}
            </div>
            <div>
              <strong>Transaction Time:</strong> {ticketData.transaction.transactionTime}
            </div>
            <div>
              <strong>Transaction Status:</strong> {ticketData.transaction.transactionOk ? "Successful" : "Failed"}
            </div>
            <div>
              <strong>Checked:</strong> {ticketData.isChecked ? "Yes" : "No"}
            </div>
            <div>
            <button onClick={handleChecking}>Mark ticket as used</button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
