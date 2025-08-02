import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { MainLayout } from './components/layout/main-layout';
import Dashboard from './pages/Dashboard';
import EmailPage from './pages/EmailPage';
import MeetingsPage from './pages/MeetingsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import NotFound from './pages/NotFound';
import NotesPage from './pages/NotesPage';
import ClubsPage from './pages/ClubsPage';
import UpdatesPage from './pages/UpdatesPage';
import PlacementsPage from './pages/PlacementsPage';
import AttendanceTracker from './pages/AttendancePage';
import PartnersPage from './pages/PartnersPage';
import ClassSchedulePage from './pages/Schedule';
import FeeManagementPage from './pages/FeeManagement';
import CampusNavigatorPage from './pages/CampusNavigator';
import StudentIDWalletPage from './pages/StudentID';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="emails" element={<EmailPage />} />
              <Route path="meetings" element={<MeetingsPage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="assignments" element={<AssignmentsPage />} />
              <Route path="partners" element={<PartnersPage />} />
              <Route path="schedule" element={<ClassSchedulePage />} />
              <Route path="fee" element={<FeeManagementPage />} />
              <Route path="campus" element={<CampusNavigatorPage />} />
              <Route path="id" element={<StudentIDWalletPage />} />
              <Route path="clubs" element={<ClubsPage />} />
              <Route path="placements" element={<PlacementsPage />} />
              <Route path="updates" element={<UpdatesPage />} />
              <Route path="attendance" element={<AttendanceTracker />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;