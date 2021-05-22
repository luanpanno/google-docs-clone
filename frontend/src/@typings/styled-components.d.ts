import { theme } from '../assets/styles/theme';

type CustomTheme = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends CustomTheme {}
}
