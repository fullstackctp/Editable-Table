// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Drawer from "@mui/material/Drawer";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// ** Icons Imports
import Close from "mdi-material-ui/Close";

const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(3, 4),
  justifyContent: "space-between",
  backgroundColor: theme.palette.background.default,
}));

const schema = yup.object().shape({
  user: yup.string().required(),
  title: yup.string().required(),
  email: yup.string().email().required(),
});

const defaultValues = {
  user: "",
  email: "",
  title: "",
};

const AddUserDrawer = (props) => {
  // ** Props
  const { open, toggle, rows, setRows, StaticRows } = props;

  // ** State
  const [role, setRole] = useState("User");
  const [plan, setPlan] = useState("Basic");

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    toggle();
    values = { ...values, user_role_id: role, plan };
    if (
      values.email &&
      values.user_role_id &&
      values.user &&
      values.plan &&
      values.title
    ) {
      return;
    }
    const nextIndex = rows.slice(-1)[0].id + 1;
    const row = {
      id: nextIndex,
      user: "Jelly Bean",
      ...values,
    };
    StaticRows.push(row);
    console.log(StaticRows, "row is here of new");
    setRows(StaticRows);
    console.log(values, "values is here", values);
    reset();
  };

  const handleClose = () => {
    setRole("User");
    setPlan("Basic");
    toggle();
    reset();
  };

  return (
    <>
      <Drawer
        open={open}
        anchor="right"
        variant="temporary"
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography variant="h6">Add User</Typography>
          <Close
            fontSize="small"
            onClick={handleClose}
            sx={{ cursor: "pointer" }}
          />
        </Header>
        <Box sx={{ p: 5 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="user"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label="User"
                    onChange={onChange}
                    placeholder="John Doe"
                    error={Boolean(errors.user)}
                  />
                )}
              />
              {errors.user && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.user.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    type="email"
                    value={value}
                    label="Email"
                    onChange={onChange}
                    placeholder="johndoe@email.com"
                    error={Boolean(errors.email)}
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField
                    value={value}
                    label="Title"
                    onChange={onChange}
                    placeholder="Title"
                    error={Boolean(errors.title)}
                  />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: "error.main" }}>
                  {errors.title.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id="role-select">Select Role</InputLabel>
              <Select
                fullWidth
                value={role}
                id="select-role"
                label="Select Role"
                labelId="role-select"
                onChange={(e) => setRole(e.target.value)}
                inputProps={{ placeholder: "Select Role" }}
              >
                <MenuItem value={"User"}>User</MenuItem>
                <MenuItem value={"Editor"}>Editor</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id="plan-select">Select Plan</InputLabel>
              <Select
                fullWidth
                value={plan}
                id="select-plan"
                label="Select Plan"
                labelId="plan-select"
                onChange={(e) => setPlan(e.target.value)}
                inputProps={{ placeholder: "Select Plan" }}
              >
                <MenuItem value="Basic">Basic</MenuItem>
                <MenuItem value="Company">Company</MenuItem>
                <MenuItem value="Enterprise">Enterprise</MenuItem>
                <MenuItem value="Team">Team</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                sx={{ mr: 3 }}
              >
                Add
              </Button>
              <Button
                size="large"
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default AddUserDrawer;
