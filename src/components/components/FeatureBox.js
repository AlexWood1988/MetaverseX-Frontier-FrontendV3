import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const featurebox= () => (
 <div className='row'>
            <div className="col-lg-4 col-md-6 mb-3">
                <div className="feature-box f-boxed style-3">
                  <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                    <i className="bg-color-2 i-boxed icon_compass_alt"></i>
                  </Reveal>
                    <div className="text">
                      <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                        <h4 className="">Navigate</h4>
                      </Reveal>
                      <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                        <p className="">Join as a Pioneer, explore unknown stars and planets. Discover unique treasures.</p>
                      </Reveal>
                    </div>
                    <i className="wm icon_compass_alt"></i>
                </div>
            </div>

          <div className="col-lg-4 col-md-6 mb-3">
              <div className="feature-box f-boxed style-3">
                <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                  <i className=" bg-color-2 i-boxed icon_currency"></i>
                </Reveal>
                  <div className="text">
                    <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                      <h4 className="">Ecosystem</h4>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                      <p className="">A fully dynamic & interactive ecosystem. All assets are on the smart chain. $MXC: universal credit point, $AU: Aurics.</p>
                    </Reveal>
                  </div>
                  <i className="wm icon_currency"></i>
              </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-3">
              <div className="feature-box f-boxed style-3">
                <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                  <i className=" bg-color-2 i-boxed icon_genius"></i>
                </Reveal>
                  <div className="text">
                    <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
                      <h4 className="">More...</h4>
                    </Reveal>
                    <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
                      <p className="">Trade on-chain assets, construct mines to earn, combat with fleets... All in MetaverseX: Frontier.</p>
                    </Reveal>
                  </div>
                  <i className="wm icon_genius"></i>
              </div>
          </div>
        </div>
);
export default featurebox;