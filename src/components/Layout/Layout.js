import React from 'react';

function Layout(props) {
  return (
    <section>
      <header>header here</header>
      {props.children}
    </section>
  );
}

export default Layout;
