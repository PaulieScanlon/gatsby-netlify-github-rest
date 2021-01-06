export default {
  colors: {
    text: '#000000',
    background: '#ffffff',
    gray: '#f3f3f3',
    primary: '#ff4081',
    secondary: '#2196f3',
    tertiary: '#76ff03',
  },
  fonts: {
    body: 'system-ui',
    heading: 'system-ui',
  },
  fontWeights: {
    body: 400,
    heading: 700,
  },
  lineHeights: {
    heading: 1,
    body: 1.5,
  },
  sizes: {
    container: '64em',
  },
  styles: {
    root: {
      fontFamily: 'body',
    },
    a: {
      color: 'primary',
      transition: '.2s linear color',
      ':hover': {
        color: 'text',
      },
      ':focus': {
        outlineColor: 'primary',
      },
    },
    pre: {
      fontSize: 0,
      p: 3,
      backgroundColor: 'gray',
    },
    spinner: {
      color: 'text',
    },
  },
  layout: {
    container: {
      px: [3, 4],
    },
  },
}
