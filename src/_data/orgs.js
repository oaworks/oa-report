const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://beta.oa.works/report/orgs?q=*&excludes=aliases,fundref,sheets,acronyms,paid,analysis,strategy,policy&size=2500");

  return data;
};
