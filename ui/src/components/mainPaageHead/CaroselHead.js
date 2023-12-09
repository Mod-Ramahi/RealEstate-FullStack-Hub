import React from "react";
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';
import Image1 from'./carousel1.jpg'
import Image2 from'./carousel2.jpg'
import Image3 from'./carousel3.jpg'
import './CarouselHead.css'


const CarouselHead = () => {
    return (
        <Carousel fade className="carousel">
          <Carousel.Item>
            {/* <ExampleCarouselImage text="First slide" /> */}
            <div className="img-div">
                <img className="img" alt="" src={Image1}/>
            </div>
            
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="Second slide" /> */}
            <div className="img-div">
                <img className="img" alt="" src={Image2}/>
            </div>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            {/* <ExampleCarouselImage text="Third slide" /> */}
            <div className="img-div">
                <img className="img" alt="" src={Image3}/>
            </div>
            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

export default CarouselHead;