import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import { SubNav } from './components/layout/SubNav'
import { Home } from './pages/Home'
import { InsightLanding } from './pages/InsightLanding'
import { InsightFeasibility } from './pages/InsightFeasibility'
import { InsightQuery } from './pages/InsightQuery'
import { InsightCharts } from './pages/InsightCharts'
import { InsightReport } from './pages/InsightReport'
import { DataRequest } from './pages/DataRequest'
import { DataAgentIntake } from './pages/DataAgentIntake'
import { DataAgentPlanning } from './pages/DataAgentPlanning'
import { DataAgentLineage } from './pages/DataAgentLineage'
import { DataAgentWarehouse } from './pages/DataAgentWarehouse'
import { DataAgentDeploy } from './pages/DataAgentDeploy'
import { DataAgentAIOps } from './pages/DataAgentAIOps'
import { AlphaPrediction } from './pages/AlphaPrediction'
import { AlphaStrategy } from './pages/AlphaStrategy'
import { Pricing } from './pages/Pricing'
import { ComparePlans } from './pages/ComparePlans'
import { Docs } from './pages/Docs'

export default function App() {
  return (
    <AppProvider>
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
            <Route path="data-agent" element={<Navigate to="/data-agent/intake" replace />} />
            <Route path="data-agent/intake" element={<DataAgentIntake />} />
            <Route path="data-agent/planning" element={<DataAgentPlanning />} />
            <Route path="data-agent/lineage" element={<DataAgentLineage />} />
            <Route path="data-agent/warehouse" element={<DataAgentWarehouse />} />
            <Route path="data-agent/deploy" element={<DataAgentDeploy />} />
            <Route path="data-agent/aiops" element={<DataAgentAIOps />} />
            <Route path="alpha" element={<AlphaPrediction />} />
            <Route path="alpha/strategy" element={<AlphaStrategy />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="compare" element={<ComparePlans />} />
            <Route path="docs" element={<Docs />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <SubNav />
      </BrowserRouter>
    </AppProvider>
  )
}
