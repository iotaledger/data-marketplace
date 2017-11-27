import React from 'react'
import styled from 'styled-components'

export default props => (
  <F>
    <C>
      <W>
        <img
          src="/static/logotypes/logo-footer.png"
          srcSet="/static/logotypes/logo-footer@2x.png 2x"
          alt="IOTA logotype"
        />
      </W>
      <N>
        <Ul>
          {/* <Li>
            <A href="#">Terms of Service</A>
          </Li>
          <Li>
            <A href="#">Customer Support</A>
          </Li>
          <Li>
            <A href="#">Privacy Policy</A>
          </Li> */}
        </Ul>
        <Copy>© 2017 IOTA. All rights reserved.</Copy>
      </N>
    </C>
  </F>
)

const F = styled.footer`
  background-image: linear-gradient(-329deg, #1857eb 31%, #0d3497 65%);
  padding: 170px 0 30px;
  @media (max-width: 760px) {
    padding: 90px 0 3px;
  }
`
const C = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 0 15px;
  margin-right: auto;
  margin-left: auto;
`

const W = styled.div`
  margin-bottom: 42px;
  text-align: center;
`
const N = styled.nav`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  @media (max-width: 760px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const Ul = styled.ul`
  display: flex;
  list-style: none;
  @media (max-width: 760px) {
    flex-flow: row wrap;
    justify-content: center;
    max-width: 290px;
    margin-bottom: 20px;
  }
`
const Li = styled.li`
  margin-left: 15px;
  font-size: 12px;
  line-height: 16px;
  color: #cedbe2;
  @media (max-width: 760px) {
    line-height: 26px;
  }
`
const A = styled.a`
  color: inherit;
  text-decoration: none;
`
const Copy = styled.p`
  font-size: 12px;
  line-height: 16px;
  color: #cedbe2;
`
