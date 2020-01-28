import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    rowsSelected: rowSelect,
    customSort: (data, colIndex, order) => {
      //sort differently if mgmt_ip or timestamp
      if (colIndex === 2) {
        if (order === "asc") {
          return data.sort((a, b) => {
            const num1 = Number(
              a.data[2]
                .split(".")
                .map(num => `000${num}`.slice(-3))
                .join("")
            );
            const num2 = Number(
              b.data[2]
                .split(".")
                .map(num => `000${num}`.slice(-3))
                .join("")
            );
            return num1 > num2 ? 1 : -1;
          });
        } else if (order === "desc") {
          return data.sort((a, b) => {
            const num1 = Number(
              a.data[2]
                .split(".")
                .map(num => `000${num}`.slice(-3))
                .join("")
            );
            const num2 = Number(
              b.data[2]
                .split(".")
                .map(num => `000${num}`.slice(-3))
                .join("")
            );
            return num1 < num2 ? 1 : -1;
          });
        }
      } else if (colIndex === 5) {
        if (order === "asc") {
          return data.sort((a, b) => {
            return new Date(a.data[colIndex]) - new Date(b.data[colIndex]);
          });
        } else if (order === "desc") {
          return data.sort((a, b) => {
            return new Date(b.data[colIndex]) - new Date(a.data[colIndex]);
          });
        }
      } else {
        if (order === "asc") {
          return data.sort((a, b) => {
            return a.data[colIndex] < b.data[colIndex] ? 1 : -1;
          });
        } else if (order === "desc") {
          return data.sort((a, b) => {
            return a.data[colIndex] < b.data[colIndex] ? -1 : 1;
          });
        }
      }
    }
  };

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
      >
        <TextField id="device" label="Device" className={classes.device} />
        <Button variant="contained" color="primary">
          Run Validation
        </Button>
        <ValidationTable />
      </SnackbarProvider>
    </div>
  );
};

export default Validation;
