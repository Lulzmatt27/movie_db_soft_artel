import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Button, FormControl, Form } from 'react-bootstrap'

const Header = () => {
  return (
    <Navbar bg='light' expand='lg'>
      <LinkContainer to='/'>
        <Navbar.Brand>Movie test</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
    </Navbar>
  )
}
export default Header
