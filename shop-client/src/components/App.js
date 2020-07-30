import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import ProductMain from './poducts/ProductMain'
import ProductShow from './poducts/ProductShow'
import ProductAbout from './poducts/ProductAbout'
import ProductCreate from './poducts/ProductCreate'
import ProductEdit from './poducts/ProductEdit'
import Header from './Header'
import theme from '../style/theme'
import { ThemeProvider } from '@material-ui/core/styles';

const App = function () {
   return (
      <ThemeProvider theme={theme}>
         <BrowserRouter>
            <div>
               <Header/>
               <Route path='/' exact component={ProductMain} />
               <Route path='/product/show/:id' exact component={ProductShow} />
               <Route path='/about' exact component={ProductAbout} />
               <Route path='/product/create' exact component={ProductCreate} />
               <Route path='/product/edit/:id' exact component={ProductEdit} />
            </div>
         </BrowserRouter>
      </ThemeProvider>)
}

export default App