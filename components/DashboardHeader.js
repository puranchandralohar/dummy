import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Clear localStorage data
    router.push('/'); // Redirect to the login page after logout
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" component="div">
          <Link href="/profile" passHref>
            <Button className={styles.navButton}>Profile</Button>
          </Link>
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
    </AppBar>
  );
};

export default Navbar;