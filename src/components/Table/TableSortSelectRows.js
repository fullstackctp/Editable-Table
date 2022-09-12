// ** MUI Imports

import Checkbox from "@mui/material/Checkbox";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import { MenuItem, TextField } from "@mui/material";

// Third Party Imports
import { Formik } from "formik";

function TableSortSelectRows(props) {
  // props
  const {
    row,
    labelId,
    handleBlur,
    handleClick,
    isUserEditable,
    isRoleEditable,
    handleEditable,
    isItemSelected,
    isEmailEditable,
    isTitleEditable,
    isPlanEditable,
  } = props;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        user: row.user || "",
        email: row.email || "",
        user_role_id: row.user_role_id || "",
        title: row.title || "",
        plan: row.plan || "",
      }}
    >
      {(formik) => {
        return (
          <TableRow
            hover
            tabIndex={-1}
            role="checkbox"
            selected={isItemSelected}
            aria-checked={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={(event) => handleClick(event, row.id)}
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>

            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              sx={{ maxWidth: "5px" }}
            >
              {!isUserEditable ? (
                <Typography
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 22px 0 0",
                  }}
                  variant="body2"
                  onClick={(event) => {
                    handleEditable(row.user, "user");
                  }}
                >
                  {row.user}
                </Typography>
              ) : (
                <TextField
                  label=""
                  autoFocus
                  name="user"
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={formik.values.user}
                  onChange={formik.handleChange}
                  onBlur={(event) => handleBlur(event, row)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && handleBlur(event, row)
                  }
                />
              )}
            </TableCell>

            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              sx={{ maxWidth: "100px" }}
            >
              {!isEmailEditable ? (
                <Typography
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 22px 0 0",
                  }}
                  variant="body2"
                  onClick={(event) => handleEditable(row.id, "email")}
                >
                  {row.email}
                </Typography>
              ) : (
                <TextField
                  label=""
                  autoFocus
                  name="email"
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={(event) => handleBlur(event, row)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && handleBlur(event, row)
                  }
                />
              )}
            </TableCell>

            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              sx={{ minWidth: "100px" }}
            >
              {!isRoleEditable ? (
                <Typography
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 22px 0 0",
                  }}
                  variant="body2"
                  onClick={(event) => handleEditable(row.id, "user_role_id")}
                >
                  {row.user_role_id}
                </Typography>
              ) : (
                <TextField
                  label=""
                  select
                  autoFocus
                  name="user_role_id"
                  size="small"
                  variant="outlined"
                  id="outlined-basic"
                  sx={{ minWidth: "50%" }}
                  value={formik.values.user_role_id}
                  onBlur={(event) => handleBlur(event, row)}
                  onChange={(event) => {
                    handleBlur(event, row);
                    formik.handleChange(event);
                  }}
                >
                  <MenuItem value={"User"}>User</MenuItem>
                  <MenuItem value={"Editor"}>Editor</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </TextField>
              )}
            </TableCell>

            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              sx={{ width: "20%" }}
            >
              {!isTitleEditable ? (
                <Typography
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 22px 0 0",
                  }}
                  variant="body2"
                  onClick={(event) => handleEditable(row.id, "title")}
                >
                  {row.title}
                </Typography>
              ) : (
                <TextField
                  type={"number"}
                  label=""
                  autoFocus
                  name="title"
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={parseInt(formik.values.title)}
                  onChange={formik.handleChange}
                  onBlur={(event) => handleBlur(event, row)}
                  onKeyDown={(event) =>
                    event.key === "Enter" && handleBlur(event, row)
                  }
                />
              )}
            </TableCell>

            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="none"
              sx={{ width: "200px" }}
            >
              {!isPlanEditable ? (
                <Typography
                  sx={{
                    cursor: "pointer",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    padding: "0 22px 0 0",
                  }}
                  variant="body2"
                  onClick={(event) => handleEditable(row.user, "plan")}
                >
                  {row.plan}
                </Typography>
              ) : (
                <TextField
                  label=""
                  select
                  autoFocus
                  name="plan"
                  size="small"
                  variant="outlined"
                  id="outlined-basic"
                  sx={{ minWidth: "88%" }}
                  value={formik.values.plan}
                  onBlur={(event) => handleBlur(event, row)}
                  onChange={(event) => {
                    handleBlur(event, row);
                    formik.handleChange(event);
                  }}
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Company">Company</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                  <MenuItem value="Team">Team</MenuItem>
                </TextField>
              )}
            </TableCell>
          </TableRow>
        );
      }}
    </Formik>
  );
}

export default TableSortSelectRows;
