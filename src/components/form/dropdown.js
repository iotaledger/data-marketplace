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
`;

const DropdownHeaderWrapper = styled.div`
`;

const Header = styled.div`
    text-align: left;
    margin: 10px 0 0;
    padding: 10px;
    background: transparent;
    border: none;
    border: solid 1px #d8d8d8;
    height: 45px;
    border-radius: 20px;
    padding: 15px 15px;
    font-size: 105%;
    margin: 10px 0 0;
    width: 100%;
    font-family: NunitoSans;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    color: rgba(78, 90, 97, 0.6);
`;

const Dropdownlist = styled.ul`
  position: absolute;
  background-color: #f0f6f8bf;
  padding: 5px;
  z-index: 10;
  border: solid 1px #d8d8d8;
`;

const DropdownItem = styled.li`
  list-style:none;
  text-align: left;
  color: rgba(78, 90, 97, 0.6);
  &:hover {
    cursor: pointer;
    color: #009fff;
  }
`;
