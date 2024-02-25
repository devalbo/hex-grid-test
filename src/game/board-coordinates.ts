
export const NUM_HEX_ROWS = 11;
export const NUM_HEX_COLUMNS = 11;
export const NUM_SLICE_COLUMNS = 16;


export const isBoardSpace = (bzRow: number, bzColumn: number): boolean => {
  switch (bzRow) {
    case 1: 
      return bzColumn >= 1 &&
             bzColumn <= 6;
    case 2: 
      return bzColumn >= 2 &&
             bzColumn <= 6;
    case 3:
      return bzColumn >= 2 &&
             bzColumn <= 7;
    case 4:
      return bzColumn >= 3 &&
             bzColumn <= 7;
    case 5:
      return bzColumn >= 3 &&
             bzColumn <= 8;
    case 6:
      return bzColumn >= 3 &&
             bzColumn <= 9;
    case 7:
      return bzColumn >= 4 &&
             bzColumn <= 9;
    case 8:
      return bzColumn >= 5 &&
             bzColumn <= 9;
    case 9:
      return bzColumn >= 5 &&
             bzColumn <= 10;
    case 10:
      return bzColumn >= 6 &&
             bzColumn <= 10;
    case 11:
      return bzColumn >= 6 &&
             bzColumn <= 11;
  }

  return false;
}
