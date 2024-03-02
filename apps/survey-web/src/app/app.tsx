// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes, Link } from 'react-router-dom';
import { container } from './app.css';
import SurveyPage from './survey/page';

export function App() {
  return (
    <div className={container}>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/survey/1">Click here for page survey.</Link>
            </div>
          }
        />
        <Route path="/survey/:id" element={<SurveyPage />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
