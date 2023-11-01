import getLocale from '../constants/localization';

export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getRole = (user, language) => {
  if (user['staff?']) {
    return ['🐟', 'Staff'];
  } else if (user['alumni?']) {
    return ['🧑‍🎓', 'Alumni'];
  } else if (user['active?']) {
    return ['🧑‍💻', getLocale(language, 'student')];
  } else {
    return ['🏴', getLocale(language, 'deactivated')];
  }
};
