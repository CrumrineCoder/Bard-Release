import React from 'react';
class ScrollButton extends React.Component {
    constructor() {
        super();

        this.state = {
            intervalId: 0
        };
    }

    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }

    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({ intervalId: intervalId });
    }

    render() {
        return (
            <div className="scrollContainer" onClick={() => { this.scrollToTop(); }}>
                <i className="fas fa-arrow-circle-up scrollToTopHeaderButton"></i>
                <span className="scrollContainerText">Back to Top</span>
            </div>
            
        )
    }
}
export default ScrollButton