import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography"; // Import Typography
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";

const columns = [
  { id: "ticket id", label: "Ticket ID", minWidth: 170 },
  { id: "Name", label: "Name", minWidth: 170 },
  { id: "Address", label: "Address", minWidth: 170 },
  { id: "Contact Number", label: "Contact Number", minWidth: 170 },
  { id: "Status", label: "Status", minWidth: 170 },
  { id: "Ticket Date", label: "Ticket Date", minWidth: 170 },
  { id: "Time", label: "Time", minWidth: 170 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  search: {
    marginLeft: 10,
    marginBottom: 10,
  },
  header: {
    textAlign: "center",
    margin: "20px 0",
  },
});

export default function Tickets() {
  const classes = useStyles();

  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset page when the search term changes
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/ticket-info");
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching ticket information:", error);
      }
    };

    fetchData();
  }, []);

  const filteredTickets = tickets.filter((row) =>
    typeof row["Name"] === "string" &&
    row["Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return tickets.length === 0 ? (
    "No tickets found"
  ) : (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.header}>
        Ticket Records
      </Typography>
      <TextField
        className={classes.search}
        label="Search"
        variant="outlined"
        onChange={handleSearchChange}
        value={searchTerm}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="left"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row["ticket id"]}
                >
                  {columns.map((column) => (
                    <TableCell key={column.id} align="left">
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredTickets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
