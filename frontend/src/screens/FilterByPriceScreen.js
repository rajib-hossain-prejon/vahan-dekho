import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductsByPrice } from '../actions/productActions'
import CustomCard from '../components/CustomCard'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import PaginateByPrice from '../components/PaginateByPrice'

const FilterByPriceScreen = ({ match }) => {
  const minPrice = match.params.minPrice
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

      useEffect(() => {
    // console.log(document.getElementsByTagName('main')[0])
    document.getElementsByTagName('main')[0].style.background = '';

    return () => {
      document.getElementsByTagName('main')[0].style.background = ''
    }
  })
  useEffect(() => {
    dispatch(listProductsByPrice(minPrice, pageNumber))
  }, [dispatch, minPrice, pageNumber])

  return (
 <>
      <Meta />
      {!minPrice ? (
        <h1>Price</h1>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h3>Showing Cars of Minimum Price {minPrice} </h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* <Product product={product} /> */}
                <CustomCard item={product} />
              </Col>
            ))}
          </Row>
          <PaginateByPrice
            pages={pages}
            page={page}
            minPrice={minPrice ? minPrice : ''}
          />
        </>
      )}
    </>
  )
}

export default FilterByPriceScreen
