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
      } bg-slate-950 border-r border-border-light flex flex-col transition-all duration-300`}
      style={{ transition: '300ms ease' }}
    >
      {/* Logo */}
      <div className='h-16 flex items-center px-4 border-b border-border-light'>
        {collapsed ? (
          <div className='w-8 h-8 bg-accent rounded-lg flex items-center justify-center mx-auto'>
            <TrendingUp className='w-5 h-5 text-text-primary' />
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-accent rounded-lg flex items-center justify-center'>
              <TrendingUp className='w-5 h-5 text-text-primary' />
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
                    ? 'bg-accent/20 text-indigo-400'
                    : 'text-text-secondary hover:bg-bg-subtle hover:text-text-primary'
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
      <div className='p-3 border-t border-border-light'>
        <button
          onClick={onToggle}
          className='w-full flex items-center justify-center gap-2 px-3 py-2 text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors'
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
