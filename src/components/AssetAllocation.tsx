import { PieChart as PieIcon } from 'lucide-react';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import type { AssetSlice } from '../typesUtils/types';

interface AssetAllocationProps {
  data: AssetSlice[];
}

export default function AssetAllocation({ data }: AssetAllocationProps) {
  // Recharts lee la prop `fill` directamente de cada objeto del array de datos
  const dataWithFill = data.map((item) => ({ ...item, fill: item.color }));

  return (
    <div className='bg-slate-800/50 border border-slate-700/50 rounded-lg p-5'>
      {/* Cabecera */}
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h3 className='text-white font-semibold'>Distribución de Activos</h3>
          <p className='text-slate-500 text-sm'>Pesos actuales</p>
        </div>
        <PieIcon className='w-5 h-5 text-slate-500' />
      </div>

      {/* Donut */}
      <div className='h-40 mb-4'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={dataWithFill}
              cx='50%'
              cy='50%'
              innerRadius={45}
              outerRadius={70}
              paddingAngle={2}
              dataKey='value'
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Leyenda */}
      <div className='space-y-3'>
        {data.map((item) => (
          <div key={item.name} className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div
                className='w-3 h-3 rounded-full'
                style={{ backgroundColor: item.color }}
              />
              <span className='text-slate-300 text-sm truncate max-w-35'>
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
  );
}
