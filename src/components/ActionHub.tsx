import { events, type UpcomingEvent } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { format, parseISO } from "date-fns";

const eventTypeStyles: Record<UpcomingEvent["type"], string> = {
  protest: "bg-civic-red text-accent-foreground",
  townhall: "bg-primary text-primary-foreground",
  rally: "bg-civic-amber text-foreground",
};

export const ActionHub = () => {
  return (
    <section id="action" className="py-16">
      <div className="container">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Action Hub</h2>
          <p className="text-muted-foreground text-lg">Upcoming events near you. Show up. Be counted.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="bg-card rounded-lg border p-5 card-hover animate-fade-in flex flex-col"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <Badge className={eventTypeStyles[event.type]}>{event.type}</Badge>
                <span className="text-xs text-muted-foreground">{event.topic}</span>
              </div>
              <h3 className="font-semibold text-lg mb-3">{event.title}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-1">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 shrink-0" />
                  <span>{format(parseISO(event.date), "MMMM d, yyyy")} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0" />
                  <span>{event.attendees.toLocaleString()} expected</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                RSVP
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
