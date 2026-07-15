import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  AlertTriangle,
  FileText,
  Focus,
  Send,
  Shield,
  User,
} from 'lucide-react'
import { InsightIcon, DataAgentIcon } from '../components/ui/MoceLogo'
import { useApp } from '../context/AppContext'

export function DataRequest() {
  const navigate = useNavigate()
  const { toast, priority, setPriority, cycle, setCycle, setQuery } = useApp()
  const [submitting, setSubmitting] = useState(false)

  const submit = () => {
    setSubmitting(true)
    setQuery('分析过去 30 天某新协议的 LP 撤池风险及大户资金流出行为')
    toast('数据需求卡已提交到 MOCE Data Agent', 'success')
    window.setTimeout(() => {
      setSubmitting(false)
      navigate('/data-agent/intake')
    }, 500)
  }

  return (
    <div className="mx-auto max-w-[1100px]">
      <div className="mb-4 mt-1 flex justify-center">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <Link to="/insight" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-slate-500 hover:bg-slate-50">
            <InsightIcon className="h-4 w-4" /> MOCE Insight
          </Link>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1.5 text-[12px] font-medium text-slate-800 ring-1 ring-orange-100">
            <FileText size={14} className="text-orange-500" /> Data Request
          </div>
          <span className="text-slate-300">→</span>
          <Link to="/data-agent/intake" className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] text-slate-500 hover:bg-slate-50">
            <DataAgentIcon className="h-4 w-4" /> MOCE Data Agent
          </Link>
        </div>
      </div>

      <div className="mb-6 text-center">
        <h1 className="text-[28px] font-extrabold text-slate-900">
          当前无法直接回答，建议<span className="text-moce-orange">提交数据需求</span>
        </h1>
        <p className="mt-1.5 text-[13px] text-slate-500">
          系统已识别你的问题，但目前缺少对应数据资产。你可以缩小范围重试，或生成数据需求卡提交给 Data Agent。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2 text-[14px] font-bold text-slate-800">
            <User size={16} className="text-orange-500" />
            用户问题与系统诊断
          </div>

          <div className="mb-1 text-[11px] text-slate-400">用户问题</div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-[13px] text-slate-700">
            分析过去 30 天某新协议的 LP 撤池风险及大户资金流出行为
          </div>

          <div className="relative mt-5">
            <div className="mb-2 text-[11px] font-medium text-slate-500">系统诊断（识别到的缺失数据资产）</div>
            <div className="space-y-2.5">
              {[
                { title: '缺少该协议的链上事件解析', desc: '无法解析撤池事件、流动性变动及相关行为' },
                { title: '缺少 LP 行为明细表', desc: '缺少 LP 地址维度的增减仓、撤池、持仓变更明细' },
                { title: '缺少资金流风险指标', desc: '缺少巨额流出、净流出、持仓集中度等风险指标' },
                { title: '暂无对应结果表', desc: '缺少该协议的撤池风险分析表、资金流出行为等结果表' },
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="flex w-full gap-2 rounded-xl border border-amber-100 bg-amber-50/40 p-2.5 text-left transition hover:border-amber-300"
                  onClick={() => toast(`诊断详情：${item.desc}`, 'warning')}
                >
                  <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
                  <div>
                    <div className="text-[12.5px] font-semibold text-slate-800">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pointer-events-none absolute bottom-2 right-2 opacity-90">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="float-card" style={{ animationDuration: '4s' }}>
                <defs>
                  <linearGradient id="cube2" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fdba74" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
                <path d="M50 20L78 36V68L50 84L22 68V36L50 20Z" fill="url(#cube2)" opacity="0.25" stroke="#fb923c" strokeWidth="1.5" />
                <path d="M50 20V52L22 36M50 52L78 36M50 52V84" stroke="#fb923c" strokeWidth="1.2" opacity="0.7" />
                <circle cx="72" cy="72" r="14" fill="#fff7ed" stroke="#fdba74" />
                <path d="M68 72a4 4 0 118 0 4 4 0 01-8 0zm7 4l3 3" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="mb-4 flex items-center gap-2 text-[14px] font-bold text-slate-800">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-violet-100 text-[10px] text-violet-600">◈</span>
            自动生成的数据需求卡
          </div>

          <div className="space-y-0 divide-y divide-slate-100 text-[12.5px]">
            <Row label="需求名称：" value="某协议 LP 撤池风险分析" />
            <Row label="原始问题：" value="分析过去 30 天某新协议的 LP 撤池风险及大户资金流出行为" />
            <div className="flex gap-3 py-2.5">
              <span className="w-24 shrink-0 text-slate-400">缺失资产说明</span>
              <div className="flex flex-wrap gap-1.5">
                {['缺少该协议的链上事件解析', '缺少 LP 行为明细表', '缺少资金流风险指标', '暂无对应结果表'].map((t) => (
                  <span key={t} className="rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[11px] text-orange-700">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 py-2.5">
              <span className="w-24 shrink-0 text-slate-400">建议新增数据源</span>
              <div className="flex flex-wrap gap-1.5">
                {['区块链节点数据', '交易数据', '地址标签库'].map((t) => (
                  <span key={t} className="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Row label="预估产出" value="趋势图、风险榜单、分析报告" />
            <div className="flex flex-wrap items-center gap-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">优先级</span>
                <select
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 font-medium text-orange-600 outline-none"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as '高' | '中' | '低')}
                >
                  <option value="高">↑ 高</option>
                  <option value="中">中</option>
                  <option value="低">低</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">预估处理周期</span>
                <select
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-700 outline-none"
                  value={cycle}
                  onChange={(e) => setCycle(e.target.value)}
                >
                  <option>1 个工作日</option>
                  <option>2 – 3 个工作日</option>
                  <option>1 周</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          className="btn-outline !px-5 !py-2.5 text-[13px]"
          onClick={() => {
            toast('已缩小范围：仅查询已有 LP 事件的协议子集', 'info')
            navigate('/insight/feasibility')
          }}
        >
          <Focus size={15} className="text-orange-500" />
          缩小范围重试
          <span className="ml-1 text-[11px] font-normal text-slate-400">调整条件，重新分析</span>
        </button>
        <button
          type="button"
          className="btn-primary !px-6 !py-2.5 text-[13px]"
          disabled={submitting}
          onClick={submit}
        >
          <Send size={15} />
          提交数据需求
          <span className="ml-1 text-[11px] font-normal text-orange-100">提交到 MOCE Data Agent</span>
        </button>
        <button
          type="button"
          className="btn-outline !px-5 !py-2.5 text-[13px]"
          onClick={() => toast('开发方案草稿已生成（Mock PDF）', 'success')}
        >
          <FileText size={15} className="text-slate-500" />
          生成开发方案草稿
          <span className="ml-1 text-[11px] font-normal text-slate-400">生成数据方案与任务拆解</span>
        </button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11.5px] text-slate-400">
        <Shield size={13} />
        提交后，该需求将进入 MOCE Data Agent，由系统辅助生成生产级数据任务。
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 py-2.5">
      <span className="w-24 shrink-0 text-slate-400">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  )
}
