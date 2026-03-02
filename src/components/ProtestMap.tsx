import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { calendarEvents, type CalendarEvent } from "@/data/gameData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Users, Zap, ShieldCheck } from "lucide-react";
import { EventRegistrationForm } from "./EventRegistrationForm";
import "leaflet/dist/leaflet.css";

// Fix default Leaflet marker icons in bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const typeColors: Record<CalendarEvent["type"], string> = {
  protest: "#ef4444",
  townhall: "#3b82f6",
  rally: "#f59e0b",
  signing: "#10b981",
};

const createIcon = (type: CalendarEvent["type"]) =>
  L.divIcon({
    className: "custom-pin",
    html: `<div style="background:${typeColors[type]};width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.4);"></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

function FitBounds({ events }: { events: CalendarEvent[] }) {
  const map = useMap();
  useEffect(() => {
    if (events.length > 0) {
      const bounds = L.latLngBounds(events.map((e) => [e.lat, e.lng]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [events, map]);
  return null;
}

export const ProtestMap = () => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="neu-border neu-shadow bg-card overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h4 className="font-heading font-extrabold text-lg uppercase flex items-center gap-2">
          <MapPin className="h-5 w-5" /> Live Action Map — Canada
        </h4>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          {Object.entries(typeColors).map(([type, color]) => (
            <span key={type} className="flex items-center gap-1">
              <span style={{ background: color }} className="w-3 h-3 rounded-full inline-block" />
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="h-[450px] relative">
        <MapContainer
          center={[56.1304, -106.3468]}
          zoom={4}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          style={{ background: "hsl(var(--muted))" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds events={calendarEvents} />
          {calendarEvents.map((event) => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createIcon(event.type)}
              eventHandlers={{
                click: () => setSelectedEvent(event),
              }}
            >
              <Popup maxWidth={320} minWidth={280}>
                <div className="font-sans text-sm space-y-2 p-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white"
                      style={{ background: typeColors[event.type] }}
                    >
                      {event.type}
                    </span>
                    {event.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-green-600 font-bold">
                        <ShieldCheck className="h-3 w-3" /> Verified
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-base">{event.title}</div>
                  <div className="text-muted-foreground text-xs space-y-1">
                    <div>📅 {new Date(event.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })} · {event.time}</div>
                    <div>📍 {event.location}</div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" /> {event.attendees.toLocaleString()} expected
                    </div>
                    <div>🏢 {event.organizer}</div>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={event.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="h-2.5 w-2.5" /> {event.source}
                    </a>
                    <span className="text-[10px] font-bold flex items-center gap-0.5">
                      <Zap className="h-2.5 w-2.5" /> +{event.xpReward} XP
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowRegister(true);
                    }}
                    className="w-full mt-2 bg-foreground text-background text-xs font-bold py-2 px-3 uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Register for This Event
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {showRegister && selectedEvent && (
        <EventRegistrationForm
          event={selectedEvent}
          onClose={() => setShowRegister(false)}
        />
      )}
    </div>
  );
};
