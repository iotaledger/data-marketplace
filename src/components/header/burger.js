import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BurgerMenu from 'react-burger-menu';
import '../../assets/scss/menu.scss';

const Menu = BurgerMenu['slide'];

const links = [
  { link: '', text: 'Home' },
  { link: 'demo', text: 'Try the Marketplace' },
  { link: 'specs', text: 'Specifications' },
  { link: 'business', text: 'Co-Creation Ecosystem' },
  { link: 'involved', text: 'Get involved' },
];

const Burger = props => (
  <MenuContainer>
    <Menu id="slide" pageWrapId="page-wrap" outerContainerId="main" right>
      {links.map(
        ({ link, text }) =>
          props.location.pathname.replace(/^\/+/, '') === link ? (
            <SubLinkActive key={text.toUpperCase()}>{text.toUpperCase()}</SubLinkActive>
          ) : (
            <Link to={`/${link}`} key={text.toUpperCase()}>
              <SubLink>{text.toUpperCase()}</SubLink>
            </Link>
          )
      )}
    </Menu>
  </MenuContainer>
);

export default withRouter(Burger);

const MenuContainer = styled.div`
  display: none;

  @media (max-width: 910px) {
    display: block;
  }
`;

const SubLink = styled.p`
  font-size: 14px;
  letter-spacing: 1.5px;
  font-weight: 600;
  line-height: 40px;
  padding: 7px 15px 0;
  color: #ffffff;
  opacity: 0.5;
  text-align: left;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const SubLinkActive = styled(SubLink)`
  opacity: 1;
  cursor: default;
`;
