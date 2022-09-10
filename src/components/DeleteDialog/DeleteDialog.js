import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DeleteDialog({
  arrayHelpers,
  index,
  selected,
  setRows,
  rows,
  setSelected,
}) {
  const [open, setOpen] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("sm");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    let newRows = [];
    console.log(rows);
    rows.forEach((element, index) => {
      if (selected.indexOf(element.id) === -1) {
        newRows.push(element);
      }
    });
    setRows(newRows);
    setSelected([]);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Grid
            container
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "20px",
            }}
          >
            <Grid item sx={{ marginTop: "20px" }}>
              <Typography textAlign="center" variant="h5">
                Delete this row or field
              </Typography>
            </Grid>
          </Grid>
        </BootstrapDialogTitle>

        <DialogContent
          sx={{
            marginTop: "20px",
            height: "260px",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <Grid container sx={{ minHeight: "128px" }}>
            <Grid
              container
              item
              lg={12}
              spacing={6}
              sx={{ padding: "10px 20px 10px 20px" }}
            >
              <Grid
                lg={12}
                md={4}
                sm={12}
                xs={12}
                item
                sx={{ textAlign: "center" }}
              >
                <Typography gutterBottom>
                  Are you sure you want to delete this user ?
                  <br />
                  This action can't be undone.
                  <br />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ minWidth: "250px" }}>
            <Grid
              lg={6}
              item
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                onClick={() => handleDelete(arrayHelpers, index)}
                size="large"
                color="primary"
                variant="contained"
              >
                Delete
              </Button>
            </Grid>
            <Grid lg={6} item>
              <Button size="large" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
