
import { useEffect, useState } from "react";
import type { MapMouseEvent } from "maplibre-gl";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  useMap,
} from "@/components/ui/map";
import { Button } from "@/components/ui/button";

import "maplibre-gl/dist/maplibre-gl.css";


const gtaStyle = {
  version: 8 as const,
  sources: {
    gtav: {
      type: "raster" as const,
      tiles: ["/tiles/satelite/{z}/{x}-{y}.webp"],
      tileSize: 256,
      minzoom: 0,
      maxzoom: 5,
    },
  },
  layers: [
    {
      id: "background",
      type: "background" as const,
      paint: {
        "background-color": "#273a5f",
      },
    },
    {
      id: "gtav-layer",
      type: "raster" as const,
      source: "gtav",
    },
  ],
};

type Location = {
  id: number;
  name: string;
  x: number;
  y: number;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Legion Square",
    x: 195.17,
    y: -933.77,
  },
  {
    id: 2,
    name: "Mission Row Police Department",
    x: 425.13,
    y: -979.56,
  },
  {
    id: 3,
    name: "Pillbox Medical Center",
    x: 307.15,
    y: -595.22,
  },
  {
    id: 4,
    name: "Los Santos Customs",
    x: -365.43,
    y: -131.81,
  },
  {
    id: 5,
    name: "Del Perro Pier",
    x: -1850.12,
    y: -1231.45,
  },
  {
    id: 6,
    name: "Sandy Shores Sheriff's Office",
    x: 1853.21,
    y: 3689.14,
  },
  {
    id: 7,
    name: "Paleto Bay Sheriff's Office",
    x: -447.23,
    y: 6013.45,
  },
];


const GTA = {
  west: -180,
  east: 85.78125,
  north: 85.051129,
  south: -85.051129,
  x1: -3900,
  x2: 6000,
  y1: 8000,
  y2: -4000,
};

function toGtaCoords(lng: number, lat: number) {
  return {
    x: GTA.x1 + ((lng - GTA.west) / (GTA.east - GTA.west)) * (GTA.x2 - GTA.x1),
    y: GTA.y1 + ((lat - GTA.north) / (GTA.south - GTA.north)) * (GTA.y2 - GTA.y1),
  };
}

function toMapCoords(x: number, y: number) {
  return {
    lng: GTA.west + ((x - GTA.x1) / (GTA.x2 - GTA.x1)) * (GTA.east - GTA.west),
    lat: GTA.north + ((y - GTA.y1) / (GTA.y2 - GTA.y1)) * (GTA.south - GTA.north),
  };
}

function GtaMapEvents({
  onCoords,
  onSelect,
  onZoom,
}: {
  onCoords: (coords: { x: number; y: number } | null) => void;
  onSelect: (coords: { x: number; y: number }) => void;
  onZoom: (zoom: number) => void;
}) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.doubleClickZoom.disable();
    map.dragRotate.disable();
    map.keyboard.disable();
    map.touchZoomRotate.disableRotation();

    const move = (event: MapMouseEvent) => {
      onCoords(toGtaCoords(event.lngLat.lng, event.lngLat.lat));
    };

    const leave = () => onCoords(null);

    const click = (event: MapMouseEvent) => {
      onSelect(toGtaCoords(event.lngLat.lng, event.lngLat.lat));
    };

    const zoom = () => onZoom(map.getZoom());

    map.on("mousemove", move);
    map.on("mouseout", leave);
    map.on("click", click);
    map.on("zoom", zoom);

    return () => {
      map.off("mousemove", move);
      map.off("mouseout", leave);
      map.off("click", click);
      map.off("zoom", zoom);
    };
  }, [map, isLoaded, onCoords, onSelect, onZoom]);

  return null;
}

export function GTAMap() {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState<{ x: number; y: number } | null>(null);
  const [zoom, setZoom] = useState(0);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl border bg-background">
      <Map
        styles={{ light: gtaStyle, dark: gtaStyle }}
        center={[0, 0]}
        zoom={0}
        minZoom={0}
        maxZoom={5}
        renderWorldCopies={false}
        >
        <MapControls
          position="top-right"
          showZoom
          showCompass={false}
          showLocate={false}
          showFullscreen={false}
        />
        <GtaMapEvents
          onCoords={setCoords}
          onSelect={setSelected}
          onZoom={setZoom}
        />
{locations.map((location) => {
  const coords = toMapCoords(location.x, location.y);

  return (
    <MapMarker
      key={location.id}
      longitude={coords.lng}
      latitude={coords.lat}
    >
      <MarkerContent>
        <div className="size-4 rounded-full border-2 border-white bg-primary shadow-lg" />
      </MarkerContent>

      <MarkerTooltip>{location.name}</MarkerTooltip>

      <MarkerPopup>
        <div className="space-y-1">
          <p className="font-medium">{location.name}</p>
          <p className="text-xs text-muted-foreground">
            X: {location.x.toFixed(2)}, Y: {location.y.toFixed(2)}
          </p>
        </div>
      </MarkerPopup>
    </MapMarker>
  );
})}
        
      </Map>

      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-lg border border-white/10 bg-zinc-950/90 px-3 py-2 text-xs text-zinc-300 shadow-lg">
        <span className="text-zinc-500">ZOOM</span>{" "}
        <span className="font-mono">{zoom.toFixed(2)}</span>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-lg border border-white/10 bg-zinc-950/90 px-3 py-2 font-mono text-xs text-zinc-200 shadow-lg">
        <span className="text-zinc-500">X:</span>{" "}
        {coords ? coords.x.toFixed(1) : "—"}
        <span className="mx-2 text-zinc-600">|</span>
        <span className="text-zinc-500">Y:</span>{" "}
        {coords ? coords.y.toFixed(1) : "—"}
      </div>

      {selected && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-3 rounded-lg border border-white/10 bg-zinc-950/95 p-3 text-xs text-zinc-200 shadow-lg">
          <div>
            <p className="text-zinc-500">Selected coordinates</p>
            <p className="mt-1 font-mono">
              {selected.x.toFixed(2)}, {selected.y.toFixed(2)}
            </p>
          </div>
          <Button
            size="sm"
            onClick={() =>
              void navigator.clipboard.writeText(
                `vector3(${selected.x.toFixed(2)}, ${selected.y.toFixed(2)}, 0.0)`
              )
            }
          >
            Copy
          </Button>
        </div>
      )}
    </div>
  );
}
