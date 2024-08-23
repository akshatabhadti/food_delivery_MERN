import React from 'react'
import classes from './header.module.css'
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
    const {user, logout} = useAuth();

    const { cart } = useCart();
     
  return (
    <header className={classes.header}>
    <div className={classes.container}>
    <Link to="/" className={classes.logo}>
          Go Food!
    </Link>
    <nav>
          <ul>
            {user ? (
              <li className={classes.menu_container}>
                <Link to="/login">{user.name}</Link>
                <div className={classes.menu}>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/orders">Orders</Link>
                  <Link onClick={logout}>Logout</Link>
                </div>
              </li>
            ) : (
              <Link to="/login">Login</Link>
            )}

            <li>
              <Link to="/cart">
                Cart
                {cart.totalCount > 0 && (
                  <span className={classes.cart_count}>{cart.totalCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>

    </div>
    </header>
  )
}

