import React, { useEffect, useState } from 'react'
import '../style/ShoppingCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { add, remove, removesingleitem } from '../Redux/cartSlice'
import {loadStripe} from '@stripe/stripe-js';
const ShoppingCard = () => {
  const [price, setPrice]= useState();
  const [qty, setQuantity]=useState();
    const dispatch = useDispatch();
    const Delete =(id)=>{
          dispatch(remove(id))
    }
    const increment =(x)=>{
     dispatch(add(x))
    }
    const decrement =(x)=>{
      dispatch(removesingleitem(x))
     }
    const getdata = useSelector((state)=>state.cartReducer.carts)

    const totalPrice = ()=>{
      let totalp = 0;
      getdata.map((x)=>{
        totalp += x.price * x.qty;
      })
        setPrice(totalp);
    }
    const totalQty =()=>{
      let totalq = 0;
      getdata.map((x)=>{
        totalq += x.qty;
      })
      setQuantity(totalq);
    }
    useEffect(()=>{
      totalPrice();
      totalQty();
    })
  //   const makepayment= async()=>{
  //   const stripe= await loadStripe('pk_test_51Oo4OlHQoq0yTb3jxPf0cXJD5OPpXbfXwsMIF8YbUFSEob0gChxHW5QkC2xVqhoLZ99bGjFZafsGXcb5HdvF3gqi00QZtfTZg1')
  //   const  body ={
  //     product :getdata
  //   }
  //   const headers ={
  //     'Content-Type': 'application/json'
  //   }
  //  const response =  fetch('http://localhost:7000/api/user', {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   })
  //   const sesstion = await response.json();
  //   const result = stripe.redirectToCheckout({
  //     sessionId: sesstion.id
  //   })
  //   if(result.error){
  //     console.log(result.error)
  //   }
  //   }
  const makepayment = async()=>{
    const stripe = await loadStripe("pk_test_51Oo4OlHQoq0yTb3jxPf0cXJD5OPpXbfXwsMIF8YbUFSEob0gChxHW5QkC2xVqhoLZ99bGjFZafsGXcb5HdvF3gqi00QZtfTZg1");

    const body = {
        products:getdata
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch("http://localhost:7000/api/user",{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}
  return (
   <div className="container bootdey mt-5">
  <div className="row bootstrap snippets ">
    
    <div className="clearfix visible-sm" />
    {/* Cart */}
    <div className="col-lg-9 col-md-9 col-sm-12 m-auto">
      <div className="col-lg-12 col-sm-12 bg-dark text-white p-2 mt-5">
        <span className="title ">SHOPPING CART</span>
      </div>
      <div className="col-lg-12 col-sm-12 hero-feature">
        <div className="table-responsive">
          <table className="table table-bordered tbl-cart">
            <thead>
              <tr>
                <td className="hidden-xs">Image</td>
                <td>Product Name</td>
                <td>-</td>
             
                <td className="td-qty">Quantity</td>
                <td>+</td>
                <td>Unit Price</td>
                <td>Sub Total</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
             {getdata.map((x)=>{
                return(
                    <tr>
                    <td className="hidden-xs">
                      <a href="#">
                        <img src={x.image}alt="Age Of Wisdom Tan Graphic Tee" title width={47} height={47} />
                      </a>
                    </td>
                    <td><a href="#" className='img1'>{x.title}</a>
                    </td>
                    <td>
                    <a href='#' ><button className='bg-primary' onClick={()=>decrement(x)}>-</button></a>
                    </td>
                    <td>{x.qty}</td>
                    <td>
                    <a href='#' className='plus'><button className='bg-warning' onClick={()=>increment(x)}>+</button></a>
                    </td>
                    <td className="price">$ {x.price}</td>
                    <td>$ {x.qty*x.price}</td>
                    <td className="text-center">
                      <a onClick={()=>Delete(x.id)} href="#" className="remove_cart" rel={2}>
                        <i className="fa fa-trash-o" />
                      </a>
                    </td>
                  </tr>
                )
             })}
           
              <tr>
                <td colSpan={6} align="right">Total</td>
                <td className="total" colSpan={2}><b>$ {price}</b>
                </td>
              </tr>
              <tr>
              <td colSpan={6} align="right">Total Quantity</td>
              <td className="total" colSpan={2}><b>$ {qty}</b>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className="btn-group btns-cart">
          <Link to='/product'><button type="button" className="btn btn-primary"><i className="fa fa-arrow-circle-left" /> Continue Shopping</button></Link>
          <button type="button" className="btn btn-primary">Update Cart</button>
          <button type="button" className="btn btn-primary" onClick={makepayment}>Checkout <i className="fa fa-arrow-circle-right" /></button>
        </div>
      </div>
    </div>
    {/* End Cart */}
  </div>
</div>

  )
}

export default ShoppingCard