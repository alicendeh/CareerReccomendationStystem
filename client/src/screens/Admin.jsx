import React from 'react';
import { Header } from '../components';
import Careers from './Careers/Careers';

function Admin() {
  return (
    <div>
      <Careers role={'admin'} isAuthenticted={true} />
    </div>
  );
}

export default Admin;
