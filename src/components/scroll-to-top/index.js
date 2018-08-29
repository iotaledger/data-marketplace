import React, { PureComponent } from 'react';

export default class Sticky extends PureComponent {
  static defaultProps = {
    top: 380,
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

  setSticky() {
    const { elem } = this;
    const { top } = this.props;
    window.requestAnimationFrame(() => {
      const scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop >= top) {
        elem.style.position = 'fixed';
        elem.style.top = `${top}px`;
      } else {
        elem.style.position = 'relative';
        elem.style.top = 0;
      }
    });
  }

  render() {
    return (
      <div className="scroll-to-top" ref={elem => (this.elem = elem)} onClick={this.props.onClick}>
        <img src="/static/icons/arrow-up.svg" alt="scrollToTop" />
      </div>
    );
  }
}
