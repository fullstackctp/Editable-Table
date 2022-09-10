// React Imports
import { useEffect, useState } from "react";

// ** Custom Components Imports
import Table from "./Table/Table";
import AddUserDrawer from "./AddUserDrawer/AddUserDrawer";

// MUI Imports
import { Plus } from "mdi-material-ui";
import { Grid, Card, Button, Box } from "@mui/material";

// Create Data function
const createData = (id, user, email, user_role_id, title, plan) => {
  return { id, user, email, user_role_id, title, plan };
};

// Static Data for Table
const StaticRows = [
  createData(0, "Cupcake", "demo@gmail.com", "Editor", "Super Admin", "Basic"),
  createData(
    1,
    "Donut",
    "demo@gmail.com",
    "User",
    "Academic Coordinator",
    "Basic"
  ),
  createData(
    2,
    "Eclair",
    "demo@gmail.com",
    "Editor",
    "Director of Learning",
    "Company"
  ),
  createData(
    3,
    "Frozen yoghurt",
    "demo@gmail.com",
    "User",
    "Teacher",
    "Enterprise"
  ),
  createData(4, "Gingerbread", "demo@gmail.com", "Admin", "Teacher", "Company"),
  createData(
    5,
    "Honeycomb",
    "demo@gmail.com",
    "Editor",
    "Director of Learning",
    "Enterprise"
  ),
  createData(6, "Ice cream sandwich", "demo@gmail.com", "User", "N/A", "Team"),
  createData(7, "Jelly Bean", "demo@gmail.com", "User", "Teacher", "Team"),
  createData(8, "KitKat", "demo@gmail.com", "User", "Teacher", "Company"),
  createData(9, "Lollipop", "demo@gmail.com", "User", "Teacher", "Company"),
  createData(10, "Marshmallow", "demo@gmail.com", "User", "Teacher", "Company"),
  createData(11, "Nougat", "demo@gmail.com", "Editor", "Teacher", "Basic"),
  createData(12, "Oreo", "demo@gmail.com", "User", "Teacher", "Basic"),
];

const UsersTable = () => {
  const [rows, setRows] = useState([]);
  const [addUserOpen, setAddUserOpen] = useState(false);

  useEffect(() => {
    setRows(StaticRows);
  }, [rows, StaticRows]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12} md={12}>
        {rows.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ marginTop: "-8px" }}>
              <Table StaticRows={rows} />
            </Card>
          </Grid>
        )}

        <Box sx={{ marginTop: 3 }}>
          <Button
            sx={{ height: "42px", minWidth: "170px" }}
            color="primary"
            variant="contained"
            onClick={toggleAddUserDrawer}
          >
            Add User <Plus />
          </Button>

          <AddUserDrawer
            open={addUserOpen}
            toggle={toggleAddUserDrawer}
            setRows={setRows}
            rows={rows}
            StaticRows={StaticRows}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default UsersTable;
