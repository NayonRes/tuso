import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",

    width: "100%",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  buttonStyle: {
    color: "#515151 !important",
    textTransform: "none !important",
    minWidth: "160px !important",
  },
  activeButtonStyle: {
    background: "rgba(158,31,96,1) !important",
    color: "#fff !important",
  },
}));

const Department = () => {
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
  const [active, setActive] = useState("Department");

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
        // justifyContent="center"
        alignItems="center"
        // style={{ height: "80vh" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Button
            className={`${classes.buttonStyle} ${
              active === "Category" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Category")}
          >
            Category
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Quick List" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Quick List")}
          >
            Quick List
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Department" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Department")}
          >
            Department
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Country" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Country")}
          >
            Country
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Urgency" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Urgency")}
          >
            Urgency
          </Button>
          &nbsp; &nbsp;
        </div>

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
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    DESIGNATION
                  </TableCell>
                  <TableCell align="center">DESCRIPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    background: "#f9f9f9",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <FormControl
                      style={{ width: "90%", background: "#fff" }}
                      size="small"
                    >
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
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <FormControl
                      style={{ width: "90%", background: "#fff" }}
                      size="small"
                    >
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
                  <TableCell align="center" rowSpan={2}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={8}
                      // placeholder="Minimum 3 rows"
                      style={{ width: "90%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    background: "#f9f9f9",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <TextField
                      size="small"
                      id="outlined-basic"
                      style={{ width: "90%", background: "#fff" }}
                      placeholder="Department"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <TextField
                      size="small"
                      id="outlined-basic"
                      style={{ width: "90%", background: "#fff" }}
                      placeholder="Designation"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" colSpan={3}>
                    <Button variant="contained">Add</Button> &nbsp;
                    <Button variant="contained" color="info">
                      Edit
                    </Button>{" "}
                    &nbsp;
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{
                      borderRight: "1px solid #ddd",
                      fontSize: "17px",
                      color: "#837e7e",
                    }}
                  >
                    Admin
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  ></TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      size="small"
                      id="outlined-basic"
                      style={{ width: "90%" }}
                      placeholder="Admin"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Grid>
    </div>
  );
};

export default Department;