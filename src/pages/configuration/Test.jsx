import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
// import { AuthContext } from "../../context/AuthContext";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { countryList } from "../data/CountryList";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import RefreshToken from "../../services/RefreshToken";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",

    width: "100%",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
}));

const Test = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const { login, kinder_cubby_panel_user, logout } = useContext(AuthContext);
  const [productName, setProductName] = useState("Item");
  const [lastName, setLastName] = useState("Islam");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Password123@");
  const [description, setPhone] = useState("+01977885544");
  const [street, setStreet] = useState("street");
  const [locality, setLocality] = useState("locality");
  const [region, setRegion] = useState("region");
  const [price, setPrice] = useState("125");
  const [storeId, setStoreId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };

  const validation = () => {
    let isError = false;

    if (!productName.trim()) {
      handleSnakbarOpen("Please enter first name", "error");
      document.getElementById("productName").focus();
      return (isError = true);
    }
    if (!lastName.trim()) {
      handleSnakbarOpen("Please enter last name", "error");
      document.getElementById("lastName").focus();
      return (isError = true);
    }
    if (!email.trim()) {
      handleSnakbarOpen("Please enter email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email.trim()
      )
    ) {
      handleSnakbarOpen("Invalid email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    }
    if (!password.trim()) {
      handleSnakbarOpen("Please enter password", "error");
      document.getElementById("password").focus();
      return (isError = true);
    }
    if (!description.trim()) {
      handleSnakbarOpen("Please enter description number", "error");
      document.getElementById("description").focus();
      return (isError = true);
    }
    if (!street.trim()) {
      handleSnakbarOpen("Please enter street", "error");
      document.getElementById("street").focus();
      return (isError = true);
    }
    if (!locality.trim()) {
      handleSnakbarOpen("Please enter locality", "error");
      document.getElementById("locality").focus();
      return (isError = true);
    }
    if (!region.trim()) {
      handleSnakbarOpen("Please enter region", "error");
      document.getElementById("region").focus();
      return (isError = true);
    }
    if (!price.trim()) {
      handleSnakbarOpen("Please enter postal code", "error");
      document.getElementById("price").focus();
      return (isError = true);
    }
    if (!storeId.trim()) {
      handleSnakbarOpen("Please select a storeId", "error");
      document.getElementById("storeId").focus();
      return (isError = true);
    }
    return isError;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let err = validation();
    if (err) {
      return;
    } else {
      setLoading(true);
      try {
        let data = {
          enabled: true,
          emailVerified: true,
          productName: productName,
          lastName: lastName,
          email: email,
          credentials: [
            {
              type: "password",
              value: password,
              temporary: false,
            },
          ],
          attributes: {
            phoneNumber: description,
            street: street,
            locality: locality,
            region: region,
            postal_code: price,
            storeId: storeId,
          },
          groups: ["TEACHER"],
        };
        console.log("data", data);
        // let token = await RefreshToken(kinder_cubby_panel_user, logout, login);
        // console.log("token get from RefreshToken", token);
        let response = await axios({
          url: `${process.env.REACT_APP_BASE_URL}/auth/admin/realms/kindercubby/users`,
          method: "post",
          data: data,
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        console.log("response", response);
        if (response.status === 201) {
          handleSnakbarOpen("Added new teacher successfully", "success");

          navigate("/teacher-list");
        }
      } catch (error) {
        console.log("error", error.response);
        handleSnakbarOpen(error.response.data.errorMessage, "error");
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "80vh" }}
      >
        <form className={classes.form} onSubmit={onSubmit}>
          <Typography
            variant="h5"
            component="div"
            // style={{ marginBottom: "30px" }}
          >
            Department
          </Typography>
          <hr />
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Deparment</TableCell>
                  <TableCell align="center">Designation</TableCell>
                  <TableCell align="center">Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <FormControl style={{ width: "90%" }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        onChange={handleDepartmentChange}
                      >
                        <MenuItem value={""} disabled>
                          Select
                        </MenuItem>

                        <MenuItem value={10}>Department 1</MenuItem>
                        <MenuItem value={20}>Department 2</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <FormControl style={{ width: "90%" }}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={designation}
                        onChange={handleDesignationChange}
                      >
                        <MenuItem value={""} disabled>
                          Select
                        </MenuItem>

                        <MenuItem value={10}>Designation 1</MenuItem>
                        <MenuItem value={20}>Designation 2</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center" rowSpan={2} colSpan={2}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={3}
                      // placeholder="Minimum 3 rows"
                      style={{ width: "90%" }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            disableElevation
            style={{
              marginTop: "50px",
              display: "block",
              marginLeft: "auto",
              minWidth: "150px",
            }}
            disabled={loading}
            // onClick={onSubmit}
            type="submit"
          >
            {loading === false && "Save"}
            <PulseLoader
              color={"#353b48"}
              loading={loading}
              size={10}
              speedMultiplier={0.5}
            />{" "}
          </Button>
        </form>
      </Grid>
    </div>
  );
};

export default Test;
