import React from 'react';
import { Header } from '../components';
import Careers from './Careers/Careers';

function User() {
  return (
    <div>
      <Careers isAuthenticted={true} role="user" />
    </div>
  );
}

export default User;
