import styled from '@emotion/styled'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'

import AdminHome from './components/admin/AdminHome';
import AdminOrders from './components/admin/AdminOrders';
import AdminSettings from './components/admin/AdminSettings';
import AdminUsers from './components/admin/AdminUsers';
import AdminProfile from './components/admin/AdminAccount';
import AdminEditOrder from './components/admin/AdminOrderEdit';
import Order from './components/admin/AdminOrder';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from 'react-redux'

const AppWrapper = styled.div``;

function App() {

  const currentUser = useSelector(state => state.user.currentUser);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppWrapper><Home /></AppWrapper>}/>
        <Route path="/terms" element={<AppWrapper><Terms /></AppWrapper>}/>
        <Route path="/privacy" element={<AppWrapper><Privacy /></AppWrapper>}/>
        
        {currentUser
            ? <Route path="/login" element={<Navigate to="/admin" />} />
            : <Route path="/login" element={<AppWrapper><Login /></AppWrapper>}/>
        }

        {currentUser
            ? <Route path="/register" element={<Navigate to="/admin" />} />
            : <Route path="/register" element={<AppWrapper><Register /></AppWrapper>}/>
        }

        {currentUser
          ? (
              <Route path="/admin" element={<AppWrapper><Admin /></AppWrapper>}>
            
                <Route path="/admin" element={<AdminHome />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />

                <Route path="orders/:status" element={<AdminOrders />} />
      
                <Route path="order/:id" element={<AppWrapper><Order /></AppWrapper>} />
                <Route path="editorder/:id" element={<AppWrapper><AdminEditOrder /></AppWrapper>} />
              </Route>
            )
          : (<Route path="/admin" element={<AppWrapper><Home /></AppWrapper> } />)
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
