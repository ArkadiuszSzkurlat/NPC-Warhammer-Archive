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
  avatarURL: string;
}

export interface NPCInitialState {
  npcs: NPCWithAvatar[];
  folders: Folders[];
}
export interface NPCWithAvatar {
  name: string;
  avatarURL: string;
}
export interface NpcInitialRootState {
  NPCharactersSlice: NPCInitialState;
}

export interface Folders {
  name: string;
  files: NPCWithAvatar[];
}
export interface RaceType {
  name: string;
  initialStats: number[];
}
