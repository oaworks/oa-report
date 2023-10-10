const tableData = {
  articles_grant: {
    number: 20,
    link: '/temp/bmgf_articles_grant_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv',
    pretty: {
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
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1144</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">592</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">90.4%</td>
          <td class="p-2 whitespace-nowrap truncate">68.1%</td>
          <td class="p-2 whitespace-nowrap truncate">79.7%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">18.2%</td>
          <td class="p-2 whitespace-nowrap truncate">25.7%</td>
          <td class="p-2 whitespace-nowrap truncate">44.9%</td>
          <td class="p-2 whitespace-nowrap truncate">$396,098</td>
          <td class="p-2 whitespace-nowrap truncate">23.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,658.38</td>
          <td class="p-2 whitespace-nowrap truncate">$2,750</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1152504</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">172</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">99.4%</td>
          <td class="p-2 whitespace-nowrap truncate">99.4%</td>
          <td class="p-2 whitespace-nowrap truncate">95.9%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">1.2%</td>
          <td class="p-2 whitespace-nowrap truncate">34.9%</td>
          <td class="p-2 whitespace-nowrap truncate">62.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$701,827</td>
          <td class="p-2 whitespace-nowrap truncate">90.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$4,441.94</td>
          <td class="p-2 whitespace-nowrap truncate">$5,000</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">INV-008166</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">133</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">99.2%</td>
          <td class="p-2 whitespace-nowrap truncate">96.2%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">18.8%</td>
          <td class="p-2 whitespace-nowrap truncate">77.4%</td>
          <td class="p-2 whitespace-nowrap truncate">$573,597</td>
          <td class="p-2 whitespace-nowrap truncate">98.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$4312.76</td>
          <td class="p-2 whitespace-nowrap truncate">$5,000</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1134248</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">130</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">97.7%</td>
          <td class="p-2 whitespace-nowrap truncate">97.7%</td>
          <td class="p-2 whitespace-nowrap truncate">73.8%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">0.8%</td>
          <td class="p-2 whitespace-nowrap truncate">40%</td>
          <td class="p-2 whitespace-nowrap truncate">43.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$231,368</td>
          <td class="p-2 whitespace-nowrap truncate">82.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,122.64</td>
          <td class="p-2 whitespace-nowrap truncate">$1,912</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">INTERNAL</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">111</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">97.3%</td>
          <td class="p-2 whitespace-nowrap truncate">93.7%</td>
          <td class="p-2 whitespace-nowrap truncate">87.4%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">1.8%</td>
          <td class="p-2 whitespace-nowrap truncate">18%</td>
          <td class="p-2 whitespace-nowrap truncate">70.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$289,722</td>
          <td class="p-2 whitespace-nowrap truncate">92.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,563.91</td>
          <td class="p-2 whitespace-nowrap truncate">$2,900</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1113682</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">111</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">98.2%</td>
          <td class="p-2 whitespace-nowrap truncate">64.9%</td>
          <td class="p-2 whitespace-nowrap truncate">92.8%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">25.2%</td>
          <td class="p-2 whitespace-nowrap truncate">52.3%</td>
          <td class="p-2 whitespace-nowrap truncate">42.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$187,549</td>
          <td class="p-2 whitespace-nowrap truncate">40.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$3,750.98</td>
          <td class="p-2 whitespace-nowrap truncate">$3,000</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1184344</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">108</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">98.1%</td>
          <td class="p-2 whitespace-nowrap truncate">96.3%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">20.4%</td>
          <td class="p-2 whitespace-nowrap truncate">72.2%</td>
          <td class="p-2 whitespace-nowrap truncate">26.9%</td>
          <td class="p-2 whitespace-nowrap truncate">$184,993</td>
          <td class="p-2 whitespace-nowrap truncate">51.9%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,890.52</td>
          <td class="p-2 whitespace-nowrap truncate">$2,350</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1114827</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">95</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">97.9%</td>
          <td class="p-2 whitespace-nowrap truncate">97.9%</td>
          <td class="p-2 whitespace-nowrap truncate">85.3%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">1.1%</td>
          <td class="p-2 whitespace-nowrap truncate">36.8%</td>
          <td class="p-2 whitespace-nowrap truncate">49.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$206,824</td>
          <td class="p-2 whitespace-nowrap truncate">81.1%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,585.3</td>
          <td class="p-2 whitespace-nowrap truncate">$2,800</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1017641</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">93.5%</td>
          <td class="p-2 whitespace-nowrap truncate">77.4%</td>
          <td class="p-2 whitespace-nowrap truncate">86%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">3.2%</td>
          <td class="p-2 whitespace-nowrap truncate">26.9%</td>
          <td class="p-2 whitespace-nowrap truncate">64.5%</td>
          <td class="p-2 whitespace-nowrap truncate">$104,633</td>
          <td class="p-2 whitespace-nowrap truncate">39.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,092.66</td>
          <td class="p-2 whitespace-nowrap truncate">$2,200</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1053230</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">100%</td>
          <td class="p-2 whitespace-nowrap truncate">97.8%</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
          <td class="p-2 whitespace-nowrap truncate">10.8%</td>
          <td class="p-2 whitespace-nowrap truncate">66.7%</td>
          <td class="p-2 whitespace-nowrap truncate">33.3%</td>
          <td class="p-2 whitespace-nowrap truncate">$217,463</td>
          <td class="p-2 whitespace-nowrap truncate">82.8%</td>
          <td class="p-2 whitespace-nowrap truncate">$2,620.04</td>
          <td class="p-2 whitespace-nowrap truncate">$2,350</td>
          <td class="p-2 whitespace-nowrap truncate">0%</td>
        </tr>
      `
    },
    raw: {
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
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1144</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">592</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">90.4</td>
          <td class="p-2 whitespace-nowrap truncate">68.1</td>
          <td class="p-2 whitespace-nowrap truncate">79.7</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">18.2</td>
          <td class="p-2 whitespace-nowrap truncate">25.7</td>
          <td class="p-2 whitespace-nowrap truncate">44.9</td>
          <td class="p-2 whitespace-nowrap truncate">396098</td>
          <td class="p-2 whitespace-nowrap truncate">23.3</td>
          <td class="p-2 whitespace-nowrap truncate">2658.38</td>
          <td class="p-2 whitespace-nowrap truncate">2750</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1152504</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">172</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">99.4</td>
          <td class="p-2 whitespace-nowrap truncate">99.4</td>
          <td class="p-2 whitespace-nowrap truncate">95.9</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">1.2</td>
          <td class="p-2 whitespace-nowrap truncate">34.9</td>
          <td class="p-2 whitespace-nowrap truncate">62.8</td>
          <td class="p-2 whitespace-nowrap truncate">701827</td>
          <td class="p-2 whitespace-nowrap truncate">90.1</td>
          <td class="p-2 whitespace-nowrap truncate">4441.94</td>
          <td class="p-2 whitespace-nowrap truncate">5000</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">INV-008166</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">133</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">99.2</td>
          <td class="p-2 whitespace-nowrap truncate">96.2</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">18.8</td>
          <td class="p-2 whitespace-nowrap truncate">77.4</td>
          <td class="p-2 whitespace-nowrap truncate">573597</td>
          <td class="p-2 whitespace-nowrap truncate">98.5</td>
          <td class="p-2 whitespace-nowrap truncate">4312.76</td>
          <td class="p-2 whitespace-nowrap truncate">5000</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1134248</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">130</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">97.7</td>
          <td class="p-2 whitespace-nowrap truncate">97.7</td>
          <td class="p-2 whitespace-nowrap truncate">73.8</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">0.8</td>
          <td class="p-2 whitespace-nowrap truncate">40</td>
          <td class="p-2 whitespace-nowrap truncate">43.1</td>
          <td class="p-2 whitespace-nowrap truncate">231368</td>
          <td class="p-2 whitespace-nowrap truncate">82.3</td>
          <td class="p-2 whitespace-nowrap truncate">2122.64</td>
          <td class="p-2 whitespace-nowrap truncate">1912</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">INTERNAL</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">111</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">97.3</td>
          <td class="p-2 whitespace-nowrap truncate">93.7</td>
          <td class="p-2 whitespace-nowrap truncate">87.4</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">1.8</td>
          <td class="p-2 whitespace-nowrap truncate">18</td>
          <td class="p-2 whitespace-nowrap truncate">70.3</td>
          <td class="p-2 whitespace-nowrap truncate">289722</td>
          <td class="p-2 whitespace-nowrap truncate">92.8</td>
          <td class="p-2 whitespace-nowrap truncate">2563.91</td>
          <td class="p-2 whitespace-nowrap truncate">2900</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1113682</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">111</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">98.2</td>
          <td class="p-2 whitespace-nowrap truncate">64.9</td>
          <td class="p-2 whitespace-nowrap truncate">92.8</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">25.2</td>
          <td class="p-2 whitespace-nowrap truncate">52.3</td>
          <td class="p-2 whitespace-nowrap truncate">42.3</td>
          <td class="p-2 whitespace-nowrap truncate">187549</td>
          <td class="p-2 whitespace-nowrap truncate">40.5</td>
          <td class="p-2 whitespace-nowrap truncate">3750.98</td>
          <td class="p-2 whitespace-nowrap truncate">3000</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1184344</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">108</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">98.1</td>
          <td class="p-2 whitespace-nowrap truncate">96.3</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">20.4</td>
          <td class="p-2 whitespace-nowrap truncate">72.2</td>
          <td class="p-2 whitespace-nowrap truncate">26.9</td>
          <td class="p-2 whitespace-nowrap truncate">184993</td>
          <td class="p-2 whitespace-nowrap truncate">51.9</td>
          <td class="p-2 whitespace-nowrap truncate">2890.52</td>
          <td class="p-2 whitespace-nowrap truncate">2350</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1114827</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">95</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">97.9</td>
          <td class="p-2 whitespace-nowrap truncate">97.9</td>
          <td class="p-2 whitespace-nowrap truncate">85.3</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">1.1</td>
          <td class="p-2 whitespace-nowrap truncate">36.8</td>
          <td class="p-2 whitespace-nowrap truncate">49.5</td>
          <td class="p-2 whitespace-nowrap truncate">206824</td>
          <td class="p-2 whitespace-nowrap truncate">81.1</td>
          <td class="p-2 whitespace-nowrap truncate">2585.3</td>
          <td class="p-2 whitespace-nowrap truncate">2800</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1017641</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">93.5</td>
          <td class="p-2 whitespace-nowrap truncate">77.4</td>
          <td class="p-2 whitespace-nowrap truncate">86</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">3.2</td>
          <td class="p-2 whitespace-nowrap truncate">26.9</td>
          <td class="p-2 whitespace-nowrap truncate">64.5</td>
          <td class="p-2 whitespace-nowrap truncate">104633</td>
          <td class="p-2 whitespace-nowrap truncate">39.8</td>
          <td class="p-2 whitespace-nowrap truncate">2092.66</td>
          <td class="p-2 whitespace-nowrap truncate">2200</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">OPP1053230</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">93</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">97.8</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">10.8</td>
          <td class="p-2 whitespace-nowrap truncate">66.7</td>
          <td class="p-2 whitespace-nowrap truncate">33.3</td>
          <td class="p-2 whitespace-nowrap truncate">217463</td>
          <td class="p-2 whitespace-nowrap truncate">82.8</td>
          <td class="p-2 whitespace-nowrap truncate">2620.04</td>
          <td class="p-2 whitespace-nowrap truncate">2350</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
        </tr>
      `
    }
  },
  articles_publisher: {
    number: 20,
    link: '/temp/bmgf_articles_publisher_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv',
    pretty: {
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
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Elsevier BV</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">543</td>
          <td class="p-2 whitespace-nowrap truncate">67.2</td>
          <td class="p-2 whitespace-nowrap truncate">91.5</td>
          <td class="p-2 whitespace-nowrap truncate">69.1</td>
          <td class="p-2 whitespace-nowrap truncate">71.8</td>
          <td class="p-2 whitespace-nowrap truncate">47.1</td>
          <td class="p-2 whitespace-nowrap truncate">4.8</td>
          <td class="p-2 whitespace-nowrap truncate">50.8</td>
          <td class="p-2 whitespace-nowrap truncate">36.3</td>
          <td class="p-2 whitespace-nowrap truncate">938660</td>
          <td class="p-2 whitespace-nowrap truncate">46.8</td>
          <td class="p-2 whitespace-nowrap truncate">3695.51</td>
          <td class="p-2 whitespace-nowrap truncate">3475</td>
          <td class="p-2 whitespace-nowrap truncate">46.4</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Springer Science and Business Media LLC</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">419</td>
          <td class="p-2 whitespace-nowrap truncate">90</td>
          <td class="p-2 whitespace-nowrap truncate">94.7</td>
          <td class="p-2 whitespace-nowrap truncate">91.2</td>
          <td class="p-2 whitespace-nowrap truncate">82.6</td>
          <td class="p-2 whitespace-nowrap truncate">46.8</td>
          <td class="p-2 whitespace-nowrap truncate">17.9</td>
          <td class="p-2 whitespace-nowrap truncate">81.1</td>
          <td class="p-2 whitespace-nowrap truncate">12.2</td>
          <td class="p-2 whitespace-nowrap truncate">598175</td>
          <td class="p-2 whitespace-nowrap truncate">36.5</td>
          <td class="p-2 whitespace-nowrap truncate">3909.64</td>
          <td class="p-2 whitespace-nowrap truncate">2970</td>
          <td class="p-2 whitespace-nowrap truncate">63</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Frontiers Media SA</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">217</td>
          <td class="p-2 whitespace-nowrap truncate">96.8</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">99.5</td>
          <td class="p-2 whitespace-nowrap truncate">78.3</td>
          <td class="p-2 whitespace-nowrap truncate">47.5</td>
          <td class="p-2 whitespace-nowrap truncate">4.1</td>
          <td class="p-2 whitespace-nowrap truncate">71.9</td>
          <td class="p-2 whitespace-nowrap truncate">16.1</td>
          <td class="p-2 whitespace-nowrap truncate">468100</td>
          <td class="p-2 whitespace-nowrap truncate">79.7</td>
          <td class="p-2 whitespace-nowrap truncate">2705.78</td>
          <td class="p-2 whitespace-nowrap truncate">3230</td>
          <td class="p-2 whitespace-nowrap truncate">52.5</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Public Library of Science (PLoS)</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">201</td>
          <td class="p-2 whitespace-nowrap truncate">97</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">98.5</td>
          <td class="p-2 whitespace-nowrap truncate">86.6</td>
          <td class="p-2 whitespace-nowrap truncate">44.3</td>
          <td class="p-2 whitespace-nowrap truncate">18.4</td>
          <td class="p-2 whitespace-nowrap truncate">92.5</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">187380</td>
          <td class="p-2 whitespace-nowrap truncate">41.3</td>
          <td class="p-2 whitespace-nowrap truncate">2257.59</td>
          <td class="p-2 whitespace-nowrap truncate">2100</td>
          <td class="p-2 whitespace-nowrap truncate">64.7</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Wiley</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">190</td>
          <td class="p-2 whitespace-nowrap truncate">75.3</td>
          <td class="p-2 whitespace-nowrap truncate">84.7</td>
          <td class="p-2 whitespace-nowrap truncate">77.9</td>
          <td class="p-2 whitespace-nowrap truncate">38.4</td>
          <td class="p-2 whitespace-nowrap truncate">16.8</td>
          <td class="p-2 whitespace-nowrap truncate">3.7</td>
          <td class="p-2 whitespace-nowrap truncate">35.8</td>
          <td class="p-2 whitespace-nowrap truncate">25.8</td>
          <td class="p-2 whitespace-nowrap truncate">83550</td>
          <td class="p-2 whitespace-nowrap truncate">14.2</td>
          <td class="p-2 whitespace-nowrap truncate">3094.44</td>
          <td class="p-2 whitespace-nowrap truncate">3400</td>
          <td class="p-2 whitespace-nowrap truncate">52.6</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">MDPI AG</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">164</td>
          <td class="p-2 whitespace-nowrap truncate">99.4</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">78</td>
          <td class="p-2 whitespace-nowrap truncate">43.3</td>
          <td class="p-2 whitespace-nowrap truncate">3</td>
          <td class="p-2 whitespace-nowrap truncate">69.5</td>
          <td class="p-2 whitespace-nowrap truncate">20.7</td>
          <td class="p-2 whitespace-nowrap truncate">160620</td>
          <td class="p-2 whitespace-nowrap truncate">47</td>
          <td class="p-2 whitespace-nowrap truncate">2085.97</td>
          <td class="p-2 whitespace-nowrap truncate">2160</td>
          <td class="p-2 whitespace-nowrap truncate">65.2</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Oxford University Press (OUP)</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">99</td>
          <td class="p-2 whitespace-nowrap truncate">57.6</td>
          <td class="p-2 whitespace-nowrap truncate">87.9</td>
          <td class="p-2 whitespace-nowrap truncate">58.6</td>
          <td class="p-2 whitespace-nowrap truncate">69.7</td>
          <td class="p-2 whitespace-nowrap truncate">27.3</td>
          <td class="p-2 whitespace-nowrap truncate">8.1</td>
          <td class="p-2 whitespace-nowrap truncate">27.3</td>
          <td class="p-2 whitespace-nowrap truncate">58.6</td>
          <td class="p-2 whitespace-nowrap truncate">14100</td>
          <td class="p-2 whitespace-nowrap truncate">5.1</td>
          <td class="p-2 whitespace-nowrap truncate">2820</td>
          <td class="p-2 whitespace-nowrap truncate">2660</td>
          <td class="p-2 whitespace-nowrap truncate">56.6</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">BMJ</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">91</td>
          <td class="p-2 whitespace-nowrap truncate">78</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">83.5</td>
          <td class="p-2 whitespace-nowrap truncate">85.7</td>
          <td class="p-2 whitespace-nowrap truncate">48.4</td>
          <td class="p-2 whitespace-nowrap truncate">1.1</td>
          <td class="p-2 whitespace-nowrap truncate">69.2</td>
          <td class="p-2 whitespace-nowrap truncate">23.1</td>
          <td class="p-2 whitespace-nowrap truncate">147170</td>
          <td class="p-2 whitespace-nowrap truncate">51.6</td>
          <td class="p-2 whitespace-nowrap truncate">3131.28</td>
          <td class="p-2 whitespace-nowrap truncate">2800</td>
          <td class="p-2 whitespace-nowrap truncate">69.2</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">Informa UK Limited</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">74</td>
          <td class="p-2 whitespace-nowrap truncate">75.7</td>
          <td class="p-2 whitespace-nowrap truncate">91.9</td>
          <td class="p-2 whitespace-nowrap truncate">81.1</td>
          <td class="p-2 whitespace-nowrap truncate">47.3</td>
          <td class="p-2 whitespace-nowrap truncate">24.3</td>
          <td class="p-2 whitespace-nowrap truncate">2.7</td>
          <td class="p-2 whitespace-nowrap truncate">18.9</td>
          <td class="p-2 whitespace-nowrap truncate">58.1</td>
          <td class="p-2 whitespace-nowrap truncate">16450</td>
          <td class="p-2 whitespace-nowrap truncate">18.9</td>
          <td class="p-2 whitespace-nowrap truncate">1175</td>
          <td class="p-2 whitespace-nowrap truncate">740</td>
          <td class="p-2 whitespace-nowrap truncate">51.4</td>
          <td class="p-2 whitespace-nowrap truncate"></td>
        </tr>
        <tr>
          <td class="sticky left-0 bg-neutral-700 p-2 w-60 truncate">F1000 Research Ltd</td>
          <td class="sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">54</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">100</td>
          <td class="p-2 whitespace-nowrap truncate">42.6</td>
          <td class="p-2 whitespace-nowrap truncate">18.5</td>
          <td class="p-2 whitespace-nowrap truncate">5.6</td>
          <td class="p-2 whitespace-nowrap truncate">96.3</td>
          <td class="p-2 whitespace-nowrap truncate">0</td>
          <td class="p-2 whitespace-nowrap truncate">32270</td>
          <td class="p-2 whitespace-nowrap truncate">53.7</td>
          <td class="p-2 whitespace-nowrap truncate">1112.76</td>
          <td class="p-2 whitespace-nowrap truncate">1150</td>
          <td class="p-2 whitespace-nowrap truncate">81.5</td>
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