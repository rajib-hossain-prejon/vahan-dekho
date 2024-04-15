import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Footer from './components/Footer'
import HeaderNavBar from './components/HeaderNavBar'
import CartScreen from './screens/CartScreen'
import FilterCategoryScreen from './screens/FilterCategoryScreen'
import FilterScreen from "./screens/FilterScreen"
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import OrderListScreen from './screens/OrderListScreen'
import OrderScreen from './screens/OrderScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductScreen from './screens/ProductScreen'
import ProfileScreen from './screens/ProfileScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import TestScreen from './screens/TestScreen'

import UserEditScreen from './screens/UserEditScreen'
import UserListScreen from './screens/UserListScreen'

const App = () => {
  document.title = "Vahan Dekho"

  return (
    <Router>
      {/* <Header /> */}
      
      <HeaderNavBar/>
      <main className='py-3'>
        <Container>
          <Route path='/test' component={TestScreen} />
          
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route
            path='/admin/productlist'
            component={ProductListScreen}
            exact
          />
          
          <Route
            path='/admin/productlist/:pageNumber'
            component={ProductListScreen}
            exact
          />
          <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
          <Route path='/admin/orderlist' component={OrderListScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/colorFilter/:color' component={FilterScreen} exact />
          <Route path='/categoryFilter/:category' component={FilterCategoryScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route
            path='/colorFilter/:color/page/:pageNumber'
            component={FilterScreen}
            exact
          />
          <Route
            path='/categoryFilter/:category/page/:pageNumber'
            component={FilterCategoryScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
