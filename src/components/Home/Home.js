import React from 'react';
import barcaimage from '../../images/barca.jpg'

const Home = () => {
    return (
        <section className="section-home" id="home">
            <div className="container">
                <div className="items">
                    <div className="item">
                        <h1 className="title">
                            Welcome to <br />
                            <span className="highlight">Football Club Barcelona</span>
                        </h1>
                        <div className="desc">
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                            <p>
                                Laudantium sit similique molestias deserunt. Unde ex consequatur enim minima laborum facere
                                repudiandae tempora repellendus error totam voluptates, animi dolore sint tenetur!
                            </p>
                            <p>
                                Unde ex consequatur enim minima laborum facere repudiandae tempora repellendus error totam
                                voluptates, animi dolore sint tenetur!
                            </p>
                        </div>
                    </div>
                    <div className="items-image">
                        <img src={barcaimage} alt="Barcelona" className="s" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;