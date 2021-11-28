/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import aspectRatio from 'windicss/plugin/aspect-ratio';

export default defineConfig({
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        // gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
        primary: {
          400: '#ffbd38',
          500: '#ffaa00',
          600: '#cc8800',
          700: '#996600',
          800: '664400',
          900: '#332200',
        },
        abc: 'salmon',
        white: {
          main: colors.light[100],
          secondary: colors.light[900],
          true: '#fffff',
        },
        gray: {
          main: colors.coolGray[500],
          disabled: colors.coolGray[400],
        },
        black: {
          main: colors.dark[800],
          secondary: colors.dark[100],
          true: '#000000',
        },
      },
      fontFamily: {
        sans: ['Fira Sans', 'Roboto', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: [
          'Fira Code',
          'Consolas',
          'source-code-pro',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  shortcuts: {
    'secondary-text': 'text-sm text-gray-500',
    'transition-short': 'transition-all duration-200 east-in-out',
    'transition-normal': 'transition-all duration-300 east-in-out',
    'transition-long': 'transition-all duration-500 east-in-out',
  },
  plugins: [aspectRatio],
});
