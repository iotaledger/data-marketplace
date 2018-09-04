import React from 'react';
import styled from 'styled-components';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  handleClickOutside() {
    this.setState({
      listOpen: false,
    });
  }

  selectItem(type, title) {
    this.setState({ listOpen: false }, () => this.props.selectItem(type, title));
  }

  toggleList() {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  }

  render() {
    const { list, title, type } = this.props;
    const { listOpen } = this.state;
    return (
      <DropdownWrapper>
        <DropdownHeaderWrapper onClick={() => this.toggleList()}>
          <Header>{title}</Header>
          <Image src="/static/icons/arrow-down.svg" />
        </DropdownHeaderWrapper>
        {listOpen && (
          <Dropdownlist>
            {list.map(item => (
              <DropdownItem key={item} onClick={() => this.selectItem(type, item)}>
                {item}
              </DropdownItem>
            ))}
          </Dropdownlist>
        )}
      </DropdownWrapper>
    );
  }
}

const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const DropdownHeaderWrapper = styled.div`
  position: relative;
`;

const Header = styled.div`
  text-align: left;
  background: transparent;
  border: solid 1px #d8d8d8;
  height: 45px;
  border-radius: 25px;
  padding: 12px 15px;
  margin: 10px 0 0;
  width: 100%;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  color: rgba(78, 90, 97, 1);
`;

const Dropdownlist = styled.ul`
  position: absolute;
  background-color: #f0f6f8;
  padding: 5px 11px;
  z-index: 10;
  border: solid 1px #d8d8d8;
  border-top: none;
  margin-left: 18px;
  width: 86%;

  @media (max-width: 900px) {
    width: 88%;
  }

  @media (max-width: 768px) {
    width: 91%;
  }
`;

const DropdownItem = styled.li`
  list-style: none;
  text-align: left;
  line-height: 25px;
  color: rgba(78, 90, 97, 1);
  &:hover {
    cursor: pointer;
    color: #009fff;
  }
`;

const Image = styled.img`
  width: 5%;
  position: absolute;
  top: 17px;
  right: 20px;

  @media (max-width: 768px) {
    width: 4%;
  }
`;
