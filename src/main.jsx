import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Product, Products, Cart, Checkout, AboutPage, Order } from './pages';

import { Provider } from "react-redux";
import store from "./redux/store";
import { Toaster } from "react-hot-toast";
import ContactPage from './pages/ContactPage';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>

    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/product" element={<Products />}></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>

          <Route path="/order" element={<Order />}></Route>

        </Routes>
      </Provider>
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
  // </StrictMode>,
)
