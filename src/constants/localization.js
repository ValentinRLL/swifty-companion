const localization = {
  fr: {
    login: 'Login',
    search: 'Rechercher',
    friends: 'Amis',
    settings: 'Paramètres',
    darkmode: 'Mode sombre',
    language: 'Langue',
    error: 'Erreur',
    loginError: 'Login doit contenir au moins 3 caractères',
    userNotFound: 'Utilisateur introuvable',
    retry: 'Réessayer',
    close: 'Fermer',
    friendAddedTitle: 'Ami ajouté',
    friendRemovedTitle: 'Ami supprimé',
    friendAdded: `Vous avez ajouté %VAR% à votre liste d'amis`,
    friendRemoved: "Vous avez supprimé %VAR% de votre liste d'amis",
    searchLogin: `Rechercher un login`,
    friendList: "Liste d'amis",
    noFriend: `Vous n'avez pas d'amis`,
    searchResult: `Résultat de la recherche pour %VAR% :`,
    foundProfiles: `Profils trouvés (%VAR%)`,
    student: 'Étudiant',
    deactivated: 'Désactivé',
    projects: 'Projets',
    lvl: 'niv.',
    apiError: 'Erreur API',
    skills: 'Compétences',
  },
  en: {
    login: 'Login',
    search: 'Search',
    friends: 'Friends',
    settings: 'Settings',
    darkmode: 'Darkmode',
    language: 'Language',
    error: 'Error',
    loginError: 'Login must contain at least 3 characters',
    userNotFound: 'User not found',
    retry: 'Retry',
    close: 'Close',
    friendAddedTitle: 'Friend added',
    friendRemovedTitle: 'Friend removed',
    friendAdded: `You've added %VAR% to your friend list`,
    friendRemoved: `You've removed %VAR% from your friend list`,
    searchLogin: `Search a login`,
    friendList: 'Friend list',
    noFriend: `You don't have any friend`,
    searchResult: `Search result for %VAR%:`,
    foundProfiles: `Found profiles (%VAR%)`,
    student: 'Student',
    deactivated: 'Deactivated',
    projects: 'Projects',
    lvl: 'lvl.',
    apiError: 'API Error',
    skills: 'Skills',
  },
};

const getLocale = (lang, string, vars) => {
  try {
    let locale = localization[lang || 'fr'][string];
    let count = 0;
    locale = locale.replace(/%VAR%/g, () => (vars[count] !== null ? vars[count++] : '%VAR%'));
    console.log('locale', locale);
    return locale;
  } catch (error) {
    throw error;
  }
};

export default getLocale;
