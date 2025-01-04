export type ThemeColors =
    | 'Slate'
    | 'Zinc'
    | 'Rose'
    | 'Blue'
    | 'Green'
    | 'Orange'
    | 'Violet'
    | 'Yellow';

export interface ThemeColorStateParams {
    themeColor: ThemeColors;
    setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
