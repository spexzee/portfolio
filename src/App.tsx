import React from 'react';
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Hero, Navbar, Tech, Works, StarsCanvas, Experience, ErrorBoundary } from "./components";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className='relative z-0 bg-primary'>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
              <Navbar />
              <Hero />
            </div>
            <About />
            <Experience />
            <Tech />
            <Works />
            {/* <Feedbacks /> */}
            <div className='relative z-0'>
              <Contact />
              <StarsCanvas />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;