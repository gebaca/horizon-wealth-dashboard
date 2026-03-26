import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import type { NavItem } from '../typesUtils/types';
interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  navItems: NavItem[];
}

export default function Sidebar({
  collapsed,
  onToggle,
  navItems,
}: SidebarProps) {
  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300`}
    >
      {/* Logo */}
      <div className='h-16 flex items-center px-4 border-b border-slate-800'>
        {collapsed ? (
          <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mx-auto'>
            <TrendingUp className='w-5 h-5 text-white' />
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center'>
              <TrendingUp className='w-5 h-5 text-white' />
            </div>
            <span className='font-semibold text-lg'>WealthView</span>
          </div>
        )}
      </div>

      {/* Navegación */}
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
                {!collapsed && (
                  <span className='text-sm font-medium'>{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón colapsar */}
      <div className='p-3 border-t border-slate-800'>
        <button
          onClick={onToggle}
          className='w-full flex items-center justify-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors'
        >
          {collapsed ? (
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
  );
}
