import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStaticContext } from './StaticContext';
import Item from './Item';

function Home() {
  const staticContext = useStaticContext();

  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container bg-info">
        <h1>Home</h1>
      </main>
    </>
  );
}

export default Home;
