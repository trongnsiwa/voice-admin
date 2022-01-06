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
    colors: {
      primary: {
        light: '#fdffb7',
        DEFAULT: '#fafc80',
        dark: '#c8c988',
      },
      secondary: {
        light: '#E4E6EB',
        DEFAULT: '#474747',
        dark: '#383838',
      },
      error: '#fe0000',
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
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
          accent: '#474747',
          'accent-focus': '#383838',
          'accent-content': '#ffffff',
          neutral: '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          info: '#2094f3',
          success: '#009485',
          warning: '#ff9900',
          error: '#ff5724',
        },
      },
    ],
  },
};
