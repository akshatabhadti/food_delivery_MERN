import React from 'react'
import classes from './cartPage.module.css';
import { useCart } from '../../../hooks/useCart';
import Title from '../../Title/Title';
import { Link } from 'react-router-dom';
//import { sample_foods } from '../../../../backend/src/data';

export default function CartPage() {
    const { cart, loading, removeFromCart, changeQuantity } = useCart();

    // Check if cart or cart.items is undefined before accessing its properties
    const itemsCount = cart && cart.items ? cart.items.length : 0;

    const handleQuantityChange = (e, item) => {
        const newQuantity = parseInt(e.target.value);
        changeQuantity(item, newQuantity);
    };

    const handleRemoveItemClick = (foodId) => {
        removeFromCart(foodId);
    };

    return (
        <div className={classes.container}>
            {loading ? (
                <p>Loading...</p>
            ) : itemsCount > 0 ? (
                <>
                    <ul className={classes.list}>
                        {cart.items.map(item => (
                            <li key={item.food.id}>
                                <div>
                                    <img src={`${item.food.imageUrl}`} alt={item.food.name} />
                                </div>
                                <div>
                                    <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                                </div>
                                <div>
                                    <select value={item.quantity} onChange={(e) => handleQuantityChange(e, item)}>
                                        {[...Array(10).keys()].map((val) => (
                                            <option key={val + 1} value={val + 1}>{val + 1}</option>
                                        ))}
                                    </select>
            
                                </div>
                                <div>
                                     {/* Display price with dollar symbol */}
                                     <span>Price: &#8377;{item.food.price}</span>
                                </div>
                                <div>
                                    <button className={classes.remove_button} onClick={() => handleRemoveItemClick(item.food.id)}>
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={classes.checkout}>
                        <div>
                            <div>
                                <span>
                                    <Title title="Cart" />
                                </span>
                            </div>
                            <div className={classes.foods_count}>{cart.totalCount}</div>
                            <div className={classes.total_price}>
                                <span>&#8377;{cart.totalPrice}</span>
                            </div>
                        </div>
                        <Link to="/checkout">Proceed To Checkout</Link>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
}