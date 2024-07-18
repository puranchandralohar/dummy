import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import styles from "../styles/Navbar.module.css";
import ProfileDialog from "./ProfileDialog";

const Navbar = () => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("googleUser"));
    if (user) {
      setUserDetails(user);
    }
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" component="div">
          <IconButton onClick={handleOpenDialog}>
            {userDetails ? (
              <Avatar alt={userDetails.name} src={userDetails.picture} />
            ) : (
              <Button className={styles.navButton}>Profile</Button>
            )}
          </IconButton>
        </Typography>

        <div className={styles.navbarNav}>
          <Typography variant="h6" component="div">
            <Link href="/app" passHref>
              <Button className={styles.navButton}>App</Button>
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            <Link href="/link" passHref>
              <Button className={styles.navButton}>Link</Button>
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            <Button className={styles.navButton} onClick={handleLogout}>
              Logout
            </Button>
          </Typography>
        </div>
      </Toolbar>
      <ProfileDialog open={dialogOpen} onClose={handleCloseDialog} />
    </AppBar>
  );
};

export default Navbar;
