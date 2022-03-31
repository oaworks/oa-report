const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://bg.beta.oa.works/report/articles/count?q=author_affiliations:%22Bill%20and%20Melinda%20Gates%20Foundation%22%20OR%20funder_names:%22Bill%20and%20Melinda%20Gates%20Foundation%22%20AND%20is_oa:true");

  return data;
};
