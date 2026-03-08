import React from 'react';
import { motion } from 'motion/react';

export const BlastFurnaceDiagram = () => {
  const [activePart, setActivePart] = React.useState<string | null>(null);

  const parts = [
    { id: 'top', label: 'Charge (Ore + Coke + Limestone)', desc: 'Raw materials are fed into the top of the furnace.' },
    { id: 'middle', label: 'Reduction Zone', desc: 'Carbon monoxide reduces iron oxide to iron: Fe2O3 + 3CO → 2Fe + 3CO2' },
    { id: 'bottom', label: 'Molten Iron & Slag', desc: 'Molten iron sinks to the bottom, while slag floats on top.' },
    { id: 'tuyeres', label: 'Hot Air Blast', desc: 'Hot air is blown in to burn coke and provide heat.' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="relative h-80 flex justify-center">
        <svg viewBox="0 0 200 300" className="h-full">
          {/* Furnace Body */}
          <path d="M60 20 L140 20 L160 250 L40 250 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" />
          
          {/* Interactive Zones */}
          <rect 
            x="65" y="30" width="70" height="40" 
            fill={activePart === 'top' ? '#3b82f6' : '#64748b'} 
            className="cursor-pointer transition-colors"
            onClick={() => setActivePart('top')}
          />
          <rect 
            x="55" y="80" width="90" height="100" 
            fill={activePart === 'middle' ? '#3b82f6' : '#64748b'} 
            className="cursor-pointer transition-colors"
            onClick={() => setActivePart('middle')}
          />
          <rect 
            x="45" y="190" width="110" height="50" 
            fill={activePart === 'bottom' ? '#3b82f6' : '#64748b'} 
            className="cursor-pointer transition-colors"
            onClick={() => setActivePart('bottom')}
          />
          
          {/* Tuyeres */}
          <line x1="30" y1="210" x2="50" y2="210" stroke="#ef4444" strokeWidth="4" onClick={() => setActivePart('tuyeres')} className="cursor-pointer" />
          <line x1="170" y1="210" x2="150" y2="210" stroke="#ef4444" strokeWidth="4" onClick={() => setActivePart('tuyeres')} className="cursor-pointer" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/20 font-bold text-4xl uppercase tracking-widest rotate-90">Blast Furnace</span>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-display font-bold text-xl text-primary">Interactive Diagram</h4>
        <p className="text-sm text-slate-500">Click on the furnace parts to learn more.</p>
        
        <div className="min-h-[120px] p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          {activePart ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activePart}>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">{parts.find(p => p.id === activePart)?.label}</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">{parts.find(p => p.id === activePart)?.desc}</p>
            </motion.div>
          ) : (
            <p className="text-slate-400 italic text-center mt-8">Select a part to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const ElectrolysisDiagram = () => {
  const [activePart, setActivePart] = React.useState<string | null>(null);

  const parts = [
    { id: 'anode', label: 'Carbon Anodes (+)', desc: 'Oxygen ions are attracted here and react with carbon to form CO2.' },
    { id: 'cathode', label: 'Carbon Lining Cathode (-)', desc: 'Aluminium ions are reduced here to form liquid metal.' },
    { id: 'electrolyte', label: 'Alumina in Molten Cryolite', desc: 'The mixture that allows ions to flow at a lower temperature.' },
    { id: 'metal', label: 'Molten Aluminium', desc: 'Pure metal collected at the bottom of the cell.' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="relative h-80 flex justify-center">
        <svg viewBox="0 0 200 200" className="h-full">
          {/* Tank */}
          <rect x="20" y="40" width="160" height="120" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          
          {/* Electrolyte */}
          <rect 
            x="30" y="50" width="140" height="80" 
            fill={activePart === 'electrolyte' ? '#3b82f6' : '#94a3b8'} 
            className="cursor-pointer transition-colors"
            onClick={() => setActivePart('electrolyte')}
          />
          
          {/* Anodes */}
          <rect x="50" y="20" width="20" height="60" fill={activePart === 'anode' ? '#ef4444' : '#1e293b'} className="cursor-pointer" onClick={() => setActivePart('anode')} />
          <rect x="90" y="20" width="20" height="60" fill={activePart === 'anode' ? '#ef4444' : '#1e293b'} className="cursor-pointer" onClick={() => setActivePart('anode')} />
          <rect x="130" y="20" width="20" height="60" fill={activePart === 'anode' ? '#ef4444' : '#1e293b'} className="cursor-pointer" onClick={() => setActivePart('anode')} />
          
          {/* Cathode Lining */}
          <path 
            d="M20 160 L180 160 L180 170 L20 170 Z" 
            fill={activePart === 'cathode' ? '#10b981' : '#1e293b'} 
            className="cursor-pointer"
            onClick={() => setActivePart('cathode')}
          />
          
          {/* Molten Metal */}
          <rect 
            x="30" y="130" width="140" height="30" 
            fill={activePart === 'metal' ? '#f59e0b' : '#e2e8f0'} 
            className="cursor-pointer"
            onClick={() => setActivePart('metal')}
          />
        </svg>
      </div>

      <div className="space-y-4">
        <h4 className="font-display font-bold text-xl text-primary">Electrolysis Cell</h4>
        <p className="text-sm text-slate-500">Hall-Héroult Process for Aluminium.</p>
        
        <div className="min-h-[120px] p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          {activePart ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activePart}>
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">{parts.find(p => p.id === activePart)?.label}</h5>
              <p className="text-sm text-slate-600 dark:text-slate-400">{parts.find(p => p.id === activePart)?.desc}</p>
            </motion.div>
          ) : (
            <p className="text-slate-400 italic text-center mt-8">Select a part to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};
