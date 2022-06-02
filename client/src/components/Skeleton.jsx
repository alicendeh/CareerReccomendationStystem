import React from 'react';
import { Skeleton as MUISkeleton } from '@mui/material';

function Skeleton() {
  return (
    <div
      style={{
        marginTop: 22,
        borderRadius: 12,
      }}
    >
      <MUISkeleton
        style={{
          borderRadius: 14,
        }}
        variant="rectangular"
        width={310}
        height={370}
      />
      <MUISkeleton variant="text" width={210} />

      <MUISkeleton variant="text" width={310} />

      <div className="d-flex">
        <MUISkeleton
          style={{
            marginRight: 12,
          }}
          variant="text"
          width={95}
          height={30}
        />
        <MUISkeleton
          style={{
            marginRight: 12,
          }}
          variant="text"
          width={95}
          height={30}
        />
        <MUISkeleton
          style={{
            marginRight: 12,
          }}
          variant="text"
          width={95}
          height={30}
        />
      </div>
      <div
        className="d-flex justify-content-between"
        style={{
          width: '310px',
        }}
      >
        <div className="d-flex">
          <MUISkeleton
            style={{
              marginRight: 12,
            }}
            variant="circular"
            width={20}
            height={20}
          />
          <MUISkeleton
            style={{
              marginRight: 12,
            }}
            variant="circular"
            width={20}
            height={20}
          />
          <MUISkeleton
            style={{
              marginRight: 12,
            }}
            variant="circular"
            width={20}
            height={20}
          />
        </div>
        <MUISkeleton
          style={{
            marginRight: 12,
          }}
          variant="text"
          width={60}
          height={10}
        />
      </div>
    </div>
  );
}

export default Skeleton;
