const tableData = {
  articles_grant: {
    number: 848,
    year: 'All time',
    pretty: {
      link: "/temp/bmgf_articles_grant_alltime_on_2023-10-11_pretty.csv",
      head: `  
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">grant</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">compliant articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">free-to-read articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">open access articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">approved repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">preprint version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">no data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">total APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">with APCs</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">average APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">median APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">with grant ID</th>
      `,
      body: `
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1144
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            510
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">66.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">90%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">66.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">79.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">71.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">16.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">24.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">44.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$379,188</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">26.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,633.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,715</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1152504
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            154
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">96.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">33.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$627,347</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">89.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$4,449.27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$5,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1134248
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            130
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">76.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">72.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">40%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">43.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$231,368</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">82.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,122.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$1,912</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-008166
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            120
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">95.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">95.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">17.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$517,597</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">98.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$4,313.31</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$5,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INTERNAL
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            108
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">98.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">88%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">88%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">72.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$284,607</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">92.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,635.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,966</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1113682
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            106
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">93.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">92.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">24.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">44.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$175,314</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">40.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,652.38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1114827
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            95
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">88.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">85.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">36.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">49.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$206,824</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,585.3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-009934
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            91
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">75.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">73.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">22%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">56%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$179,780</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,020</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$1,782</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1053230
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            86
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">95.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">11.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">68.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">31.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$200,418</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,637.08</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-003439
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            81
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">84%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">76.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">4.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">79%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$175,831</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">77.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,790.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,340</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
        </tr>    
      `
    },
    raw: {
      link: "/temp/bmgf_articles_grant_alltime_on_2023-10-11_raw.csv",
      head: `
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">grant</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles_published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">is_compliant_articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">is_free_to_read</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">is_oa</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_approved_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_preprint_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_no_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">total_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_apc</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">average_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">median_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_grantid</th>
      `,
      body: `
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1144
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">510</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">339</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">459</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">341</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">406</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">82</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">123</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">225</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">379188</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">133</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2633.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2715</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">510</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1152504
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">154</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">148</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">145</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">52</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">627347</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">138</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">4449.27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">5000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">154</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1134248
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">130</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">127</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">127</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">127</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">52</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">56</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">231368</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">107</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2122.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1912</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">130</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-008166
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">120</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">119</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">120</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">119</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">115</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">115</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">21</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">517597</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">118</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">4313.31</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">5000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">120</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INTERNAL
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">108</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">102</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">106</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">102</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">284607</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2635.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2966</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">108</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1113682
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">106</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">105</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">98</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">26</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">53</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">175314</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">43</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3652.38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">106</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1114827
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">93</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">93</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">93</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">84</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">206824</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">77</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2585.3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-009934
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">20</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">179780</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2020</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1782</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            OPP1053230
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">84</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">82</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">10</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">59</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">200418</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">70</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2637.08</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            INV-003439
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">81</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">79</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">68</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">62</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">4</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">15</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">175831</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2790.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2340</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81</td>
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
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">publisher</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">compliant articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">free-to-read articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">open access articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">approved repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">preprint version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">no data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">total APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">with APCs</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">average APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">median APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">with grant ID</th>
      `,
      body: `
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Elsevier BV</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">543</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">67.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">91.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">71.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">4.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">50.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">36.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$938,660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">46.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,695.51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,475</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">46.4%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Springer Science and Business Media LLC</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">419</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">90%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">94.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">91.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">82.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">46.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">17.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">12.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$598,175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">36.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,909.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,970</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Frontiers Media SA</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">217</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">96.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">4.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">71.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">16.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$468,100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">79.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,705.78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,230</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">52.5%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Public Library of Science (PLoS)</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">201</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">97%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">98.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">86.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">44.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">92.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$187,380</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">41.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,257.59</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">64.7%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Wiley</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">190</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">75.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">84.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">77.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">38.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">16.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">35.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">25.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$83,550</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">14.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,094.44</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,400</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">52.6%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">MDPI AG</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">164</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">43.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">20.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$160,620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,085.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,160</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">65.2%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Oxford University Press (OUP)</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">99</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">57.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">87.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">58.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">27.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">8.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">27.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">58.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$14,100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">5.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,820</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">56.6%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">BMJ</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">83.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">85.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">48.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">23.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$147,170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">51.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$3,131.28</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$2,800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69.2%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">Informa UK Limited</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">74</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">75.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">91.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">24.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">58.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$16,450</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$1,175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$740</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">51.4%</td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">F1000 Research Ltd</td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">42.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">5.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$32,270</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">53.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$1,112.76</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">$1,150</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">81.5%</td>
        </tr>
      `
    },
    raw: {
      link: "/temp/bmgf_articles_publisher_2023_on_2023-10-11_raw.csv",
      head: `
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">publisher</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 w-60 truncate">articles_published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">is_compliant_articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">is_free_to_read</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">is_oa</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_approved_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_preprint_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_no_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">total_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_apc</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">average_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">median_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-60 truncate">has_grantid</th>
      `,
      body: `
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Elsevier BV
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            543
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">497</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">375</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">390</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">256</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">26</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">276</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">197</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">938660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">254</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3695.51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3475</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">252</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Springer Science and Business Media LLC
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            419
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">377</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">397</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">382</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">346</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">196</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">75</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">340</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">598175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3909.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2970</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">264</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Frontiers Media SA
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            217
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">210</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">217</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">216</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">103</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">9</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">156</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">468100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">173</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2705.78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3230</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">114</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Public Library of Science (PLoS)
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            201
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">195</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">201</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">198</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">174</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">37</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">186</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">187380</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">83</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2257.59</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">130</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Wiley
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            190
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">143</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">161</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">148</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">73</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">32</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">7</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">68</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">49</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">83550</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3094.44</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3400</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            MDPI AG
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            164
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">163</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">164</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">164</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">128</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">71</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">5</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">114</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">34</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">160620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">77</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2085.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2160</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">107</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Oxford University Press (OUP)
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            99
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">57</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">87</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">58</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">69</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">8</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">58</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">14100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">5</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2820</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">56</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            BMJ
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            91
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">71</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">76</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">44</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">21</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">147170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">47</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3131.28</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">63</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            Informa UK Limited
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            74
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">56</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">68</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">60</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">18</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">2</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">14</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">43</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">16450</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">14</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">740</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 whitespace-nowrap truncate">
            F1000 Research Ltd
          </td>
          <td class="border-b border-neutral-500 sticky left-60 bg-neutral-700 p-2 whitespace-nowrap truncate">
            54
          </td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">23</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">10</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">52</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">0</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">32270</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">29</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1112.76</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">1150</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate hover:bg-neutral-600">44</td>
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