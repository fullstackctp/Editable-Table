// ** React Imports
import { useEffect, useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

// Third Party Imports
import toast from "react-hot-toast";

// Custom Imports
import TableSortedBody from "./TableSortedBody";
import { Checkbox, TableCell, TableRow } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function TotalSum(rows) {
  let total = 0;
  console.log(rows, "rows of total");
  rows.map((row, index) => {
    total += parseInt(row.title);
  });
  return total;
}

const headCells = [
  {
    id: "user",
    numeric: false,
    disablePadding: true,
    label: "User",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "role",
    numeric: false,
    disablePadding: true,
    label: "Role",
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "Count",
  },
  {
    id: "plan",
    numeric: false,
    disablePadding: true,
    label: "Plan",
  },
];

const EnhancedTable = (props) => {
  // props
  const { rows, data, setRows } = props;

  // ** States
  const [dId, setDid] = useState(1);
  const [page, setPage] = useState(0);
  const [_, setRenderer] = useState(false);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("calories");
  const [roleEditable, setRoleEditable] = useState([]);
  const [userEditable, setUserEditable] = useState([]);
  const [emailEditable, setEmailEditable] = useState([]);
  const [titleEditable, setTitleEditable] = useState([]);
  const [planEditable, setPlanEditable] = useState([]);

  useEffect(() => {
    setRows(rows);
  }, [rows]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleEditable = (value, fieldName) => {
    if (fieldName === "user") {
      setRoleEditable([]);
      setEmailEditable([]);
      setTitleEditable([]);
      setPlanEditable([]);
      setUserEditable([value]);
    } else if (fieldName === "email") {
      setUserEditable([]);
      setTitleEditable([]);
      setRoleEditable([]);
      setPlanEditable([]);
      setEmailEditable([value]);
    } else if (fieldName === "user_role_id") {
      setUserEditable([]);
      setEmailEditable([]);
      setTitleEditable([]);
      setPlanEditable([]);
      setRoleEditable([value]);
    } else if (fieldName === "title") {
      setUserEditable([]);
      setEmailEditable([]);
      setRoleEditable([]);
      setPlanEditable([]);
      setTitleEditable([value]);
    } else if (fieldName === "plan") {
      setUserEditable([]);
      setEmailEditable([]);
      setTitleEditable([]);
      setRoleEditable([]);
      setPlanEditable([value]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const isEditable = (value, fieldName) => {
    if (fieldName === "user") {
      return userEditable.indexOf(value) !== -1;
    } else if (fieldName === "email") {
      return emailEditable.indexOf(value) !== -1;
    } else if (fieldName === "user_role_id") {
      return roleEditable.indexOf(value) !== -1;
    } else if (fieldName === "title") {
      return titleEditable.indexOf(value) !== -1;
    } else if (fieldName === "plan") {
      return planEditable.indexOf(value) !== -1;
    }
  };

  const ToastSuccess = () =>
    toast.success("Data Saved Successfully!", {
      position: "top-right",
      style: { marginTop: "50px" },
    });

  const handleBlur = async (event, row) => {
    if (event.target.value != row[event.target.name]) {
      rows[row.id] = { ...row, [event.target.name]: event.target.value };
      ToastSuccess();
      setRows(rows);
    }
    setUserEditable([]);
    setRoleEditable([]);
    setTitleEditable([]);
    setEmailEditable([]);
    setPlanEditable([]);
    setRenderer((prevVal) => !prevVal);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }} key={dId}>
      <Paper sx={{ width: "100%" }}>
        <TableSortedBody
          page={page}
          rows={rows}
          order={order}
          orderBy={orderBy}
          selected={selected}
          emptyRows={emptyRows}
          headCells={headCells}
          rowsPerPage={rowsPerPage}
          setRows={setRows}
          isSelected={isSelected}
          handleBlur={handleBlur}
          stableSort={stableSort}
          isEditable={isEditable}
          handleClick={handleClick}
          setSelected={setSelected}
          getComparator={getComparator}
          handleEditable={handleEditable}
          handleRequestSort={handleRequestSort}
          handleSelectAllClick={handleSelectAllClick}
        />

        <TableRow hover tabIndex={-1} role="checkbox">
          {headCells.map((headCell, index) => {
            return (
              <TableCell
                key={index}
                sx={{ paddingRight: "140px", width: "25%" }}
              >
                {headCell.numeric && TotalSum(rows.slice(0, rowsPerPage))}
              </TableCell>
            );
          })}
        </TableRow>

        <TablePagination
          page={page}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;
