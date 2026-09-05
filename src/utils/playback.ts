const STORAGE_KEY = 'cinema_last_watched';

interface LastWatchedEpisode {
  episodeSlug: string;
  serverIndex: number;
  timestamp: number;
}

interface LastWatchedMap {
  [movieSlug: string]: LastWatchedEpisode;
}

function getLastWatchedMap(): LastWatchedMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as LastWatchedMap;
  } catch {
    return {};
  }
}

function saveLastWatchedMap(map: LastWatchedMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage errors (e.g. private mode)
  }
}

export function getLastWatchedEpisode(movieSlug: string): LastWatchedEpisode | null {
  const map = getLastWatchedMap();
  return map[movieSlug] || null;
}

export function saveLastWatchedEpisode(
  movieSlug: string,
  episodeSlug: string,
  serverIndex: number
): void {
  const map = getLastWatchedMap();
  map[movieSlug] = { episodeSlug, serverIndex, timestamp: Date.now() };
  saveLastWatchedMap(map);
}
