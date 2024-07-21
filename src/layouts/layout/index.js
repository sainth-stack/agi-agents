import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {/* Your layout structure here, e.g., header, sidebar */}
      <Outlet />
    </div>
  );
};

export default Layout;
