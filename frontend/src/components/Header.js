import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { logout } from '../actions/userActions'
import classes from './Header.module.css'
import SearchBox from './SearchBox'


const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  const searchModel = (e) => {
    // console.log(e.target);
    if(e.target.classList.contains('dropdown-item')) {
      const ele = e.target;
      console.log(ele.textContent);
      history.push(`/search/${ele.textContent}`)
    }
  }



  return (
    <header>
      <Navbar bg='info' variant='danger' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <h1 className={classes.Headername}>Vahan Dekho</h1>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Booking Cart
                </Nav.Link>
              </LinkContainer>

              <NavDropdown title="CATEGORY" id='CATEGORY' onClick={searchModel}>
                    <NavDropdown.Item>SUV</NavDropdown.Item>
                    <NavDropdown.Item>MUV</NavDropdown.Item>
                    <NavDropdown.Item>SEDAN</NavDropdown.Item>
                    <NavDropdown.Item>HATCHBACK</NavDropdown.Item>
                    <NavDropdown.Item>HEAVY DUTY</NavDropdown.Item>
                    <NavDropdown.Item>ELECTRIC (EV)</NavDropdown.Item>
                    <NavDropdown.Item>COUPE</NavDropdown.Item>
                </NavDropdown>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                
              ) : (
               
                location.pathname === '/login' ?  (<LinkContainer to='/register'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Register
                  </Nav.Link>
                </LinkContainer>):(
                  <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
                )
               
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Cars</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Booking</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
