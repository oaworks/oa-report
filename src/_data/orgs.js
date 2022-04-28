const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://beta.oa.works/report/orgs?q=*&excludes=ror,aliases,fundref,sheets,acronyms,paid,analysis,strategy,policy&size=5000");

  return data;
};
