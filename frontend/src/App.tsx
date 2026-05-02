
import {  Routes, Route } from 'react-router-dom'
import {Layout} from './components/Layout.tsx'
import './App.css'
import { Expense } from './components/Expense.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Expense />} />
      </Route>
    </Routes>
  );
}

export default App
