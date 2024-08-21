import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../CSS-pages/helpcenter.css";

const HelpCenter =() =>{
  return (
    <>
      <div className="contact-container">
        <h1 className="about-text">Talk to us</h1>
      </div>{" "}
      <div className="form">
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
            "& .MuiTextField-root": {
              marginBottom: "20px",
            },
          }}
        >
          <TextField fullWidth label="Name" id="fullWidth" />
          <TextField fullWidth label="Email" id="fullWidth" />
          <TextField fullWidth label="Subject" id="fullWidth" />
          <TextField
            fullWidth
            label="Additional information"
            id="fullWidth           maxRows={4}
"
            multiline
            rows={4}
          />
          <Button className="helpcenter-submit"
            variant="contained"
            style={{ backgroundColor: "#f069ca", color: "white", marginTop: 5, marginLeft:190, marginBottom:40 }}
          >
            Submit
          </Button>
        </Box>
      </div>
    </>
  );
}

export default HelpCenter;
