// ** React Imports
import { Fragment } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import { visuallyHidden } from "@mui/utils";
import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";

// Custom Imports
import TableSortSelectRows from "./TableSortSelectRows";

// ** Icons Imports
import DeleteDialog from "../DeleteDialog/DeleteDialog";

// head Cells for Buttons
const headCellsButtons = [
  {
    id: "delete",
    label: "delete",
  },
  {},
  {},
  {},
  {},
];

function EnhancedTableHead(props) {
  // ** Props
  const {
    rows,
    order,
    setRows,
    orderBy,
    rowCount,
    selected,
    headCells,
    numSelected,
    setSelected,
    onRequestSort,
    onSelectAllClick,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            onChange={onSelectAllClick}
            checked={rowCount > 0 && numSelected === rowCount}
            inputProps={{ "aria-label": "select all desserts" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
          />
        </TableCell>

        {numSelected > 0
          ? headCellsButtons.map((button, index) => {
              return (
                <TableCell key={index} sx={{ padding: "0" }}>
                  {button?.label && (
                    <DeleteDialog
                      selected={selected}
                      componentName={"tableSorted"}
                      setRows={setRows}
                      rows={rows}
                      setSelected={setSelected}
                    />
                  )}
                </TableCell>
              );
            })
          : headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                sx={{
                  position: "relative",
                }}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  onClick={createSortHandler(headCell.id)}
                  direction={orderBy === headCell.id ? order : "asc"}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>

                <Box
                  sx={{
                    top: "15px",
                    right: "30px",
                    height: "14px",
                    position: "absolute",
                    borderRight: "3px solid gray",
                  }}
                ></Box>
              </TableCell>
            ))}
      </TableRow>
    </TableHead>
  );
}

function EditableTable(props) {
  const {
    rows,
    page,
    order,
    orderBy,
    setRows,
    selected,
    headCells,
    emptyRows,
    handleBlur,
    isSelected,
    isEditable,
    stableSort,
    handleClick,
    rowsPerPage,
    setSelected,
    getComparator,
    handleEditable,
    handleRequestSort,
    handleSelectAllClick,
  } = props;

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
        <EnhancedTableHead
          rows={rows}
          order={order}
          setRows={setRows}
          orderBy={orderBy}
          selected={selected}
          headCells={headCells}
          rowCount={rows.length}
          setSelected={setSelected}
          numSelected={selected.length}
          onRequestSort={handleRequestSort}
          onSelectAllClick={handleSelectAllClick}
        />

        <TableBody id="table">
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const isUserEditable = isEditable(row.user, "user");
              const isEmailEditable = isEditable(row.id, "email");
              const isRoleEditable = isEditable(row.id, "user_role_id");
              const isTitleEditable = isEditable(row.id, "title");
              const isPlanEditable = isEditable(row.user, "plan");

              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <Fragment key={labelId}>
                  <TableSortSelectRows
                    row={row}
                    labelId={labelId}
                    handleBlur={handleBlur}
                    handleClick={handleClick}
                    isUserEditable={isUserEditable}
                    isItemSelected={isItemSelected}
                    handleEditable={handleEditable}
                    isRoleEditable={isRoleEditable}
                    isEmailEditable={isEmailEditable}
                    isTitleEditable={isTitleEditable}
                    isPlanEditable={isPlanEditable}
                  />
                </Fragment>
              );
            })}
          {emptyRows > 0 && (
            <TableRow
              sx={{
                height: 53 * emptyRows,
              }}
            >
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EditableTable;
