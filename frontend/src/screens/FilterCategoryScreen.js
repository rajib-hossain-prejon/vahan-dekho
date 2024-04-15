import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductsByCategory } from '../actions/productActions'
import CustomCard from '../components/CustomCard'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import PaginateCategory from '../components/PaginateCategory'

const FilterCategoryScreen = ({ match }) => {
  const category = match.params.category
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
    dispatch(listProductsByCategory(category, pageNumber))
  }, [dispatch, category, pageNumber])

  return (
 <>
      <Meta />
      {!category ? (
        <h1>Category</h1>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h3>Showing {category} Cars</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
        {
         products?.length < 1 && 
         <Message>
            No Products available on this Category <Link to='/'>Go Back</Link>
          </Message>
        }
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* <Product product={product} /> */}
                <CustomCard item={product} />
              </Col>
            ))}
          </Row>
          <PaginateCategory
            pages={pages}
            page={page}
            category={category ? category : ''}
          />
        </>
      )}
    </>
  )
}

export default FilterCategoryScreen
