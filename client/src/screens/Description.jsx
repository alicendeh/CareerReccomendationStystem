import React from 'react';

function Description({ description }) {
  return (
    <div
      style={{
        fontSize: 15,
        color: '#393939',
        margin: 21,
      }}
    >
      {description}
    </div>
  );
}

export default Description;
