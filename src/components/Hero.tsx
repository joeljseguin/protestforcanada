import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }} />
      <div className="container relative py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-civic-red/20 text-civic-red px-3 py-1 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-civic-red animate-pulse" />
            Live Tracking Active
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            Hold Power
            <br />
            <span className="text-civic-red">Accountable.</span>
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-8 max-w-xl leading-relaxed animate-fade-in" style={{ animationDelay: "200ms" }}>
            Track government spending, follow legislation, and organize for change. Real data from Open Government Canada.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <Button size="lg" variant="secondary" className="font-semibold">
              Explore Issues
            </Button>
            <Button size="lg" variant="ghost" className="border border-primary-foreground/20 hover:bg-primary-foreground/10 font-semibold">
              View Spending Data
            </Button>
          </div>
        </div>
        <a href="#topics" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-60 hover:opacity-100 transition-opacity">
          <ArrowDown className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
};
