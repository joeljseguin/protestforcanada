        {/* --- CENTERED RED HEADER --- */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-12 text-center mx-auto">
          <div className="inline-block bg-red-600 border-x-2 border-white px-4 py-1 mb-4 shadow-[4px_4px_0_black]">
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white">
              Emergency Dossier Loaded
            </span>
          </div>

          <h2 className="font-black text-4xl md:text-6xl uppercase italic tracking-tighter mb-4 text-foreground leading-tight">
            <span className="text-red-600">{missions.length}</span> Humanitarian Crises
          </h2>
          
          <div className="h-1.5 w-24 bg-red-600 mb-6" />

          <div className="space-y-4 px-4">
            <p className="font-black text-sm md:text-lg uppercase tracking-tight text-foreground max-w-lg leading-relaxed">
              Below are the worst humanitarian crises in Canada. <span className="text-red-600 underline">Start with mission 1.</span>
            </p>
            <p className="font-bold text-xs md:text-sm text-muted-foreground uppercase tracking-widest max-w-md animate-pulse">
              Learn why war crimes are being committed by Canada's Government and Corporations.
            </p>
          </div>
        </div>
