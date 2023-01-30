export default interface Player {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  last_name: string;
  position: string;
  team: Object;
  weight_pounds: number|null;
  fav: boolean|undefined
}
