export const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getRole = (user) => {
  if (user['staff?']) {
    return ['🐟', 'Staff'];
  } else if (user['alumni?']) {
    return ['🧑‍🎓', 'Alumni'];
  } else if (user['active?']) {
    return ['🧑‍💻', 'Étudiant'];
  } else {
    return ['🏴', 'Désactivé'];
  }
};
