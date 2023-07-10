require('dotenv').config();
const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get(`https://bg.${process.env.ELEVENTY_API_ENDPOINT}.oa.works/report/orgs?q=*&excludes=aliases,fundref,sheets,analysis,strategy,export_includes,search,allow_tdm,grantid_regex,source&size=${process.env.ELEVENTY_NUMBER_REPORTS}`);

  return data;
};
