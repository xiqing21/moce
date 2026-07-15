import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { InsightLanding } from './pages/InsightLanding'
import { InsightFeasibility } from './pages/InsightFeasibility'
import { InsightQuery } from './pages/InsightQuery'
import { InsightCharts } from './pages/InsightCharts'
import { InsightReport } from './pages/InsightReport'
import { DataRequest } from './pages/DataRequest'
import { DataAgentLineage } from './pages/DataAgentLineage'
import { DataAgentAIOps } from './pages/DataAgentAIOps'
import { AlphaPrediction } from './pages/AlphaPrediction'
import { AlphaStrategy } from './pages/AlphaStrategy'
import { Pricing } from './pages/Pricing'
import { ComparePlans } from './pages/ComparePlans'
import { SubNav } from './components/layout/SubNav'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="insight" element={<InsightLanding />} />
          <Route path="insight/feasibility" element={<InsightFeasibility />} />
          <Route path="insight/query" element={<InsightQuery />} />
          <Route path="insight/charts" element={<InsightCharts />} />
          <Route path="insight/report" element={<InsightReport />} />
          <Route path="data-request" element={<DataRequest />} />
          <Route path="data-agent" element={<DataAgentLineage />} />
          <Route path="data-agent/aiops" element={<DataAgentAIOps />} />
          <Route path="alpha" element={<AlphaPrediction />} />
          <Route path="alpha/strategy" element={<AlphaStrategy />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="compare" element={<ComparePlans />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <SubNav />
    </BrowserRouter>
  )
}
