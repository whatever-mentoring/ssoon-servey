// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Route, Routes } from 'react-router-dom';
import { container } from './app.css';
import SurveyPage from './survey/page';
import HomePage from './home/page';

export function App() {
  return (
    <div className={container}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey/:id" element={<SurveyPage />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
