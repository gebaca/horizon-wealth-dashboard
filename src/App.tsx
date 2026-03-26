'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  DollarSign,
  Euro,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  ShieldAlert,
  Droplets,
  PieChart,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data
const portfolioData = [
  { month: 'Jan', portfolio: 21500000, benchmark: 21000000 },
  { month: 'Feb', portfolio: 22100000, benchmark: 21300000 },
  { month: 'Mar', portfolio: 21800000, benchmark: 21100000 },
  { month: 'Apr', portfolio: 22600000, benchmark: 21800000 },
  { month: 'May', portfolio: 23100000, benchmark: 22100000 },
  { month: 'Jun', portfolio: 22800000, benchmark: 22000000 },
  { month: 'Jul', portfolio: 23400000, benchmark: 22400000 },
  { month: 'Aug', portfolio: 23900000, benchmark: 22700000 },
  { month: 'Sep', portfolio: 24200000, benchmark: 22900000 },
  { month: 'Oct', portfolio: 24000000, benchmark: 22800000 },
  { month: 'Nov', portfolio: 24500000, benchmark: 23100000 },
  { month: 'Dec', portfolio: 24800000, benchmark: 23400000 },
];

const assetAllocation = [
  { name: 'Equities', value: 45, color: '#6366f1' },
  { name: 'Fixed Income', value: 30, color: '#22c55e' },
  { name: 'Alternatives', value: 15, color: '#f59e0b' },
  { name: 'Cash', value: 10, color: '#64748b' },
];

const holdings = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    allocation: 8.2,
    value: 2034800,
    change: 2.34,
    risk: 'Low',
  },
  {
    ticker: 'MSFT',
    name: 'Microsoft Corp.',
    allocation: 7.5,
    value: 1860000,
    change: 1.89,
    risk: 'Low',
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    allocation: 6.8,
    value: 1686400,
    change: -0.54,
    risk: 'Medium',
  },
  {
    ticker: 'BRK.B',
    name: 'Berkshire Hathaway',
    allocation: 5.2,
    value: 1289600,
    change: 0.78,
    risk: 'Low',
  },
  {
    ticker: 'JPM',
    name: 'JPMorgan Chase',
    allocation: 4.8,
    value: 1190400,
    change: 1.23,
    risk: 'Medium',
  },
  {
    ticker: 'V',
    name: 'Visa Inc.',
    allocation: 4.2,
    value: 1041600,
    change: 0.95,
    risk: 'Low',
  },
  {
    ticker: 'JNJ',
    name: 'Johnson & Johnson',
    allocation: 3.9,
    value: 967200,
    change: -0.32,
    risk: 'Low',
  },
  {
    ticker: 'PG',
    name: 'Procter & Gamble',
    allocation: 3.5,
    value: 868000,
    change: 0.45,
    risk: 'Low',
  },
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    allocation: 3.2,
    value: 793600,
    change: 4.56,
    risk: 'High',
  },
  {
    ticker: 'HD',
    name: 'Home Depot',
    allocation: 2.7,
    value: 669600,
    change: -1.12,
    risk: 'Medium',
  },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Clients', active: false },
  { icon: TrendingUp, label: 'Market Analysis', active: false },
  { icon: FileText, label: 'Reports', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

// Format currency
const formatCurrency = (value: number, currency: 'EUR' | 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Format large numbers
const formatLargeNumber = (value: number, currency: 'EUR' | 'USD') => {
  if (value >= 1000000) {
    return `${currency === 'EUR' ? '€' : '$'}${(value / 1000000).toFixed(1)}M`;
  }
  return formatCurrency(value, currency);
};

// KPI Card Component
function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  trendValue?: string;
}) {
  return (
    <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-5'>
      <div className='flex items-center justify-between mb-3'>
        <span className='text-slate-400 text-sm font-medium'>{title}</span>
        <div className='p-2 bg-slate-700/50 rounded-lg'>
          <Icon className='w-4 h-4 text-indigo-400' />
        </div>
      </div>
      <div className='flex items-end justify-between'>
        <div>
          <p className='text-2xl font-semibold text-white'>{value}</p>
          {subtitle && (
            <p className='text-slate-500 text-xs mt-1'>{subtitle}</p>
          )}
        </div>
        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {trend === 'up' ? (
              <ArrowUpRight className='w-4 h-4' />
            ) : (
              <ArrowDownRight className='w-4 h-4' />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// Custom Tooltip for Charts
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  label?: string;
}) {
  if (active && payload && payload.length) {
    return (
      <div className='bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl'>
        <p className='text-slate-400 text-xs mb-2'>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className='text-sm'>
            <span className='text-slate-400'>
              {entry.dataKey === 'portfolio' ? 'Portfolio' : 'Benchmark'}:{' '}
            </span>
            <span className='text-white font-medium'>
              {formatLargeNumber(entry.value, 'EUR')}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
}

// Main App Component
export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHoldings = holdings.filter(
    (h) =>
      h.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskBadgeClasses = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'High':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className='flex h-screen bg-slate-900 text-white'>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300`}
      >
        {/* Logo */}
        <div className='h-16 flex items-center px-4 border-b border-slate-800'>
          {!sidebarCollapsed && (
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
                <TrendingUp className='w-5 h-5 text-white' />
              </div>
              <span className='font-semibold text-lg'>WealthView</span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto'>
              <TrendingUp className='w-5 h-5 text-white' />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-3'>
          <ul className='space-y-1'>
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-indigo-600/20 text-indigo-400'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className='w-5 h-5 shrink-0' />
                  {!sidebarCollapsed && (
                    <span className='text-sm font-medium'>{item.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Collapse Button */}
        <div className='p-3 border-t border-slate-800'>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className='w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors'
          >
            {sidebarCollapsed ? (
              <ChevronRight className='w-5 h-5' />
            ) : (
              <>
                <ChevronLeft className='w-5 h-5' />
                <span className='text-sm'>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 flex flex-col overflow-hidden'>
        {/* Header */}
        <header className='h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6'>
          <div>
            <h1 className='text-lg font-semibold'>Victoria Ashworth-Collins</h1>
            <p className='text-slate-500 text-sm'>Portfolio Overview</p>
          </div>

          <div className='flex items-center gap-4'>
            {/* Currency Toggle */}
            <div className='flex items-center bg-slate-800 rounded-lg p-1'>
              <button
                onClick={() => setCurrency('EUR')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currency === 'EUR'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Euro className='w-4 h-4' />
                EUR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currency === 'USD'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <DollarSign className='w-4 h-4' />
                USD
              </button>
            </div>

            {/* Notifications */}
            <button className='relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors'>
              <Bell className='w-5 h-5' />
              <span className='absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>

            {/* Actions */}
            <button className='p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors'>
              <MoreHorizontal className='w-5 h-5' />
            </button>

            {/* Avatar */}
            <div className='w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-medium'>
              RM
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className='flex-1 overflow-auto p-6'>
          {/* KPI Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
            <KPICard
              title='Total AUM'
              value={formatLargeNumber(
                24800000 * (currency === 'USD' ? 1.08 : 1),
                currency
              )}
              subtitle='Across 47 positions'
              icon={Wallet}
              trend='up'
              trendValue='+12.4%'
            />
            <KPICard
              title='Portfolio Yield YTD'
              value='+15.3%'
              subtitle='vs. +11.4% benchmark'
              icon={TrendingUp}
              trend='up'
              trendValue='+3.9%'
            />
            <KPICard
              title='Risk Score'
              value='6 / 10'
              subtitle='Moderate-High'
              icon={ShieldAlert}
            />
            <KPICard
              title='Liquidity Ratio'
              value='18.2%'
              subtitle={
                formatLargeNumber(
                  4513600 * (currency === 'USD' ? 1.08 : 1),
                  currency
                ) + ' available'
              }
              icon={Droplets}
            />
          </div>

          {/* Charts Row */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
            {/* Portfolio Evolution Chart */}
            <div className='lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-5'>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h3 className='text-white font-semibold'>
                    Portfolio Evolution
                  </h3>
                  <p className='text-slate-500 text-sm'>
                    12-month performance vs. S&P 500
                  </p>
                </div>
                <div className='flex items-center gap-4 text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-indigo-500 rounded-full'></div>
                    <span className='text-slate-400'>Portfolio</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-3 bg-slate-500 rounded-full'></div>
                    <span className='text-slate-400'>Benchmark</span>
                  </div>
                </div>
              </div>
              <div className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <AreaChart data={portfolioData}>
                    <defs>
                      <linearGradient
                        id='portfolioGradient'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#6366f1'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#6366f1'
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id='benchmarkGradient'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#64748b'
                          stopOpacity={0.2}
                        />
                        <stop
                          offset='95%'
                          stopColor='#64748b'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='#334155'
                      vertical={false}
                    />
                    <XAxis
                      dataKey='month'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(value) =>
                        `${(value / 1000000).toFixed(0)}M`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type='monotone'
                      dataKey='benchmark'
                      stroke='#64748b'
                      strokeWidth={2}
                      fill='url(#benchmarkGradient)'
                    />
                    <Area
                      type='monotone'
                      dataKey='portfolio'
                      stroke='#6366f1'
                      strokeWidth={2}
                      fill='url(#portfolioGradient)'
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Asset Allocation */}
            <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-5'>
              <div className='flex items-center justify-between mb-4'>
                <div>
                  <h3 className='text-white font-semibold'>Asset Allocation</h3>
                  <p className='text-slate-500 text-sm'>Current distribution</p>
                </div>
                <PieChart className='w-5 h-5 text-slate-500' />
              </div>
              <div className='h-40 mb-4'>
                <ResponsiveContainer width='100%' height='100%'>
                  <RechartsPieChart>
                    <Pie
                      data={assetAllocation}
                      cx='50%'
                      cy='50%'
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey='value'
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className='space-y-3'>
                {assetAllocation.map((item) => (
                  <div
                    key={item.name}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center gap-2'>
                      <div
                        className='w-3 h-3 rounded-full'
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className='text-slate-300 text-sm'>
                        {item.name}
                      </span>
                    </div>
                    <span className='text-white font-medium text-sm'>
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg'>
            <div className='p-5 border-b border-slate-700/50'>
              <div className='flex items-center justify-between'>
                <div>
                  <h3 className='text-white font-semibold'>Top Holdings</h3>
                  <p className='text-slate-500 text-sm'>
                    10 largest positions by allocation
                  </p>
                </div>
                <div className='relative'>
                  <Search className='w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2' />
                  <input
                    type='text'
                    placeholder='Search holdings...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64'
                  />
                </div>
              </div>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-slate-700/50'>
                    <th className='text-left text-slate-500 text-xs font-medium uppercase tracking-wider px-5 py-3'>
                      Asset
                    </th>
                    <th className='text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-5 py-3'>
                      Allocation
                    </th>
                    <th className='text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-5 py-3'>
                      Value
                    </th>
                    <th className='text-right text-slate-500 text-xs font-medium uppercase tracking-wider px-5 py-3'>
                      24h Change
                    </th>
                    <th className='text-center text-slate-500 text-xs font-medium uppercase tracking-wider px-5 py-3'>
                      Risk
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHoldings.map((holding, index) => (
                    <tr
                      key={holding.ticker}
                      className={`border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors ${
                        index === filteredHoldings.length - 1
                          ? 'border-b-0'
                          : ''
                      }`}
                    >
                      <td className='px-5 py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center text-xs font-semibold text-indigo-400'>
                            {holding.ticker.slice(0, 2)}
                          </div>
                          <div>
                            <p className='text-white font-medium text-sm'>
                              {holding.ticker}
                            </p>
                            <p className='text-slate-500 text-xs'>
                              {holding.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-5 py-4 text-right'>
                        <div className='flex items-center justify-end gap-3'>
                          <div className='w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden'>
                            <div
                              className='h-full bg-indigo-500 rounded-full'
                              style={{
                                width: `${(holding.allocation / 10) * 100}%`,
                              }}
                            ></div>
                          </div>
                          <span className='text-white text-sm w-12 text-right'>
                            {holding.allocation}%
                          </span>
                        </div>
                      </td>
                      <td className='px-5 py-4 text-right'>
                        <span className='text-white text-sm'>
                          {formatCurrency(
                            holding.value * (currency === 'USD' ? 1.08 : 1),
                            currency
                          )}
                        </span>
                      </td>
                      <td className='px-5 py-4 text-right'>
                        <div
                          className={`inline-flex items-center gap-1 text-sm ${
                            holding.change >= 0
                              ? 'text-emerald-400'
                              : 'text-red-400'
                          }`}
                        >
                          {holding.change >= 0 ? (
                            <ArrowUpRight className='w-4 h-4' />
                          ) : (
                            <ArrowDownRight className='w-4 h-4' />
                          )}
                          <span>{Math.abs(holding.change).toFixed(2)}%</span>
                        </div>
                      </td>
                      <td className='px-5 py-4 text-center'>
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskBadgeClasses(
                            holding.risk
                          )}`}
                        >
                          {holding.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
