const tableData = {
  articles_grant: {
    number: 848,
    year: 'All time',
    pretty: {
      link: "/temp/bmgf_articles_grant_alltime_on_2023-10-11_pretty.csv",
      head: `  
        <th scope="col" class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">grant</th>
        <th scope="col" class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles published</th>
        <th scope="col" class="p-2 w-60 truncate">compliant articles</th>
        <th scope="col" class="p-2 w-60 truncate">free-to-read articles</th>
        <th scope="col" class="p-2 w-60 truncate">open access articles</th>
        <th scope="col" class="p-2 w-60 truncate">repository version</th>
        <th scope="col" class="p-2 w-60 truncate">approved repository version</th>
        <th scope="col" class="p-2 w-60 truncate">preprint version</th>
        <th scope="col" class="p-2 w-60 truncate">data availability statement</th>
        <th scope="col" class="p-2 w-60 truncate">no data availability statement</th>
        <th scope="col" class="p-2 w-60 truncate">total APCs paid</th>
        <th scope="col" class="p-2 w-60 truncate">with APCs</th>
        <th scope="col" class="p-2 w-60 truncate">average APCs paid</th>
        <th scope="col" class="p-2 w-60 truncate">median APCs paid</th>
        <th scope="col" class="p-2 w-60 truncate">with grant ID</th>
      `,
      body: `
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1144
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            510
          </td>
          <td class="p-2 whitespace-nowrap truncate">66.5%</td>
          <td class="p-2 whitespace-nowrap truncate">90%</td>
          <td class="p-2 whitespace-nowrap truncate">66.9%</td>
          <td class="p-2 whitespace-nowrap truncate">79.6%</td>
          <td class="p-2 whitespace-nowrap truncate">71.6%</td>
          <td class="p-2 whitespace-nowrap truncate">16.1%</td>
          <td class="p-2 whitespace-nowrap truncate">24.1%</td>
          <td class="p-2 whitespace-nowrap truncate">44.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$379,188</td>
          <td class="p-2 whitespace-nowrap truncate">26.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,633.25</td>
          <td class="p-2 whitespace-nowrap truncate">$2,715</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1152504
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            154
          </td>
          <td class="p-2 whitespace-nowrap truncate">99.4%</td>
          <td class="p-2 whitespace-nowrap truncate">99.4%</td>
          <td class="p-2 whitespace-nowrap truncate">99.4%</td>
          <td class="p-2 whitespace-nowrap truncate">96.1%</td>
          <td class="p-2 whitespace-nowrap truncate">94.2%</td>
          <td class="p-2 whitespace-nowrap truncate">1.3%</td>
          <td class="p-2 whitespace-nowrap truncate">33.8%</td>
          <td class="p-2 whitespace-nowrap truncate">63%</td>
          <td class="p-2 whitespace-nowrap truncate">$627,347</td>
          <td class="p-2 whitespace-nowrap truncate">89.6%</td>
          <td class="p-2 whitespace-nowrap truncate">$4,449.27</td>
          <td class="p-2 whitespace-nowrap truncate">$5,000</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1134248
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            130
          </td>
          <td class="p-2 whitespace-nowrap truncate">97.7%</td>
          <td class="p-2 whitespace-nowrap truncate">97.7%</td>
          <td class="p-2 whitespace-nowrap truncate">97.7%</td>
          <td class="p-2 whitespace-nowrap truncate">76.2%</td>
          <td class="p-2 whitespace-nowrap truncate">72.3%</td>
          <td class="p-2 whitespace-nowrap truncate">0.8%</td>
          <td class="p-2 whitespace-nowrap truncate">40%</td>
          <td class="p-2 whitespace-nowrap truncate">43.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$231,368</td>
          <td class="p-2 whitespace-nowrap truncate">82.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,122.64</td>
          <td class="p-2 whitespace-nowrap truncate">$1,912</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-008166
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            120
          </td>
          <td class="p-2 whitespace-nowrap truncate">99.2%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">99.2%</td>
          <td class="p-2 whitespace-nowrap truncate">95.8%</td>
          <td class="p-2 whitespace-nowrap truncate">95.8%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">17.5%</td>
          <td class="p-2 whitespace-nowrap truncate">78.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$517,597</td>
          <td class="p-2 whitespace-nowrap truncate">98.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$4,313.31</td>
          <td class="p-2 whitespace-nowrap truncate">$5,000</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INTERNAL
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            108
          </td>
          <td class="p-2 whitespace-nowrap truncate">94.4%</td>
          <td class="p-2 whitespace-nowrap truncate">98.1%</td>
          <td class="p-2 whitespace-nowrap truncate">94.4%</td>
          <td class="p-2 whitespace-nowrap truncate">88%</td>
          <td class="p-2 whitespace-nowrap truncate">88%</td>
          <td class="p-2 whitespace-nowrap truncate">1.9%</td>
          <td class="p-2 whitespace-nowrap truncate">16.7%</td>
          <td class="p-2 whitespace-nowrap truncate">72.2%</td>
          <td class="p-2 whitespace-nowrap truncate">$284,607</td>
          <td class="p-2 whitespace-nowrap truncate">92.6%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,635.25</td>
          <td class="p-2 whitespace-nowrap truncate">$2,966</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1113682
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            106
          </td>
          <td class="p-2 whitespace-nowrap truncate">63.2%</td>
          <td class="p-2 whitespace-nowrap truncate">99.1%</td>
          <td class="p-2 whitespace-nowrap truncate">63.2%</td>
          <td class="p-2 whitespace-nowrap truncate">93.4%</td>
          <td class="p-2 whitespace-nowrap truncate">92.5%</td>
          <td class="p-2 whitespace-nowrap truncate">24.5%</td>
          <td class="p-2 whitespace-nowrap truncate">50%</td>
          <td class="p-2 whitespace-nowrap truncate">44.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$175,314</td>
          <td class="p-2 whitespace-nowrap truncate">40.6%</td>
          <td class="p-2 whitespace-nowrap truncate">$3,652.38</td>
          <td class="p-2 whitespace-nowrap truncate">$3,000</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1114827
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            95
          </td>
          <td class="p-2 whitespace-nowrap truncate">97.9%</td>
          <td class="p-2 whitespace-nowrap truncate">97.9%</td>
          <td class="p-2 whitespace-nowrap truncate">97.9%</td>
          <td class="p-2 whitespace-nowrap truncate">88.4%</td>
          <td class="p-2 whitespace-nowrap truncate">85.3%</td>
          <td class="p-2 whitespace-nowrap truncate">1.1%</td>
          <td class="p-2 whitespace-nowrap truncate">36.8%</td>
          <td class="p-2 whitespace-nowrap truncate">49.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$206,824</td>
          <td class="p-2 whitespace-nowrap truncate">81.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,585.3</td>
          <td class="p-2 whitespace-nowrap truncate">$2,800</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-009934
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            91
          </td>
          <td class="p-2 whitespace-nowrap truncate">97.8%</td>
          <td class="p-2 whitespace-nowrap truncate">97.8%</td>
          <td class="p-2 whitespace-nowrap truncate">97.8%</td>
          <td class="p-2 whitespace-nowrap truncate">75.8%</td>
          <td class="p-2 whitespace-nowrap truncate">73.6%</td>
          <td class="p-2 whitespace-nowrap truncate">1.1%</td>
          <td class="p-2 whitespace-nowrap truncate">22%</td>
          <td class="p-2 whitespace-nowrap truncate">56%</td>
          <td class="p-2 whitespace-nowrap truncate">$179,780</td>
          <td class="p-2 whitespace-nowrap truncate">94.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,020</td>
          <td class="p-2 whitespace-nowrap truncate">$1,782</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1053230
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            86
          </td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">97.7%</td>
          <td class="p-2 whitespace-nowrap truncate">95.3%</td>
          <td class="p-2 whitespace-nowrap truncate">11.6%</td>
          <td class="p-2 whitespace-nowrap truncate">68.6%</td>
          <td class="p-2 whitespace-nowrap truncate">31.4%</td>
          <td class="p-2 whitespace-nowrap truncate">$200,418</td>
          <td class="p-2 whitespace-nowrap truncate">81.4%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,637.08</td>
          <td class="p-2 whitespace-nowrap truncate">$2,365</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-003439
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            81
          </td>
          <td class="p-2 whitespace-nowrap truncate">96.3%</td>
          <td class="p-2 whitespace-nowrap truncate">97.5%</td>
          <td class="p-2 whitespace-nowrap truncate">96.3%</td>
          <td class="p-2 whitespace-nowrap truncate">84%</td>
          <td class="p-2 whitespace-nowrap truncate">76.5%</td>
          <td class="p-2 whitespace-nowrap truncate">4.9%</td>
          <td class="p-2 whitespace-nowrap truncate">79%</td>
          <td class="p-2 whitespace-nowrap truncate">18.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$175,831</td>
          <td class="p-2 whitespace-nowrap truncate">77.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,790.97</td>
          <td class="p-2 whitespace-nowrap truncate">$2,340</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
        </tr>    
      `
    },
    raw: {
      link: "/temp/bmgf_articles_grant_alltime_on_2023-10-11_raw.csv",
      head: `
        <th scope="col" class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">grant</th>
        <th scope="col" class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles_published</th>
        <th scope="col" class="p-2 w-60 truncate">is_compliant_articles</th>
        <th scope="col" class="p-2 w-60 truncate">is_free_to_read</th>
        <th scope="col" class="p-2 w-60 truncate">is_oa</th>
        <th scope="col" class="p-2 w-60 truncate">has_repository_version</th>
        <th scope="col" class="p-2 w-60 truncate">has_approved_repository_version</th>
        <th scope="col" class="p-2 w-60 truncate">has_preprint_version</th>
        <th scope="col" class="p-2 w-60 truncate">has_data_availability_statement</th>
        <th scope="col" class="p-2 w-60 truncate">has_no_data_availability_statement</th>
        <th scope="col" class="p-2 w-60 truncate">total_apcs_paid</th>
        <th scope="col" class="p-2 w-60 truncate">has_apc</th>
        <th scope="col" class="p-2 w-60 truncate">average_apcs_paid</th>
        <th scope="col" class="p-2 w-60 truncate">median_apcs_paid</th>
        <th scope="col" class="p-2 w-60 truncate">has_grantid</th>
      `,
      body: `
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1144
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">510</td>
          <td class="p-2 whitespace-nowrap truncate">339</td>
          <td class="p-2 whitespace-nowrap truncate">459</td>
          <td class="p-2 whitespace-nowrap truncate">341</td>
          <td class="p-2 whitespace-nowrap truncate">406</td>
          <td class="p-2 whitespace-nowrap truncate">365</td>
          <td class="p-2 whitespace-nowrap truncate">82</td>
          <td class="p-2 whitespace-nowrap truncate">123</td>
          <td class="p-2 whitespace-nowrap truncate">225</td>
          <td class="p-2 whitespace-nowrap truncate">379188</td>
          <td class="p-2 whitespace-nowrap truncate">133</td>
          <td class="p-2 whitespace-nowrap truncate">2633.25</td>
          <td class="p-2 whitespace-nowrap truncate">2715</td>
          <td class="p-2 whitespace-nowrap truncate">510</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1152504
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">154</td>
          <td class="p-2 whitespace-nowrap truncate">153</td>
          <td class="p-2 whitespace-nowrap truncate">153</td>
          <td class="p-2 whitespace-nowrap truncate">153</td>
          <td class="p-2 whitespace-nowrap truncate">148</td>
          <td class="p-2 whitespace-nowrap truncate">145</td>
          <td class="p-2 whitespace-nowrap truncate">2</td>
          <td class="p-2 whitespace-nowrap truncate">52</td>
          <td class="p-2 whitespace-nowrap truncate">97</td>
          <td class="p-2 whitespace-nowrap truncate">627347</td>
          <td class="p-2 whitespace-nowrap truncate">138</td>
          <td class="p-2 whitespace-nowrap truncate">4449.27</td>
          <td class="p-2 whitespace-nowrap truncate">5000</td>
          <td class="p-2 whitespace-nowrap truncate">154</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1134248
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">130</td>
          <td class="p-2 whitespace-nowrap truncate">127</td>
          <td class="p-2 whitespace-nowrap truncate">127</td>
          <td class="p-2 whitespace-nowrap truncate">127</td>
          <td class="p-2 whitespace-nowrap truncate">99</td>
          <td class="p-2 whitespace-nowrap truncate">94</td>
          <td class="p-2 whitespace-nowrap truncate">1</td>
          <td class="p-2 whitespace-nowrap truncate">52</td>
          <td class="p-2 whitespace-nowrap truncate">56</td>
          <td class="p-2 whitespace-nowrap truncate">231368</td>
          <td class="p-2 whitespace-nowrap truncate">107</td>
          <td class="p-2 whitespace-nowrap truncate">2122.64</td>
          <td class="p-2 whitespace-nowrap truncate">1912</td>
          <td class="p-2 whitespace-nowrap truncate">130</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-008166
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">120</td>
          <td class="p-2 whitespace-nowrap truncate">119</td>
          <td class="p-2 whitespace-nowrap truncate">120</td>
          <td class="p-2 whitespace-nowrap truncate">119</td>
          <td class="p-2 whitespace-nowrap truncate">115</td>
          <td class="p-2 whitespace-nowrap truncate">115</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">21</td>
          <td class="p-2 whitespace-nowrap truncate">94</td>
          <td class="p-2 whitespace-nowrap truncate">517597</td>
          <td class="p-2 whitespace-nowrap truncate">118</td>
          <td class="p-2 whitespace-nowrap truncate">4313.31</td>
          <td class="p-2 whitespace-nowrap truncate">5000</td>
          <td class="p-2 whitespace-nowrap truncate">120</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INTERNAL
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">108</td>
          <td class="p-2 whitespace-nowrap truncate">102</td>
          <td class="p-2 whitespace-nowrap truncate">106</td>
          <td class="p-2 whitespace-nowrap truncate">102</td>
          <td class="p-2 whitespace-nowrap truncate">95</td>
          <td class="p-2 whitespace-nowrap truncate">95</td>
          <td class="p-2 whitespace-nowrap truncate">2</td>
          <td class="p-2 whitespace-nowrap truncate">18</td>
          <td class="p-2 whitespace-nowrap truncate">78</td>
          <td class="p-2 whitespace-nowrap truncate">284607</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">2635.25</td>
          <td class="p-2 whitespace-nowrap truncate">2966</td>
          <td class="p-2 whitespace-nowrap truncate">108</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1113682
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">106</td>
          <td class="p-2 whitespace-nowrap truncate">67</td>
          <td class="p-2 whitespace-nowrap truncate">105</td>
          <td class="p-2 whitespace-nowrap truncate">67</td>
          <td class="p-2 whitespace-nowrap truncate">99</td>
          <td class="p-2 whitespace-nowrap truncate">98</td>
          <td class="p-2 whitespace-nowrap truncate">26</td>
          <td class="p-2 whitespace-nowrap truncate">53</td>
          <td class="p-2 whitespace-nowrap truncate">47</td>
          <td class="p-2 whitespace-nowrap truncate">175314</td>
          <td class="p-2 whitespace-nowrap truncate">43</td>
          <td class="p-2 whitespace-nowrap truncate">3652.38</td>
          <td class="p-2 whitespace-nowrap truncate">3000</td>
          <td class="p-2 whitespace-nowrap truncate">106</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1114827
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">95</td>
          <td class="p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">84</td>
          <td class="p-2 whitespace-nowrap truncate">81</td>
          <td class="p-2 whitespace-nowrap truncate">1</td>
          <td class="p-2 whitespace-nowrap truncate">35</td>
          <td class="p-2 whitespace-nowrap truncate">47</td>
          <td class="p-2 whitespace-nowrap truncate">206824</td>
          <td class="p-2 whitespace-nowrap truncate">77</td>
          <td class="p-2 whitespace-nowrap truncate">2585.3</td>
          <td class="p-2 whitespace-nowrap truncate">2800</td>
          <td class="p-2 whitespace-nowrap truncate">95</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-009934
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">91</td>
          <td class="p-2 whitespace-nowrap truncate">89</td>
          <td class="p-2 whitespace-nowrap truncate">89</td>
          <td class="p-2 whitespace-nowrap truncate">89</td>
          <td class="p-2 whitespace-nowrap truncate">69</td>
          <td class="p-2 whitespace-nowrap truncate">67</td>
          <td class="p-2 whitespace-nowrap truncate">1</td>
          <td class="p-2 whitespace-nowrap truncate">20</td>
          <td class="p-2 whitespace-nowrap truncate">51</td>
          <td class="p-2 whitespace-nowrap truncate">179780</td>
          <td class="p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate">2020</td>
          <td class="p-2 whitespace-nowrap truncate">1782</td>
          <td class="p-2 whitespace-nowrap truncate">91</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1053230
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate">84</td>
          <td class="p-2 whitespace-nowrap truncate">82</td>
          <td class="p-2 whitespace-nowrap truncate">10</td>
          <td class="p-2 whitespace-nowrap truncate">59</td>
          <td class="p-2 whitespace-nowrap truncate">27</td>
          <td class="p-2 whitespace-nowrap truncate">200418</td>
          <td class="p-2 whitespace-nowrap truncate">70</td>
          <td class="p-2 whitespace-nowrap truncate">2637.08</td>
          <td class="p-2 whitespace-nowrap truncate">2365</td>
          <td class="p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-003439
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">81</td>
          <td class="p-2 whitespace-nowrap truncate">78</td>
          <td class="p-2 whitespace-nowrap truncate">79</td>
          <td class="p-2 whitespace-nowrap truncate">78</td>
          <td class="p-2 whitespace-nowrap truncate">68</td>
          <td class="p-2 whitespace-nowrap truncate">62</td>
          <td class="p-2 whitespace-nowrap truncate">4</td>
          <td class="p-2 whitespace-nowrap truncate">64</td>
          <td class="p-2 whitespace-nowrap truncate">15</td>
          <td class="p-2 whitespace-nowrap truncate">175831</td>
          <td class="p-2 whitespace-nowrap truncate">63</td>
          <td class="p-2 whitespace-nowrap truncate">2790.97</td>
          <td class="p-2 whitespace-nowrap truncate">2340</td>
          <td class="p-2 whitespace-nowrap truncate">81</td>
        </tr>
      `
    }
  },
  articles_publisher: {
    number: 85,
    year: '2023',
    pretty: {
      link: "/temp/bmgf_articles_publisher_2023_on_2023-10-11_pretty.csv",
      head: `
        <th scope="col" class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">publisher</th>
        <th scope="col" class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles published</th>
        <th scope="col" class="p-2 w-60 truncate">compliant articles</th>
        <th scope="col" class="p-2 w-60 truncate">free-to-read articles</th>
        <th scope="col" class="p-2 w-60 truncate">open access articles</th>
        <th scope="col" class="p-2 w-60 truncate">repository version</th>
        <th scope="col" class="p-2 w-60 truncate">approved repository version</th>
        <th scope="col" class="p-2 w-60 truncate">preprint version</th>
        <th scope="col" class="p-2 w-60 truncate">data availability statement</th>
        <th scope="col" class="p-2 w-60 truncate">no data availability statement</th>
        <th scope="col" class="p-2 w-60 truncate">total APCs paid</th>
        <th scope="col" class="p-2 w-60 truncate">with APCs</th>
        <th scope="col" class="p-2 w-60 truncate">average APCs paid</th>
        <th scope="col" class="p-2 w-60 truncate">median APCs paid</th>
        <th scope="col" class="p-2 w-60 truncate">with grant ID</th>
      `,
      body: `
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Elsevier BV</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">543</td>
          <td class="p-2 whitespace-nowrap truncate">67.2%</td>
          <td class="p-2 whitespace-nowrap truncate">91.5%</td>
          <td class="p-2 whitespace-nowrap truncate">69.1%</td>
          <td class="p-2 whitespace-nowrap truncate">71.8%</td>
          <td class="p-2 whitespace-nowrap truncate">47.1%</td>
          <td class="p-2 whitespace-nowrap truncate">4.8%</td>
          <td class="p-2 whitespace-nowrap truncate">50.8%</td>
          <td class="p-2 whitespace-nowrap truncate">36.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$938,660</td>
          <td class="p-2 whitespace-nowrap truncate">46.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$3,695.51</td>
          <td class="p-2 whitespace-nowrap truncate">$3,475</td>
          <td class="p-2 whitespace-nowrap truncate">46.4%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Springer Science and Business Media LLC</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">419</td>
          <td class="p-2 whitespace-nowrap truncate">90%</td>
          <td class="p-2 whitespace-nowrap truncate">94.7%</td>
          <td class="p-2 whitespace-nowrap truncate">91.2%</td>
          <td class="p-2 whitespace-nowrap truncate">82.6%</td>
          <td class="p-2 whitespace-nowrap truncate">46.8%</td>
          <td class="p-2 whitespace-nowrap truncate">17.9%</td>
          <td class="p-2 whitespace-nowrap truncate">81.1%</td>
          <td class="p-2 whitespace-nowrap truncate">12.2%</td>
          <td class="p-2 whitespace-nowrap truncate">$598,175</td>
          <td class="p-2 whitespace-nowrap truncate">36.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$3,909.64</td>
          <td class="p-2 whitespace-nowrap truncate">$2,970</td>
          <td class="p-2 whitespace-nowrap truncate">63%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Frontiers Media SA</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">217</td>
          <td class="p-2 whitespace-nowrap truncate">96.8%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">99.5%</td>
          <td class="p-2 whitespace-nowrap truncate">78.3%</td>
          <td class="p-2 whitespace-nowrap truncate">47.5%</td>
          <td class="p-2 whitespace-nowrap truncate">4.1%</td>
          <td class="p-2 whitespace-nowrap truncate">71.9%</td>
          <td class="p-2 whitespace-nowrap truncate">16.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$468,100</td>
          <td class="p-2 whitespace-nowrap truncate">79.7%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,705.78</td>
          <td class="p-2 whitespace-nowrap truncate">$3,230</td>
          <td class="p-2 whitespace-nowrap truncate">52.5%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Public Library of Science (PLoS)</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">201</td>
          <td class="p-2 whitespace-nowrap truncate">97%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">98.5%</td>
          <td class="p-2 whitespace-nowrap truncate">86.6%</td>
          <td class="p-2 whitespace-nowrap truncate">44.3%</td>
          <td class="p-2 whitespace-nowrap truncate">18.4%</td>
          <td class="p-2 whitespace-nowrap truncate">92.5%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">$187,380</td>
          <td class="p-2 whitespace-nowrap truncate">41.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,257.59</td>
          <td class="p-2 whitespace-nowrap truncate">$2,100</td>
          <td class="p-2 whitespace-nowrap truncate">64.7%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Wiley</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">190</td>
          <td class="p-2 whitespace-nowrap truncate">75.3%</td>
          <td class="p-2 whitespace-nowrap truncate">84.7%</td>
          <td class="p-2 whitespace-nowrap truncate">77.9%</td>
          <td class="p-2 whitespace-nowrap truncate">38.4%</td>
          <td class="p-2 whitespace-nowrap truncate">16.8%</td>
          <td class="p-2 whitespace-nowrap truncate">3.7%</td>
          <td class="p-2 whitespace-nowrap truncate">35.8%</td>
          <td class="p-2 whitespace-nowrap truncate">25.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$83,550</td>
          <td class="p-2 whitespace-nowrap truncate">14.2%</td>
          <td class="p-2 whitespace-nowrap truncate">$3,094.44</td>
          <td class="p-2 whitespace-nowrap truncate">$3,400</td>
          <td class="p-2 whitespace-nowrap truncate">52.6%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">MDPI AG</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">164</td>
          <td class="p-2 whitespace-nowrap truncate">99.4%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">78%</td>
          <td class="p-2 whitespace-nowrap truncate">43.3%</td>
          <td class="p-2 whitespace-nowrap truncate">3</td>
          <td class="p-2 whitespace-nowrap truncate">69.5%</td>
          <td class="p-2 whitespace-nowrap truncate">20.7%</td>
          <td class="p-2 whitespace-nowrap truncate">$160,620</td>
          <td class="p-2 whitespace-nowrap truncate">47%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,085.97</td>
          <td class="p-2 whitespace-nowrap truncate">$2,160</td>
          <td class="p-2 whitespace-nowrap truncate">65.2%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Oxford University Press (OUP)</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">99</td>
          <td class="p-2 whitespace-nowrap truncate">57.6%</td>
          <td class="p-2 whitespace-nowrap truncate">87.9%</td>
          <td class="p-2 whitespace-nowrap truncate">58.6%</td>
          <td class="p-2 whitespace-nowrap truncate">69.7%</td>
          <td class="p-2 whitespace-nowrap truncate">27.3%</td>
          <td class="p-2 whitespace-nowrap truncate">8.1%</td>
          <td class="p-2 whitespace-nowrap truncate">27.3%</td>
          <td class="p-2 whitespace-nowrap truncate">58.6%</td>
          <td class="p-2 whitespace-nowrap truncate">$14,100</td>
          <td class="p-2 whitespace-nowrap truncate">5.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,820</td>
          <td class="p-2 whitespace-nowrap truncate">$2,660</td>
          <td class="p-2 whitespace-nowrap truncate">56.6%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">BMJ</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">91</td>
          <td class="p-2 whitespace-nowrap truncate">78%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">83.5%</td>
          <td class="p-2 whitespace-nowrap truncate">85.7%</td>
          <td class="p-2 whitespace-nowrap truncate">48.4%</td>
          <td class="p-2 whitespace-nowrap truncate">1.1%</td>
          <td class="p-2 whitespace-nowrap truncate">69.2%</td>
          <td class="p-2 whitespace-nowrap truncate">23.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$147,170</td>
          <td class="p-2 whitespace-nowrap truncate">51.6%</td>
          <td class="p-2 whitespace-nowrap truncate">$3,131.28</td>
          <td class="p-2 whitespace-nowrap truncate">$2,800</td>
          <td class="p-2 whitespace-nowrap truncate">69.2%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Informa UK Limited</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">74</td>
          <td class="p-2 whitespace-nowrap truncate">75.7%</td>
          <td class="p-2 whitespace-nowrap truncate">91.9%</td>
          <td class="p-2 whitespace-nowrap truncate">81.1%</td>
          <td class="p-2 whitespace-nowrap truncate">47.3%</td>
          <td class="p-2 whitespace-nowrap truncate">24.3%</td>
          <td class="p-2 whitespace-nowrap truncate">2.7%</td>
          <td class="p-2 whitespace-nowrap truncate">18.9%</td>
          <td class="p-2 whitespace-nowrap truncate">58.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$16,450</td>
          <td class="p-2 whitespace-nowrap truncate">18.9%</td>
          <td class="p-2 whitespace-nowrap truncate">$1,175</td>
          <td class="p-2 whitespace-nowrap truncate">$740</td>
          <td class="p-2 whitespace-nowrap truncate">51.4%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">F1000 Research Ltd</td>
          <td class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">54</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">42.6%</td>
          <td class="p-2 whitespace-nowrap truncate">18.5%</td>
          <td class="p-2 whitespace-nowrap truncate">5.6%</td>
          <td class="p-2 whitespace-nowrap truncate">96.3%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">$32,270</td>
          <td class="p-2 whitespace-nowrap truncate">53.7%</td>
          <td class="p-2 whitespace-nowrap truncate">$1,112.76</td>
          <td class="p-2 whitespace-nowrap truncate">$1,150</td>
          <td class="p-2 whitespace-nowrap truncate">81.5%</td>
        </tr>
      `
    },
    raw: {
      link: "/temp/bmgf_articles_publisher_2023_on_2023-10-11_raw.csv",
      head: `
        <th scope="col" class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">publisher</th>
        <th scope="col" class="sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles_published</th>
        <th scope="col" class="p-2 w-60 truncate">is_compliant_articles</th>
        <th scope="col" class="p-2 w-60 truncate">is_free_to_read</th>
        <th scope="col" class="p-2 w-60 truncate">is_oa</th>
        <th scope="col" class="p-2 w-60 truncate">has_repository_version</th>
        <th scope="col" class="p-2 w-60 truncate">has_approved_repository_version</th>
        <th scope="col" class="p-2 w-60 truncate">has_preprint_version</th>
        <th scope="col" class="p-2 w-60 truncate">has_data_availability_statement</th>
        <th scope="col" class="p-2 w-60 truncate">has_no_data_availability_statement</th>
        <th scope="col" class="p-2 w-60 truncate">total_apcs_paid</th>
        <th scope="col" class="p-2 w-60 truncate">has_apc</th>
        <th scope="col" class="p-2 w-60 truncate">average_apcs_paid</th>
        <th scope="col" class="p-2 w-60 truncate">median_apcs_paid</th>
        <th scope="col" class="p-2 w-60 truncate">has_grantid</th>
      `,
      body: `
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Elsevier BV
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            543
          </td>
          <td class="p-2 whitespace-nowrap truncate">365</td>
          <td class="p-2 whitespace-nowrap truncate">497</td>
          <td class="p-2 whitespace-nowrap truncate">375</td>
          <td class="p-2 whitespace-nowrap truncate">390</td>
          <td class="p-2 whitespace-nowrap truncate">256</td>
          <td class="p-2 whitespace-nowrap truncate">26</td>
          <td class="p-2 whitespace-nowrap truncate">276</td>
          <td class="p-2 whitespace-nowrap truncate">197</td>
          <td class="p-2 whitespace-nowrap truncate">938660</td>
          <td class="p-2 whitespace-nowrap truncate">254</td>
          <td class="p-2 whitespace-nowrap truncate">3695.51</td>
          <td class="p-2 whitespace-nowrap truncate">3475</td>
          <td class="p-2 whitespace-nowrap truncate">252</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Springer Science and Business Media LLC
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            419
          </td>
          <td class="p-2 whitespace-nowrap truncate">377</td>
          <td class="p-2 whitespace-nowrap truncate">397</td>
          <td class="p-2 whitespace-nowrap truncate">382</td>
          <td class="p-2 whitespace-nowrap truncate">346</td>
          <td class="p-2 whitespace-nowrap truncate">196</td>
          <td class="p-2 whitespace-nowrap truncate">75</td>
          <td class="p-2 whitespace-nowrap truncate">340</td>
          <td class="p-2 whitespace-nowrap truncate">51</td>
          <td class="p-2 whitespace-nowrap truncate">598175</td>
          <td class="p-2 whitespace-nowrap truncate">153</td>
          <td class="p-2 whitespace-nowrap truncate">3909.64</td>
          <td class="p-2 whitespace-nowrap truncate">2970</td>
          <td class="p-2 whitespace-nowrap truncate">264</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Frontiers Media SA
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            217
          </td>
          <td class="p-2 whitespace-nowrap truncate">210</td>
          <td class="p-2 whitespace-nowrap truncate">217</td>
          <td class="p-2 whitespace-nowrap truncate">216</td>
          <td class="p-2 whitespace-nowrap truncate">170</td>
          <td class="p-2 whitespace-nowrap truncate">103</td>
          <td class="p-2 whitespace-nowrap truncate">9</td>
          <td class="p-2 whitespace-nowrap truncate">156</td>
          <td class="p-2 whitespace-nowrap truncate">35</td>
          <td class="p-2 whitespace-nowrap truncate">468100</td>
          <td class="p-2 whitespace-nowrap truncate">173</td>
          <td class="p-2 whitespace-nowrap truncate">2705.78</td>
          <td class="p-2 whitespace-nowrap truncate">3230</td>
          <td class="p-2 whitespace-nowrap truncate">114</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Public Library of Science (PLoS)
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            201
          </td>
          <td class="p-2 whitespace-nowrap truncate">195</td>
          <td class="p-2 whitespace-nowrap truncate">201</td>
          <td class="p-2 whitespace-nowrap truncate">198</td>
          <td class="p-2 whitespace-nowrap truncate">174</td>
          <td class="p-2 whitespace-nowrap truncate">89</td>
          <td class="p-2 whitespace-nowrap truncate">37</td>
          <td class="p-2 whitespace-nowrap truncate">186</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">187380</td>
          <td class="p-2 whitespace-nowrap truncate">83</td>
          <td class="p-2 whitespace-nowrap truncate">2257.59</td>
          <td class="p-2 whitespace-nowrap truncate">2100</td>
          <td class="p-2 whitespace-nowrap truncate">130</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Wiley
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            190
          </td>
          <td class="p-2 whitespace-nowrap truncate">143</td>
          <td class="p-2 whitespace-nowrap truncate">161</td>
          <td class="p-2 whitespace-nowrap truncate">148</td>
          <td class="p-2 whitespace-nowrap truncate">73</td>
          <td class="p-2 whitespace-nowrap truncate">32</td>
          <td class="p-2 whitespace-nowrap truncate">7</td>
          <td class="p-2 whitespace-nowrap truncate">68</td>
          <td class="p-2 whitespace-nowrap truncate">49</td>
          <td class="p-2 whitespace-nowrap truncate">83550</td>
          <td class="p-2 whitespace-nowrap truncate">27</td>
          <td class="p-2 whitespace-nowrap truncate">3094.44</td>
          <td class="p-2 whitespace-nowrap truncate">3400</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            MDPI AG
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            164
          </td>
          <td class="p-2 whitespace-nowrap truncate">163</td>
          <td class="p-2 whitespace-nowrap truncate">164</td>
          <td class="p-2 whitespace-nowrap truncate">164</td>
          <td class="p-2 whitespace-nowrap truncate">128</td>
          <td class="p-2 whitespace-nowrap truncate">71</td>
          <td class="p-2 whitespace-nowrap truncate">5</td>
          <td class="p-2 whitespace-nowrap truncate">114</td>
          <td class="p-2 whitespace-nowrap truncate">34</td>
          <td class="p-2 whitespace-nowrap truncate">160620</td>
          <td class="p-2 whitespace-nowrap truncate">77</td>
          <td class="p-2 whitespace-nowrap truncate">2085.97</td>
          <td class="p-2 whitespace-nowrap truncate">2160</td>
          <td class="p-2 whitespace-nowrap truncate">107</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Oxford University Press (OUP)
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            99
          </td>
          <td class="p-2 whitespace-nowrap truncate">57</td>
          <td class="p-2 whitespace-nowrap truncate">87</td>
          <td class="p-2 whitespace-nowrap truncate">58</td>
          <td class="p-2 whitespace-nowrap truncate">69</td>
          <td class="p-2 whitespace-nowrap truncate">27</td>
          <td class="p-2 whitespace-nowrap truncate">8</td>
          <td class="p-2 whitespace-nowrap truncate">27</td>
          <td class="p-2 whitespace-nowrap truncate">58</td>
          <td class="p-2 whitespace-nowrap truncate">14100</td>
          <td class="p-2 whitespace-nowrap truncate">5</td>
          <td class="p-2 whitespace-nowrap truncate">2820</td>
          <td class="p-2 whitespace-nowrap truncate">2660</td>
          <td class="p-2 whitespace-nowrap truncate">56</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            BMJ
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            91
          </td>
          <td class="p-2 whitespace-nowrap truncate">71</td>
          <td class="p-2 whitespace-nowrap truncate">91</td>
          <td class="p-2 whitespace-nowrap truncate">76</td>
          <td class="p-2 whitespace-nowrap truncate">78</td>
          <td class="p-2 whitespace-nowrap truncate">44</td>
          <td class="p-2 whitespace-nowrap truncate">1</td>
          <td class="p-2 whitespace-nowrap truncate">63</td>
          <td class="p-2 whitespace-nowrap truncate">21</td>
          <td class="p-2 whitespace-nowrap truncate">147170</td>
          <td class="p-2 whitespace-nowrap truncate">47</td>
          <td class="p-2 whitespace-nowrap truncate">3131.28</td>
          <td class="p-2 whitespace-nowrap truncate">2800</td>
          <td class="p-2 whitespace-nowrap truncate">63</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Informa UK Limited
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            74
          </td>
          <td class="p-2 whitespace-nowrap truncate">56</td>
          <td class="p-2 whitespace-nowrap truncate">68</td>
          <td class="p-2 whitespace-nowrap truncate">60</td>
          <td class="p-2 whitespace-nowrap truncate">35</td>
          <td class="p-2 whitespace-nowrap truncate">18</td>
          <td class="p-2 whitespace-nowrap truncate">2</td>
          <td class="p-2 whitespace-nowrap truncate">14</td>
          <td class="p-2 whitespace-nowrap truncate">43</td>
          <td class="p-2 whitespace-nowrap truncate">16450</td>
          <td class="p-2 whitespace-nowrap truncate">14</td>
          <td class="p-2 whitespace-nowrap truncate">1175</td>
          <td class="p-2 whitespace-nowrap truncate">740</td>
          <td class="p-2 whitespace-nowrap truncate">38</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            F1000 Research Ltd
          </td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            54
          </td>
          <td class="p-2 whitespace-nowrap truncate">54</td>
          <td class="p-2 whitespace-nowrap truncate">54</td>
          <td class="p-2 whitespace-nowrap truncate">54</td>
          <td class="p-2 whitespace-nowrap truncate">23</td>
          <td class="p-2 whitespace-nowrap truncate">10</td>
          <td class="p-2 whitespace-nowrap truncate">3</td>
          <td class="p-2 whitespace-nowrap truncate">52</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">32270</td>
          <td class="p-2 whitespace-nowrap truncate">29</td>
          <td class="p-2 whitespace-nowrap truncate">1112.76</td>
          <td class="p-2 whitespace-nowrap truncate">1150</td>
          <td class="p-2 whitespace-nowrap truncate">44</td>
        </tr>    
      `
    }
  },
  articles_with_apcs_only: {
    number: 20,
    link: '/temp/bmgf_articles-with-apcs_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv',
    pretty: {
      head: `
      `,
      body: `
      `
    },
    raw: {
      head: `
      `,
      body: `
      `
    }
  }
};