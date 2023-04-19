const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://api.oa.works/report/orgs?q=*&excludes=aliases,fundref,sheets,analysis,strategy&size=20");

  return data;
};
