export interface NPCArchetype {
  folder: string;
  name: string;
  race: string;
  class: string;
  status: string;
  age: number;
  height: number;
  stats: Array<number>;
  skills: Array<string>;
  talents: Array<string>;
  items: Array<string>;
  description: string;
}

export interface NPCInitialState {
  names: string[];
  folders: Folders[];
}

export interface NpcInitialRootState {
  NPCharactersSlice: NPCInitialState;
}

export interface Folders {
  name: string;
  files: string[];
}
export interface RaceType {
  name: string;
  initialStats: number[];
}
