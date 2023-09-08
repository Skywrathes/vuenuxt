export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
  url: string;
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  string;
}

export interface Episodes {
  info:    EpisodesInfo;
  results: Result[];
}

export interface EpisodesInfo {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface Result {
  id:         number;
  name:       string;
  air_date:   string;
  episode:    string;
  characters: string[];
  url:        string;
  created:    Date;
}