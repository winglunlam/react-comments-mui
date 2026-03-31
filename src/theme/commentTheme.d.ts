import { ThemeOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
    interface Theme {
        reactCommentsMui?: {
            containerBackgroundColor?: string;
            containerMaxWidth?: string | number;
            avatarSize?: number;
            cardBorderRadius?: number;
        };
    }
    interface ThemeOptions {
        reactCommentsMui?: {
            containerBackgroundColor?: string;
            containerMaxWidth?: string | number;
            avatarSize?: number;
            cardBorderRadius?: number;
        };
    }
}
export declare const createCommentTheme: (options?: ThemeOptions) => import("@mui/material/styles").Theme;
export declare const defaultCommentTheme: import("@mui/material/styles").Theme;
