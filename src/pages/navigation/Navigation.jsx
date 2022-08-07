import React, { useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../home/Home";
import ForgotPassword from "../user-forms/ForgotPassword";
import Login from "../user-forms/Login";
import ResetPassword from "../user-forms/ResetPassword";
import Verify from "../user-forms/Verify";
import { AuthContext } from "../../context/AuthContext";
import NoMatch from "../NoMatch";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import PulseLoader from "react-spinners/PulseLoader";
import { makeStyles } from "@mui/styles"; 
import UserList from "../users/UserList";
const useStyles = makeStyles((theme) => ({
  dialogStyle: {
    // backgroundColor: "red",
    "& .MuiDialog-paper": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
    // transparent
  },
}));

function PrivateRoute({ children }) {
  const { tuso_admin_panel } = useContext(AuthContext);

  return tuso_admin_panel.token ? children : <Navigate to="/" />;
}
function RedirectToHome({ children }) {
  const { tuso_admin_panel } = useContext(AuthContext);

  return !tuso_admin_panel.token ? children : <Navigate to="/home" />;
}
const Navigation = ({ openLoadingDialog, setOpenLoadingDialog }) => {
  const classes = useStyles();
  const { tuso_admin_panel } = useContext(AuthContext);

  const handleClickOpen = () => {
    setOpenLoadingDialog(true);
  };

  const handleClose = () => {
    setOpenLoadingDialog(false);
  };
  return (
    <div>
      <Dialog
        open={openLoadingDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialogStyle}
      >
        <DialogContent>
          <PulseLoader color={"black"} size={10} speedMultiplier={0.5} />{" "}
        </DialogContent>
      </Dialog>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectToHome>
              <Login />
            </RedirectToHome>
          }
        />
        <Route
          path="verify"
          element={
            <RedirectToHome>
              <Verify />
            </RedirectToHome>
          }
        />
        <Route
          path="home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route
          path="change-password"
          element={
            <PrivateRoute>
              <ResetPassword />
            </PrivateRoute>
          }
        />
        <Route
          path="user-list"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={!tuso_admin_panel.token ? <Navigate to="/" /> : <NoMatch />}
        />
      </Routes>
    </div>
  );
};

export default Navigation;
