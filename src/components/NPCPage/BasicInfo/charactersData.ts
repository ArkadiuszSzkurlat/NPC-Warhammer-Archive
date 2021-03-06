import { RaceType } from '../../../types/types';

export const races: RaceType[] = [
  {
    name: 'Człowiek',
    initialStats: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    initialAge: 15,
    diceThrowsAge: 1,
    initialHeight: 150,
    diceThrowsHeight: 4,
  },
  {
    name: 'Krasnolud',
    initialStats: [30, 20, 20, 30, 20, 10, 30, 20, 40, 10],
    initialAge: 15,
    diceThrowsAge: 10,
    initialHeight: 130,
    diceThrowsHeight: 2,
  },
  {
    name: 'Niziołek',
    initialStats: [10, 30, 10, 20, 20, 20, 30, 20, 30, 30],
    initialAge: 15,
    diceThrowsAge: 5,
    initialHeight: 95,
    diceThrowsHeight: 2,
  },
  {
    name: 'Elf',
    initialStats: [30, 30, 20, 20, 40, 30, 30, 30, 30, 20],
    initialAge: 30,
    diceThrowsAge: 10,
    initialHeight: 180,
    diceThrowsHeight: 3,
  },
  {
    name: 'Gnom',
    initialStats: [20, 10, 10, 15, 30, 30, 30, 30, 40, 15],
    initialAge: 20,
    diceThrowsAge: 10,
    initialHeight: 100,
    diceThrowsHeight: 3,
  },
];

export const statusTypes: string[] = [
  '🫓 Brąz 1',
  '🫓 Brąz 2',
  '🫓 Brąz 3',
  '🫓 Brąz 4',
  '🫓 Brąz 5',
  '💿 Srebro 1',
  '💿 Srebro 2',
  '💿 Srebro 3',
  '💿 Srebro 4',
  '💿 Srebro 5',
  '📀 Złoto 1',
  '📀 Złoto 2',
  '📀 Złoto 3',
  '📀 Złoto 4',
  '📀 Złoto 5',
];

export const classes = [
  'Aptekarz',
  'Czarodziej',
  'Inżynier',
  'Kapłan',
  'Medyk',
  'Mnich',
  'Prawnik',
  'Uczony',
  'Agitator',
  'Kupiec',
  'Mieszczanin',
  'Rzemieślnik',
  'Strażnik',
  'Szczurołap',
  'Śledczy',
  'Żebrak',
  'Artysta',
  'Doradca',
  'Namiestnik',
  'Poseł',
  'Służący',
  'Szlachcic',
  'Szpieg',
  'Zwadźca',
  'Chłop',
  'Górnik',
  'Guślarz',
  'Łowca',
  'Mistyk',
  'Zarządca',
  'Zielarz',
  'Zwiadowca',
  'Biczownik',
  'Domokrążca',
  'Kuglarz',
  'Łowca Czarownic',
  'Łowca Nagród',
  'Posłaniec',
  'Strażnik Dróg',
  'Woźnica',
  'Doker',
  'Flisak',
  'Pilot Rzeczny',
  'Pirat Rzeczny',
  'Przemytnik',
  'Przewoźnik',
  'Strażnik Rzeczny',
  'Żeglarz',
  'Banita',
  'Czarownica',
  'Hienca Cmentarna',
  'Paser',
  'Rajfur',
  'Rekieter',
  'Szarlatan',
  'Złodziej',
  'Gladiator',
  'Kapłan Bitewny',
  'Kawalerzysta',
  'Ochroniarz',
  'Oprych',
  'Rycerz',
  'Zabójca',
  'Żołnierz',
];
