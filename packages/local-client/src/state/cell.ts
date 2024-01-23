export type CellTypes = "code" | "text";
export type CellDirection = "up" | "down";

export interface ICell {
  id: string;
  type: CellTypes;
  data: string;
  direction?: CellDirection;
}
