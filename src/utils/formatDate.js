export const formatDate = (date, langCli) => {
  const langs = {
    'en': 'en-US',
    'pt-br': 'pt-BR',
    'es': 'es-ES'
  };

  return new Date(date).toLocaleDateString(langs[langCli], { timeZone: 'UTC' });
};
