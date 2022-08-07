import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IconButton } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";
import { getDataWithToken } from "../../services/GetDataService";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",
    // textAlign: "center",
    width: "900px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  form2: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  centerSelectStyle: {
    [`& .MuiInputLabel-outlined.MuiInputLabel-shrink`]: {
      display: "none",
    },
  },
  imgStyle: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));
const StoreDetail = () => {
  const classes = useStyles();
  const { slug } = useParams();
  const [storeDetail, setStoreDetail] = useState({});
  const [modalImg, setModalImg] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const handleClickOpen = (img) => {
    setModalImg(img);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const getDropdownData = async () => {
    let storeInfo = await getDataWithToken(
      `api/store/show-store-configuration?store_id=${slug}`
    );

    if (storeInfo.status === 200) {
      setStoreDetail(storeInfo.data.data);
    } else {
      // handleSnakbarOpen(storeInfo.data.messages.toString(), "error");
      setMessage(storeInfo.data.messages.toString());
      if (storeInfo.data.messages.length < 1) {
        setMessage("Something went wrong");
      }
    }
  };
  useEffect(() => {
    getDropdownData();
  }, []);

  return (
    <>
      {message.length > 0 ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "85vh" }}
        >
          <div className={classes.form2}>
            <img
              src="/image/logoTuso.png"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "155px" }}
            />
            <br />
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "30px" }}
            >
              {message}
            </Typography>
          </div>
        </Grid>
      ) : (
        <>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ height: "80vh" }}
          >
            <div className={classes.form}>
              <div style={{ position: "relative" }}>
                <IconButton
                  component={Link}
                  to="/store-management"
                  style={{ position: "absolute", border: "none" }}
                >
                  <ArrowBackIcon />
                </IconButton>
                <Button
                  component={Link}
                  to={`/update-store-detail/${slug}`}
                  variant="contained"
                  startIcon={<EditIcon />}
                  style={{ position: "absolute", right: 0 }}
                >
                  Edit
                </Button>
                <Typography
                  variant="h4"
                  color="info"
                  gutterBottom
                  component="div"
                  style={{ textAlign: "center" }}
                >
                  {storeDetail?.merchant?.name}'s Store
                </Typography>
              </div>
              <br />
              <Grid container columnSpacing={5}>
                <Grid item xs={7}>
                  <Table
                    aria-label="simple table"
                    style={{ border: "1px solid #dcdde1" }}
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Mobile Number</TableCell>
                        <TableCell>
                          {storeDetail?.merchant?.mobile_no}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Business Name</TableCell>
                        <TableCell>{storeDetail?.bussiness_name}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Shop Type</TableCell>
                        <TableCell>{storeDetail?.type}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Category</TableCell>
                        <TableCell>
                          {storeDetail?.store_category?.text}
                        </TableCell>
                      </TableRow>

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Location</TableCell>
                        <TableCell>{storeDetail?.address}</TableCell>
                      </TableRow>
                      {storeDetail?.latitude?.length > 0 && (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Latitude</TableCell>
                          <TableCell>{storeDetail?.latitude}</TableCell>
                        </TableRow>
                      )}
                      {storeDetail?.latitude?.length > 0 && (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>Longitude</TableCell>
                          <TableCell>{storeDetail?.longitude}</TableCell>
                        </TableRow>
                      )}

                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Visible to app?</TableCell>
                        <TableCell>
                          {storeDetail?.visibility === 1 ? "Yes" : "No"}
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Created At</TableCell>
                        <TableCell>{storeDetail?.created_at}</TableCell>
                      </TableRow>
                      {storeDetail?.type === "Online" && (
                        <>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>Store URL</TableCell>
                            <TableCell>{storeDetail?.store_url}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>Success URL</TableCell>
                            <TableCell>{storeDetail?.success_url}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>Cancel URL</TableCell>
                            <TableCell>{storeDetail?.cancel_url}</TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell>IPN URL</TableCell>
                            <TableCell>{storeDetail?.ipn_url}</TableCell>
                          </TableRow>
                        </>
                      )}
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>Remarks</TableCell>
                        <TableCell>{storeDetail?.remarks}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={5}>
                  <Table
                    aria-label="simple table"
                    style={{ border: "1px solid #dcdde1" }}
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          align="center"
                          style={{
                            fontSize: "22px",
                            cursor: "zoom-in",
                            verticalAlign: "baseline",
                          }}
                          onClick={() =>
                            handleClickOpen(storeDetail?.trade_license)
                          }
                        >
                          Trade License
                          <img
                            src={storeDetail?.trade_license}
                            alt=""
                            width="90px"
                            className={classes.imgStyle}
                          />
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            fontSize: "22px",
                            cursor: "zoom-in",
                            verticalAlign: "baseline",
                          }}
                          onClick={() =>
                            handleClickOpen(storeDetail?.store_logo)
                          }
                        >
                          Store Logo
                          <img
                            src={storeDetail?.store_logo}
                            alt=""
                            width="90px"
                            className={classes.imgStyle}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "right" }}>
          <IconButton onClick={handleClose}>
            <ClearIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <img
            src={modalImg}
            alt=""
            height="350px"
            className={classes.imgStyle}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreDetail;
