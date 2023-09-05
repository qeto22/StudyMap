import { Container } from "@mui/system";
import Cart from "../cart/Cart";
import CreditCardForm from "./CreditCardForm";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function PaymentBody() {

    const [cartItemIds, setCartItemIds] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
    const [cartItems, setCartItems] = useState([]);

    const mentorshipCartItem = JSON.parse(localStorage.getItem('mentorshipPayment') || 'null');

    useEffect(() => {
        if (cartItemIds.length === 0) {
            if (mentorshipCartItem === null) {
                setCartItems([]);
                return;
            }
            setCartItems([{
                id: mentorshipCartItem.notification.sender.id,
                title: 'Mentorship from ' + mentorshipCartItem.notification.sender.name,
                imageUrl: '/image/' + mentorshipCartItem.notification.sender.imageUrl,
                author: {
                    name: mentorshipCartItem.notification.sender.name
                },
                price: mentorshipCartItem.amount,
                type: 'MENTORSHIP'
            }]);
            return;
        }

        const fetchCartItems = async () => {
            const cartItems = await Promise.all(cartItemIds.map(async (cartItemId) => {
                const response = await fetch(`http://localhost:8080/api/v1/course/${cartItemId}`);
                const course = await response.json();
                course.type = 'COURSE';
                return course;
            }));
            
            let newCartItems = [...cartItems];
            if (mentorshipCartItem) {
                newCartItems = [...cartItems, {
                    id: mentorshipCartItem.notification.sender.id,
                    title: 'Mentorship from ' + mentorshipCartItem.notification.sender.name,
                    imageUrl: '/image/' + mentorshipCartItem.notification.sender.imageUrl,
                    author: {
                        name: mentorshipCartItem.notification.sender.name
                    },
                    price: mentorshipCartItem.amount,
                    type: 'MENTORSHIP'
                }];
            }
            setCartItems(newCartItems);
        }

        fetchCartItems();
    }, [cartItemIds]);

    const removeCartItem = (idToRemove) => {
        const newCartItemIds = cartItemIds.filter((existingCartItemId) => existingCartItemId !== idToRemove);
        setCartItemIds(newCartItemIds);
        localStorage.setItem('cart', JSON.stringify(newCartItemIds));
    }

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    if (cartItems.length === 0) {
        return (<Container maxWidth="lg" style={{
            margin: "25px auto"
        }}>
            <Typography variant="h6">Billing & Payment</Typography>
            <Grid container style={{ border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "6px", padding: "15px", marginTop: "20px" }}>
                <Grid item md={12} style={{ display: "flex", flexDirection: "column" }}>
                    <img alt="empty cart img" src="/empty-cart.png" style={{ margin: "0 auto", width: "150px", height: "150px", opacity: "0.5" }} />
                    <Typography style={{ color: "rgba(255, 255, 255, 0.6)", textAlign: "center", marginBottom: "5px" }}>Your cart is empty</Typography>
                </Grid>
            </Grid>
        </Container>)
    }

    return (<Container maxWidth="lg" style={{
        margin: "25px auto"
    }}>
        <Typography variant="h6">Billing & Payment</Typography>
        <Grid container style={{ border: "1px solid rgba(255, 255, 255, 0.3)", borderRadius: "6px", padding: "30px", marginTop: "20px" }}>
            <Grid item md={8.25}>
                <Cart cartItems={cartItems} removeCartItem={removeCartItem}></Cart>
                <PaymentMethod></PaymentMethod>
            </Grid>
            <Grid item md={0.5}>
            </Grid>
            <Grid item md={3.25}>
                <OrderSummary subtotal={totalPrice} serviceFee={0} />
                <CreditCardForm cartItemIds={cartItemIds} />
            </Grid>
        </Grid>
    </Container>)
}

export default PaymentBody;