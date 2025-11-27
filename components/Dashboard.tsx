import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, Target, TrendingUp, Activity } from 'lucide-react';

const data = [
  { name: 'Aplicadas', value: 12 },
  { name: 'Em Análise', value: 4 },
  { name: 'Entrevistas', value: 2 },
  { name: 'Rejeitadas', value: 1 },
];

// Updated to match new theme: Primary, Accent, Secondary, Error
const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 pb-32 space-y-8 bg-neutral min-h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-extrabold text-textDark tracking-tight">Meu Progresso</h2>
        <div className="bg-white p-2 rounded-full shadow-sm">
          <Activity size={20} className="text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <div className="bg-amber-50 p-3 rounded-full mb-2">
            <Trophy className="text-accent" size={24} />
          </div>
          <span className="text-3xl font-black text-textDark tracking-tighter">5</span>
          <span className="text-[10px] text-textLight uppercase font-bold tracking-wider">Dias Seguidos</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <div className="bg-indigo-50 p-3 rounded-full mb-2">
            <Target className="text-primary" size={24} />
          </div>
          <span className="text-3xl font-black text-textDark tracking-tighter">12</span>
          <span className="text-[10px] text-textLight uppercase font-bold tracking-wider">Vagas</span>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          <div className="bg-emerald-50 p-3 rounded-full mb-2">
            <TrendingUp className="text-secondary" size={24} />
          </div>
          <span className="text-3xl font-black text-textDark tracking-tighter">85%</span>
          <span className="text-[10px] text-textLight uppercase font-bold tracking-wider">Perfil</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="font-bold text-lg text-textDark mb-6 flex items-center gap-2">
          Status das Candidaturas
        </h3>
        <div className="h-56 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
            <span className="text-3xl font-black text-textDark block">19</span>
            <span className="text-xs text-textLight font-bold uppercase tracking-wide">Total</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-6">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[i] }}></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-700">{d.name}</span>
                <span className="text-[10px] text-gray-400 font-medium">{d.value} vagas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
