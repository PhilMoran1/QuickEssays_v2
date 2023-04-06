// // import { Routes, Route, Switch } from 'react-router-dom';
import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import Create from './Pages/Create/Create';
// import Home from './Pages/Home/Home'
// import Welcome from './Pages/Welcome/Welcome'

import LandingPage from './Pages/LandingPage/LandingPage';
import HomePage from './Pages/HomePage/HomePage';
import ViewPage from './Pages/ViewPage/ViewPage';
import MultiStepForm from './Pages/StepFormPage/StepFormPage';
import { ChakraProvider } from '@chakra-ui/react'

const router = createBrowserRouter([
    {path: '/', element:  <LandingPage />},
    {path: '/home', element:  <HomePage />},
    {path: '/view', element:  <ViewPage />},
    {path: '/create', element:  <MultiStepForm />},
    {path: '/forgot-password', element:  <MultiStepForm />}
]);



function App() {
  return (
    <ChakraProvider>
      <div className="">
          <RouterProvider router={router}></RouterProvider>
      </div>
    </ChakraProvider>
  )
}

export default App;
