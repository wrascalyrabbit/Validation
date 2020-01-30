import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, useSnackbar } from "notistack";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  devices: {
    width: "100%"
  },
  button: {
    marginTop: 25,
    float: "right"
  }
}));

const handleRunValidation = () => {
  console.log("Testing");
  //
  // Code for submitting to validation job create and
  // Snackbar will be for success and error messages.
  //
};

const Validation = () => {
  const classes = useStyles();

  return (
    <div>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        maxSnack={8}
        style={{ width: 380 }}
      >
        <Container maxWidth="sm">
          <TextField
            className={classes.devices}
            id="filled-multiline"
            label="Device(s)"
            multiline
            placeholder="LBZPOL70, ASAPOL88"
            variant="filled"
            onClick={() => {
              handleRunValidation();
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </Container>
      </SnackbarProvider>
    </div>
  );
};

export default Validation;
