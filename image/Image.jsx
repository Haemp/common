import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './image.css';

function getLever(){
    let fulfill;
    const p = new Promise(fulfillPromise => {
        fulfill = fulfillPromise
    })
    p.fulfill = fulfill;
    return p;
}

export default class Image extends React.Component {

    static propTypes = {
        maxSize: PropTypes.object,
        effect: PropTypes.string,
        src: PropTypes.string.isRequired
    }

    constructor(){
        super();
        this.state = {};
        this._imageWasSet = getLever();
        this._imageWasLoaded = getLever();
        this._imageSizeSet = getLever();
    }

    async componentDidMount(){

        // causes viewport change
        window.addEventListener('resize', () => {
            this._updateViewportState();
        });

        await this._setupContainer();
        this._updateViewportState();
    }

    async _setupContainer(){
        let image = await this._imageWasSet;
        this._loadContainer(image);

        image = await this._imageWasLoaded;

        if(this.props.maxSize){
            this._imageSizeSet.fulfill(this.props.maxSize)
        }else{
            this._computeContainerSize(image);
        }

        const imageDimensions = await this._imageSizeSet;
        this.setState({imageDimensions});
    }

    _computeContainerSize(image){
        let width, height;

    
        width = image.naturalWidth;
        height = image.naturalHeight;
    
        this._imageSizeSet.fulfill({width, height});
    }

    _loadContainer(image){
        if(image.complete){
            this._imageWasLoaded.fulfill(image)
        }else{
            image.addEventListener('load', _ => this._imageWasLoaded.fulfill(image), {once: true});
        }
    }

    _updateViewportState(){
        const viewportDimensions = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({viewportDimensions});
    }

    /**
     * Only ever run this once - when we have run this once
     * and the element has rendered we can abandon this since
     * all we want to know is if the image is instantiated
     * 
     * @param {*} image 
     */
    async onRefContainer(image){

        if(image)
            this._imageWasSet.fulfill(image);
    }

    _calcMainDimension(image){
        this.viewportDimensions = ReactDOM.findDOMNode(this).getBoundingClientRect();
    }

    render(){
        let style = {};
        const classes = ['ah-image'];
        
        if(this.props.effect === 'zoom'){
            classes.push(['ah-image__zooming']);
        }
        
        const {imageDimensions, viewportDimensions} = this.state;
        if(this.state.imageDimensions && this.state.viewportDimensions){
            const deltaHeight = imageDimensions.height - viewportDimensions.height;
            const deltaWidth = imageDimensions.width - viewportDimensions.width;
            const vRatio = viewportDimensions.width / viewportDimensions.height;
            const cRatio = imageDimensions.width / imageDimensions.height;
            
            // both must be bigger than the viewport - 
            // otherwise we don't need to shrink
            let mainDimension;
            if(deltaHeight > 0 && deltaWidth > 0){
                mainDimension = (vRatio < cRatio) ? 'height' : 'width';
            }
    
            style = {
                flexShrink: 0,
                maxWidth: imageDimensions.width + 'px',
                maxHeight: imageDimensions.height + 'px'
            };
            style.width = 'auto';
            style.height = 'auto';

            if(mainDimension)
                style[mainDimension] = this.props.effect === 'zoom' ? '110%' : '100%';
        }

        return <div className={classes.join(' ')} style={this.props.backgroundCSS}>
            <img src={this.props.src} style={style} ref={(ref) => this.onRefContainer(ref)} />
        </div>
    }
}