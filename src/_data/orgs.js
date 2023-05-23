const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://bg.beta.oa.works/report/orgs?q=*&excludes=aliases,fundref,sheets,analysis,strategy&size=600");

  return data;
};
