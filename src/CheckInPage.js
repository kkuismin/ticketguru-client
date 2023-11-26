import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

const CheckInPage = () => {
  const { ticketId } = useParams();
  const [checkInStatus, setCheckInStatus] = useState("checking");

  useEffect(() => {
    const fetchTicketStatusAndCheckIn = async () => {
      try {
        const { data: ticketStatus } = await axios.get(`https://ticketguru-ohjelmistoprojekti.rahtiapp.fi/api/tickets/${ticketId}`, {
          withCredentials: true,
        });

        if (ticketStatus.isChecked) {
          setCheckInStatus("alreadyCheckedIn");
        } else {
          await axios.patch(`https://ticketguru-ohjelmistoprojekti.rahtiapp.fi/api/tickets/${ticketId}/check`, { withCredentials: true });
          setCheckInStatus("success");
        }
      } catch (error) {
        console.error("Error during check-in process:", error);
        setCheckInStatus("error");
      }
    };

    if (ticketId) {
      fetchTicketStatusAndCheckIn();
    }
  }, [ticketId]);

  let content;
  switch (checkInStatus) {
    case "checking":
      content = <CircularProgress />;
      break;
    case "success":
      content = (
        <Typography variant="h5" color="green">
          Check-in successful!
        </Typography>
      );
      break;
    case "alreadyCheckedIn":
      content = (
        <Typography variant="h5" color="orange">
          This ticket has already been checked in.
        </Typography>
      );
      break;
    case "error":
      content = (
        <Typography variant="h5" color="red">
          Error during check-in. Please try again.
        </Typography>
      );
      break;
    default:
      content = <Typography variant="h5">Unknown status.</Typography>;
  }

  return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>{content}</Box>;
};

export default CheckInPage;
