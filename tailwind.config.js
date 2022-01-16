module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      backgroundImage: {
        hero: "url('/images/hero.jpg')",
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        secondary: {
          light: '#fdffb7',
          DEFAULT: '#fafc80',
          dark: '#c8c988',
        },
        primary: {
          light: '#E4E6EB',
          DEFAULT: '#474747',
          dark: '#383838',
        },
        error: '#E24036',
        info: {
          DEFAULT: '#E1EFFE',
          dark: '#3F83F8',
        },
        success: {
          DEFAULT: '#DEF7EC',
          dark: '#3C7B62',
        },
        warning: {
          DEFAULT: '#ffd2b7',
          dark: '#ff9900',
        },
        danger: {
          DEFAULT: '#ffdedd',
          dark: '#ff5724',
        },
      },
    },
  },
  variants: {
    fill: [],
    extend: {
      backgroundColor: ['active'],
      tableLayout: ['hover', 'focus'],
      borderColor: ['focus-visible'],
    },
    animation: ['motion-safe'],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#474747',
          'primary-focus': '#383838',
          'primary-content': '#ffffff',
          secondary: '#fafc80',
          'secondary-focus': '#c8c988',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          neutral: '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#3F83F8',
          success: '#19808B',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
    ],
  },
};
