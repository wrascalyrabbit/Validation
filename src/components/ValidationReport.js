import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider, useSnackbar } from "notistack";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";

const useStyles = makeStyles(theme => ({
  device: {
    margin: theme.spacing(1),
    width: 200
  }
}));

const tableTheme = createMuiTheme({
  overrides: {
    MuiTableCell: {
      root: {
        padding: "0px 6px 0px 6px"
      }
    }
  }
});

const handleRunValidation = () => {
  console.log("Testing");
};

const ValidationTable = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = React.useState([]);
  const [rowSelect, setRowSelect] = React.useState([]);

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
        display: "false"
      }
    },
    {
      name: "Validation",
      label: "Validation",
      options: {
        filter: true,
        sort: true
      }
    }
  ];

  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 15],
    download: false,
    print: false,
    rowsSelected: rowSelect
  };

  const action = key => (
    <React.Fragment>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        {"Dismiss"}
      </Button>
    </React.Fragment>
  );

  const handleClickVariant = (message, variant) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right"
      },
      action,
      persist: true
    });
  };

  //populates the table's data of unlocked devices or if the locked device is currently in the group
  useEffect(() => {
    handleClickVariant(
      "There was an error contacting the database. Please contact administrator.",
      "error"
    );
  }, []);

  return (
    <MuiThemeProvider theme={tableTheme}>
      <MUIDataTable
        title={"Select Device(s)"}
        data={data}
        columns={columns}
        options={options}
      />
    </MuiThemeProvider>
  );
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
      />
    </div>
  );
};

export default Validation;
