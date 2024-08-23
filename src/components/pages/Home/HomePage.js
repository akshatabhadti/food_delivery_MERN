import React, { useEffect, useReducer } from 'react';
import { getAll } from '../../../services/foodService';
import Thumbnails from '../../Thumbnails/Thumbnails';
//import { useParams } from 'react-router-dom';


const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};


export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;
  //const { searchTerm } = useParams();

  useEffect(() => {
    getAll().then(foods => {
      dispatch({ type: 'FOODS_LOADED', payload: foods });
    }).catch(error => {
      console.error('Error fetching food data:', error);
    });
  }, []);
  

  /*useEffect(() => {
    const loadFoods = searchTerm ? search(searchTerm) : getAll();
    loadFoods.then(foods => dispatch({ type: 'FOODS_LOADED', payload: foods }));
  }, [searchTerm]); // Add searchTerm as a dependency if it's used inside the useEffect
  */
  return (
    <>
    <Thumbnails foods={foods} />
    </>
  )
}
