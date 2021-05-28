export enum TYPE {
  native,
  material,
}

export enum MODE {
  janggi,
  kimpo,
  test,
}

export const config = {
  compUI: TYPE.native,
  mobileSize: 960,
  delay: 250,
  api: {
    '/AdminMasterTote': 'http://localhost:3000/api/tote.json',
    '/picking/admin/master/tote': 'http://localhost:3000/api/tote.json',
  },
};

/*enum TABLE_MODE {
  card,
  table,
}*/
// eslint-disable-next-line
/*
enum MODE {
  list,
  form,
  ui,
  faker,
}
*/
