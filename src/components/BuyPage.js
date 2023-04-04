import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
import { Col, Container, Row } from 'reactstrap';
import CartItem from './CartItem';

const apiKey = "563492ad6f91700001000001d7c80164a92f4bf9bc9e16330a41c120"
const url = "https://api.pexels.com/v1/search?query=laptop&per_page=12&page=1"

const BuyPage = ({ addInCart }) => {
    const [product, _product] = useState([])

    const getImageHandler = async () => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: apiKey
                }
            });
            if (response.status === 200) {
                const productss = response.data.photos
                const allProduct = productss.map((item) => ({
                    smallImage: item.src.medium,
                    tinyImage: item.src.tiny,
                    productName: faker.random.word(),
                    productPrice: faker.commerce.price(),
                    id: faker.datatype.uuid()
                }))
                _product(allProduct)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getImageHandler()
    }, [])

    return (
        <Container fluid>
            <h1 className="text-success text-center">
                Buy Page
            </h1>
            <Row>
                {
                    product.map((item) => {
                        return (
                            <Col md={4} key={item.id}>
                                <CartItem product={item} addInCart={addInCart} />
                            </Col>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default BuyPage
