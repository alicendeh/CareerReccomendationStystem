import React from 'react';
import { Header, Comp2, Comp3, Comp4, Comp5, Comp8 } from '../../components';

function LandingPage() {
  return (
    <div
      style={{
        backgroundColor: '#FAFAFA',
      }}
    >
      <Header isAuthenticted={false} />
      <div className="container">
        <Comp2 />
        <Comp3 />
        <Comp4 />
        <Comp5 />
      </div>
      <Comp8 />
    </div>
  );
}

export default LandingPage;
