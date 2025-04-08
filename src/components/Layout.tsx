import React from 'react';
import Header from './Header';
// Other imports...

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* Footer or other components */}
    </>
  );
};

export default Layout;