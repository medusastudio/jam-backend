export default {
  update: {
    Default: {
      value: {
        email: 'email@jam.studio',
        password: 'password',
        firstName: 'Jan',
        lastName: 'Dunno',
        country: 'GE',
        city: 'Berlin',
      },
    },
    'Invalid country': {
      value: {
        email: 'email',
        password: 'password',
        firstName: 'Jan',
        lastName: 'Dunno',
        country: 'XX',
        city: 'Hamburg',
      },
    },
  },
};
