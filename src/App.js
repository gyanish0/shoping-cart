import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Col, Container, Row } from 'reactstrap';
import BuyPage from './components/BuyPage';
import Cart from './components/Cart';

const App = () => {
    const [cartItem, _cartItem] = useState([]);

    const addInCart = (item) => {
        const isAlreadyAdded = cartItem.findIndex(function (array) {
            return array.id === item.id
        })
        if (isAlreadyAdded !== -1) {
            toast.error("already added in cart");
            return;
        }
        _cartItem([...cartItem, item])
    }

    const buyNow = () => {
        _cartItem([])

        toast.success("Purchase Complete")
    }
    const removeItem = (item) => {
        _cartItem(cartItem.filter(singleItem => singleItem.id !== item.id))
    }

    return (
        <Container fluid>
            <Row>
                <Col md="8">
                    <BuyPage addInCart={addInCart} />
                </Col>
                <Col md="4">
                    <Cart buyNow={buyNow} removeItem={removeItem} cartItem={cartItem} />
                </Col>
            </Row>
        </Container>
    )
}

export default App
