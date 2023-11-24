import React, { useState } from "react";
import axios from "axios";
//import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Textfield from "@mui/material/TextField";
import { Box } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import ToolBar from "@mui/material/Toolbar";
import QRCode from "qrcode.react";
import CheckInPage from "./CheckInPage";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const [ticketId, setTicketId] = useState("");
  const [ticketData, setTicketData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://ticketguru-ohjelmistoprojekti.rahtiapp.fi/api/tickets/${ticketId}`);
      setTicketData(response.data);
      console.log("ticketData: ", ticketData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setTicketData(null);
    }
  };

  const handleChecking = async () => {
    try {
      const response = await axios.patch(`http://ticketguru-ohjelmistoprojekti.rahtiapp.fi/api/tickets/${ticketId}/check`);
      console.log("data", response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <Router>
      <Box>
        <CssBaseline />
        <AppBar>
          <ToolBar>
            <Typography variant="h5" component={Link} to="/" style={{ textDecoration: "none", color: "inherit" }}>
              TicketGuru
            </Typography>
          </ToolBar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            element={
              <Container maxWidth="sm" sx={{ marginTop: "100px", marginBottom: "50px", textAlign: "center" }}>
                <Typography variant="h5">Search for a ticket</Typography>
                <Textfield sx={{ marginTop: 3 }} label="Enter Ticket ID" name={ticketId} onChange={(e) => setTicketId(e.target.value)} />
                <Box sx={{ marginTop: 3 }}>
                  <Button variant="contained" onClick={handleSearch}>
                    Search
                  </Button>
                </Box>
                {ticketData && (
                  <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h5" sx={{ marginBottom: 3 }}>
                      Ticket details
                    </Typography>
                    <strong>Ticket ID:</strong> {ticketData.ticketId} <br />
                    <strong>Event Name:</strong> {ticketData.event.eventName} <br />
                    <strong>Description:</strong> {ticketData.event.description} <br />
                    <strong>Event Date:</strong> {ticketData.event.eventDate} <br />
                    <strong>Event Time:</strong> {ticketData.event.eventTime} <br />
                    <strong>Venue:</strong> {ticketData.event.venue.place} <br />
                    <strong>Address:</strong> {ticketData.event.venue.streetAddress} <br />
                    <strong>Postal Code:</strong> {ticketData.event.venue.postalcode.postalcode} <br />
                    <strong>Post Office:</strong> {ticketData.event.venue.postalcode.postOffice} <br />
                    <strong>Ticket Type:</strong> {ticketData.ticketType.ticketType} <br />
                    <strong>Price:</strong> {ticketData.ticketType.price} <br />
                    <strong>Transaction Amount:</strong> {ticketData.transaction.amount} <br />
                    <strong>Transaction Date:</strong> {ticketData.transaction.transactionDate} <br />
                    <strong>Transaction Time:</strong> {ticketData.transaction.transactionTime} <br />
                    <strong>Transaction Status:</strong> {ticketData.transaction.transactionOk ? "Successful" : "Failed"} <br />
                    <strong>Checked:</strong> {ticketData.isChecked ? "Yes" : "No"} <br />
                    <Box sx={{ marginTop: 3 }}>
                      <Button variant="contained" onClick={handleChecking} disabled={ticketData ? ticketData.isChecked : false}>
                        {ticketData && ticketData.isChecked ? "Ticket is used" : "Mark ticket as used"}
                      </Button>
                    </Box>
                    <QRCode value={`/check-in/${ticketData.ticketId}`} size={256} includeMargin={true} />
                  </Box>
                )}
              </Container>
            }
          />
          <Route path="/check-in/:ticketId" element={<CheckInPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
