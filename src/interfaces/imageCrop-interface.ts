export interface ICrop {
    unit: "%" | "px" | "in" | "cm" | "mm" | undefined;
    x: number;
    y: number;
    width: number;
    height: number;
}
