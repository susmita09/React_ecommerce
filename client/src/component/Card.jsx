import React from "react";
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";
import { Favorite, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { addToCart } from "../redux/actions/cartActions";
import { addToWishList } from '../redux/actions/wishAction';

import { toast } from 'react-toastify';
import './Card.css';

const Card = ({ item }) => {

    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const carousel = useCallback(() => {
        setTimeout(() => {
            if (index < 1) {
                setIndex(index + 1);
            }
            else {
                setIndex(0);
            }
        }, 1000)
    }, [index]);

    useEffect(() => {
        show && carousel()
    }, [show, carousel]);


    const addtoCart = () => {
        const product = {
            quantity: 1,
            _id: item._id,
            img: item.img,
            title: item.title,
            size: "S",
            color: "red",
            price: item.price
        }
        dispatch(addToCart({ ...product }));
        toast.success("product added", { position: "top-right" });
    }

    const addtoWish = () => {
       
        dispatch(addToWishList({...item}));
       
    }

   
    return (
        <div className="card">
            <div className="card__heart" onClick={() => addtoWish()}>
                <Tooltip title="WishList">
                    <Favorite />
                </Tooltip>
            </div>
            <div className="card__image">
                <img src={item.img[index].url}
                    alt='image' onMouseOver={() => setShow(true)} onMouseLeave={() => setShow(false)} />
            </div>
            <div className="product__details">


                <div className="card__details">
                    <p className='title'>{item.title}</p>

                    <p className='description'>Size : {item.size}</p>
                    <span className='span1'>Rs.{item.price}</span>
                    <span className='span2'>Rs. 300</span>
                    <span className='span3'>(30% OFF)</span>
                </div>
                <div className="card__icons">
                    <div className="icon">
                        <Tooltip title="search">
                            <Link to={`/product/${item._id}`}>
                                <SearchOutlined />
                            </Link>
                        </Tooltip>
                    </div>
                    <div className="icon" onClick={() => addtoCart()}>
                        <Tooltip title="add to cart">
                            <ShoppingCartOutlined />
                        </Tooltip>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Card;