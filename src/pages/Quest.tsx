{/* --- UPDATED QUEST HEADER (READABLE) --- */}
<div className="bg-accent p-6 border-b-4 border-black mb-8 shadow-[6px_6px_0_black]">
  <h1 className="text-4xl md:text-6xl font-black uppercase italic text-black tracking-tighter">
    {mission.name}
  </h1>
  <div className="flex gap-2 mt-2">
    <span className="bg-black text-accent px-3 py-1 text-xs font-black uppercase tracking-widest">
      Active Objective
    </span>
    <span className="bg-white/20 text-black px-3 py-1 text-xs font-black uppercase tracking-widest border border-black/10">
      {mission.xpBounty} XP Reward
    </span>
  </div>
</div>

{/* --- INTEL SECTION (READABLE) --- */}
<div className="bg-white border-2 border-foreground p-6 mb-8">
  <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
    <span className="w-2 h-6 bg-accent" /> Mission Briefing
  </h2>
  <p className="text-lg font-bold leading-relaxed text-slate-900 border-l-4 border-accent pl-4">
    {mission.description}
  </p>
</div>

{/* --- THE SCRIPT (THE MOST IMPORTANT PART) --- */}
<div className="bg-slate-900 text-white p-8 border-2 border-accent rounded-sm relative overflow-hidden">
  {/* Diagonal Watermark Effect */}
  <div className="absolute top-0 right-0 p-2 bg-accent text-black font-black text-[10px] uppercase rotate-45 translate-x-4 -translate-y-2">
    Official Script
  </div>
  
  <h3 className="text-accent font-black uppercase tracking-widest mb-4 text-sm">Target: {mission.stages?.[0]?.label}</h3>
  <p className="text-xl md:text-2xl font-black italic text-white leading-tight mb-6">
    "{mission.script || "Demand immediate action on this humanitarian crisis. Human rights are non-negotiable."}"
  </p>
</div>
