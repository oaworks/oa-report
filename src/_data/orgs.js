const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://bg.beta.oa.works/report/orgs?q=*excludes=aliases,fundref,sheets,analysis,strategy,source,grantid_regex,allow_tdm,search,export_includes&size=600");

  return data;
};
