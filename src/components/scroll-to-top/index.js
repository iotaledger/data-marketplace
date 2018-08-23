import React, { PureComponent } from 'react';
import styled from 'styled-components';

export default class Sticky extends PureComponent {
  static defaultProps = {
    top: 350,
    scrollingStop: Infinity,
  };

  constructor(props) {
    super(props);
    this.setSticky = this.setSticky.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setSticky);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.setSticky);
  }

  getOffset() {
    if (this.props.offsetTop !== undefined) {
      return this.props.offsetTop;
    }
    // If no offsetTop provided as prop use the initial offset of the element from top
    this.offsetTop = this.offsetTop ? this.offsetTop : this.elem.getBoundingClientRect().top;
    return this.offsetTop;
  }

  setSticky() {
    const { elem } = this;
    const { top } = this.props;
    window.requestAnimationFrame(() => {
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop >= this.props.top) {
        elem.style.position = 'fixed';
        elem.style.top = `${this.props.top}px`;
      } else {
        elem.style.position = 'relative';
        elem.style.top = 0;
      }
    });
  }

  render() {
    const { onClick, top } = this.props;
    return (
      <div
        style={{ top, right: 50, cursor: 'pointer' }}
        ref={elem => (this.elem = elem)}
        onClick={onClick}>
        <Image src="/static/icons/arrow-up.svg" alt="scrollToTop" />
      </div>
    );
  }
}

const Image = styled.img`
  width: 70%;
  padding: 10px 0;
`;
