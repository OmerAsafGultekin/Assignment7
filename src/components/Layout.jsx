import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout({ theme, toggleTheme }) {
  return (
    <div className={`app-container ${theme}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
      <footer style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #ccc' }}>
        <p>&copy; 2026 Online Shop Assignment</p>
      </footer>
    </div>
  );
}