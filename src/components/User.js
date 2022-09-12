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
  createData(0, "Cupcake", "demo@gmail.com", "Editor", 1, "Basic"),
  createData(1, "Donut", "demo@gmail.com", "User", 2, "Basic"),
  createData(2, "Eclair", "demo@gmail.com", "Editor", 3, "Company"),
  createData(3, "Frozen yoghurt", "demo@gmail.com", "User", 4, "Enterprise"),
  createData(4, "Gingerbread", "demo@gmail.com", "Admin", 5, "Company"),
  createData(5, "Honeycomb", "demo@gmail.com", "Editor", 6, "Enterprise"),
  createData(6, "Ice cream sandwich", "demo@gmail.com", "User", 7, "Team"),
  createData(7, "Jelly Bean", "demo@gmail.com", "User", 8, "Team"),
  createData(8, "KitKat", "demo@gmail.com", "User", 9, "Company"),
  createData(9, "Lollipop", "demo@gmail.com", "User", 10, "Company"),
  createData(10, "Marshmallow", "demo@gmail.com", "User", 11, "Company"),
  createData(11, "Nougat", "demo@gmail.com", "Editor", 12, "Basic"),
  createData(12, "Oreo", "demo@gmail.com", "User", 13, "Basic"),
];

const UsersTable = () => {
  const [rows, setRows] = useState(StaticRows);
  const [addUserOpen, setAddUserOpen] = useState(false);

  useEffect(() => {
    setRows(rows);
  }, [rows]);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={12} md={12}>
        {rows.length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ marginTop: "-8px" }}>
              <Table rows={rows} setRows={setRows} />
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

          <Button
            onClick={() => console.log(rows)}
            sx={{
              height: "42px",
              minWidth: "170px",
              fontSize: "14px",
              marginLeft: 5,
              whiteSpace: "nowrap",
            }}
            color="secondary"
            variant="outlined"
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UsersTable;
