const axios = require("axios");

module.exports = async () => {
  const { data } = await axios.get("https://bg.beta.oa.works/report/articles/terms/author_names?q=author_affiliations:%22Bill%20and%20Melinda%20Gates%20Foundation%22%20OR%20funder_names:%22Bill%20and%20Melinda%20Gates%20Foundation%22%20%20AND%20has_repository_copy:%22true%22%20AND%20oa_status:%22green%22");

  return data;
};
