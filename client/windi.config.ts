/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';
import plugin from 'windicss/plugin';
// import forms from 'windicss/plugin/forms';
import aspectRatio from 'windicss/plugin/aspect-ratio';

function range(size, startAt = 1) {
  return Array.from(Array(size).keys()).map((i) => i + startAt);
}

const sizeList = range(40, 60);

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
        gray: colors.coolGray,
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
          main: colors.light[500],
          secondary: colors.coolGray[300],
          true: '#fffff',
        },
        black: {
          main: colors.dark[800],
          secondary: colors.dark[400],
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
  safelist: [
    sizeList.map((i) => `w-${i}px`),
    sizeList.map((i) => `h-${i}px`),
    'w-xs w-sm w-md w-lg w-xl w-2xl w-3xl',
  ],
  plugins: [
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.skew-10deg': {
          transform: 'skewY(-10deg)',
        },
        '.skew-15deg': {
          transform: 'skewY(-15deg)',
        },
      };
      addUtilities(newUtilities);
    }),
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
        },
        '.btn-blue': {
          backgroundColor: '#3490dc',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#2779bd',
          },
        },
        '.btn-red': {
          backgroundColor: '#e3342f',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#cc1f1a',
          },
        },
      };
      addComponents(buttons);
    }),
    plugin(({ addDynamic, variants }) => {
      addDynamic(
        'skew',
        ({ Utility, Style }) => {
          return Utility.handler
            .handleStatic(Style('skew'))
            .handleNumber(0, 360, 'int', (number) => `skewY(-${number}deg)`)
            .createProperty('transform');
        },
        variants('skew')
      );
    }),
    aspectRatio,
    // forms,
  ],
});
