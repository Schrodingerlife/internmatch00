import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Trophy, Target, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Aplicadas', value: 12 },
  { name: 'Em Análise', value: 4 },
  { name: 'Entrevistas', value: 2 },
  { name: 'Rejeitadas', value: 1 },
];

const COLORS = ['#3F51B5', '#FFC107', '#4CAF50', '#E91E63'];

const Dashboard: React.FC = () => {
  return (
    <div className="p-5 pb-24 space-y-6">
      <h2 className="text-2xl font-bold text-textDark">Meu Progresso</h2>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <Trophy className="text-accent mb-1" size={24} />
            <span className="text-2xl font-bold text-textDark">5</span>
            <span className="text-[10px] text-textLight uppercase font-bold">Dias Seguidos</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <Target className="text-primary mb-1" size={24} />
            <span className="text-2xl font-bold text-textDark">12</span>
            <span className="text-[10px] text-textLight uppercase font-bold">Vagas</span>
        </div>
        <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center justify-center text-center">
            <TrendingUp className="text-secondary mb-1" size={24} />
            <span className="text-2xl font-bold text-textDark">85%</span>
            <span className="text-[10px] text-textLight uppercase font-bold">Perfil</span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm">
        <h3 className="font-bold text-textDark mb-4">Status das Candidaturas</h3>
        <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
            {data.map((d, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-gray-600">{d.name}: {d.value}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
