import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});
export const NavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/store"
        label="Store"
        value="StorePage"
      />
      <BottomNavigationAction
        component={Link}
        to="/candidato"
        label="Nombre Candidato"
        value="CandidatoPage"
      />
    </BottomNavigation>
  );
};
