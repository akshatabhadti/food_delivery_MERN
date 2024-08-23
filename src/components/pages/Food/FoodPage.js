import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './foodPage.module.css';
import { getById } from '../../../services/foodService';
import Price from '../../Price/Price';
import StarRating from '../../StarRating/StarRating';
import { useCart } from '../../../hooks/useCart';

export default function FoodPage() {
    const [food, setFood] = useState({});
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(food);
    navigate('/cart');
  };


    useEffect(() => {
        getById(id).then(setFood);
      },[id]);

  return (
    <>
      {food && (
        <div className={classes.container}>
        <img
            className={classes.image}
            src={`${food.imageUrl}`}
            alt={food.name}
        />
        <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? '' : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>
                
        </div>
        <div className={classes.origins}>
              {food.origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
        </div>
        

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
      )}
    </>
  );
}