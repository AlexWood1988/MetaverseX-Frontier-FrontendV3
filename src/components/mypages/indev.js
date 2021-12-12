import React from 'react';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: #212428;
  }
`;

const InDev= function() {


return (
<div>
<GlobalStyles/>

  <section className='jumbotron breadcumb no-bg'>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h4 className='tl'>
                <b>Feature In Development</b>                                             
                <div className="clearfix"></div>
                <span id="wallet" className='f6'>Coming Soon</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Footer />
</div>

);
}

export default InDev;