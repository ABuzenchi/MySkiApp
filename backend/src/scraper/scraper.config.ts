export const STATION_CONFIG = {
  Sinaia: {
    url: 'https://sinaiago.ro/partiile-de-schi/',
    selectors: {
      row: 'tr[class*="ninja_table_row"]',
      status: '.ninja_column_1.ninja_clmn_nm_stare',
      name: '.ninja_column_2.ninja_clmn_nm_denumire',
    },
  },
};
