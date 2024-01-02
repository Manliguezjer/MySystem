import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Mainform from "./Mainform";
import LogoutForm from "./LogoutForm";
import NavBar from "./navBar"; // Update the import to match your actual file structure
import SideBar from "./sideBar"; // Assuming you have a SideBar component
import Tickets from "./tickets"; // Assuming you have a Tickets component
import Ticket from "./ticket"; // Assuming you have a Ticket component
import TicketListForm from "./TicketListForm";
import Login from "./login"; // Assuming you have a Login component
import TicketForm from "./ticketForm"; // Update the import to match your actual file structure

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    padding: theme.spacing(10),
  },
}));

const App = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
       
          <>
            <NavBar open={open} handleDrawerOpen={handleDrawerOpen} onLogout={handleLogout} />
            <SideBar open={open} handleDrawerClose={handleDrawerClose} />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Switch>
                <Route path="/" exact>
                  <Mainform/>
                </Route>
                <Route path="/tickets">
                  <TicketListForm />
                </Route>
                <Route path="/ticket/:id">
                  <Ticket />
                </Route>
                <Route path="/ticketForm">
                  <TicketForm />
                </Route>
                <Route path="/">
                  <TicketForm />
                </Route>
              </Switch>
            </main>
          </>
       
         
     
      </div>
    </Router>
  );
};

export default App;
