import React from 'react';
// import styled from 'styled-components';

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
      <div className="dd-wrapper">
        <div className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{title}</div>
        </div>
        {listOpen && (
          <ul className="dd-list">
            {list.map(item => (
              <li className="dd-list-item" key={item} onClick={() => this.selectItem(type, item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
