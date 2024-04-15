import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductsByColor } from '../actions/productActions'
import CustomCard from '../components/CustomCard'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import PaginateColor from '../components/PaginateColor'

const FilterScreen = ({ match }) => {
  const color = match.params.color
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
    dispatch(listProductsByColor(color, pageNumber))
  }, [dispatch, color, pageNumber])

  return (
 <>
      <Meta />
      {!color ? (
        <h1>Color</h1>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h3>Showing {color} Cars</h3>
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
          <PaginateColor
            pages={pages}
            page={page}
            color={color ? color : ''}
          />
        </>
      )}
    </>
  )
}

export default FilterScreen
