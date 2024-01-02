import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formContainer: {
    maxWidth: 600,
  },
  qrCodeContainer: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
}));

const TicketForm = () => {
  const classes = useStyles();
  const qrCodeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
    status: "",
    ticketDate: "",
    time: "",
    qrCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const uniqueQRCode = uuidv4();
    setFormData((prevData) => ({ ...prevData, qrCode: uniqueQRCode }));
  
    try {
      const response = await fetch("http://localhost:3000/ticket-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Ticket information saved successfully!");
  
        // Generate QR code as an image
        html2canvas(qrCodeRef.current).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
  
          // Save the image or send it to the server
          // You can save it to the server using another API endpoint
          console.log("QR code as image data:", imgData);
        });
      } else {
        console.error("Failed to save ticket information.");
      }
    } catch (error) {
      console.error("Error saving ticket information:", error);
    }
  };
  

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} className={classes.formContainer}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Ticket Date"
            type="date"
            name="ticketDate"
            value={formData.ticketDate}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.qrCodeContainer}>
            <QRCode value={formData.qrCode} ref={qrCodeRef} />
            </Grid>

      </Grid>
    </div>
  );
};

export default TicketForm;
