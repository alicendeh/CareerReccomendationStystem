import React, { useState } from 'react';
import { Tab, Tabs, TabContent } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Description, Comments } from '../screens';
import '../App.css';

function TabBar({ description, data }) {
  const [showDesc, setShowDesc] = useState(true);
  return (
    <div
      className="tab-box"
      style={{
        marginTop: 16,
        flex: 1,
      }}
    >
      <div className="row">
        <div
          onClick={() => setShowDesc(true)}
          style={{
            backgroundColor: showDesc && 'white',
            borderBottom: showDesc && '1px solid #0fccce',
            padding: 21,
          }}
          className="h4 col elem"
        >
          Description
        </div>
        <div
          style={{
            padding: 21,
            backgroundColor: showDesc === false && 'white',
            borderBottom: showDesc === false && '1px solid #0fccce',
          }}
          onClick={() => setShowDesc(false)}
          className="h4 col elem"
        >
          Comments
        </div>
      </div>
      <div>
        {showDesc ? (
          <Description description={description} />
        ) : (
          <Comments data={data} />
        )}
      </div>
    </div>
  );
}

export default TabBar;
