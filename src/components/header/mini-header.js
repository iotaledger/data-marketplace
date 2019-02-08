import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const links = [
  { link: '', text: 'Home' },
  { link: 'demo', text: 'Try the Marketplace' },
  { link: 'specs', text: 'Specifications' },
  { link: 'business', text: 'Co-Creation Ecosystem' },
  { link: 'involved', text: 'Get involved' },
];

const MiniHeader = props => (
  <Container>
    <A to={'/'}>
      <img src="/static/logotypes/logo-header.svg" alt="Logo IOTA" />
    </A>
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
  </Container>
);

export default withRouter(MiniHeader);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1170px;
  padding: 30px 15px 30px;
  margin-right: auto;
  margin-left: auto;
  z-index: 10;
`;

const SubLink = styled.p`
  @media (max-width: 1050px) {
    font-size: 12px;
    padding: 7px 10px 0;
  }

  @media (max-width: 910px) {
    display: none;
  }

  font-size: 14px;
  letter-spacing: 1.5px;
  font-weight: 600;
  line-height: 28px;
  padding: 7px 15px 0;
  color: rgba(78, 90, 97, 1);
  opacity: 0.5;
  text-align: center;
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

const A = styled(Link)`
  padding-right: 30px;
`;
