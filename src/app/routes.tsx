import { createBrowserRouter } from 'react-router';
import { Root } from './pages/Root';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Properties } from './pages/Properties';
import { PropertyDetail } from './pages/PropertyDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';
import { SellProperty } from './pages/SellProperty';
import { AdminLogin } from './pages/admin/Login';
import { AdminDashboard } from './pages/admin/Dashboard';
import { PropertiesManagement } from './pages/admin/PropertiesManagement';
import { PropertyForm } from './pages/admin/PropertyForm';
import { LeadsManagement } from './pages/admin/LeadsManagement';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'services', Component: Services },
      { path: 'biens', Component: Properties },
      { path: 'biens/:id', Component: PropertyDetail },
      { path: 'a-propos', Component: About },
      { path: 'contact', Component: Contact },
      { path: 'vendre', Component: SellProperty },
      { path: '*', Component: NotFound },
    ],
  },
  {
    path: '/admin',
    children: [
      { index: true, Component: AdminLogin },
      { path: 'login', Component: AdminLogin },
      { path: 'dashboard', Component: AdminDashboard },
      { path: 'properties', Component: PropertiesManagement },
      { path: 'properties/new', Component: PropertyForm },
      { path: 'properties/edit/:id', Component: PropertyForm },
      { path: 'leads', Component: LeadsManagement },
    ],
  },
]);