const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://api.oa.works/report/orgs?q=*&excludes=aliases,fundref,sheets,acronyms,paid,analysis,strategy&size=300");

  return data;
};
