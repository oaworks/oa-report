const tableData = {
  articles: {
    number: '2,702',
    year: '2023',
    raw: {
      link: "/temp/bmgf_all-articles_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv",
      head: `
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">DOI</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_compliant__bmgf</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">grantid__bmgf</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">title</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">publisher</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">journal</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">issn</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">published_date</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">published_year</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">PMCID</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">authorships.institutions.display_name</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">funder.name</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_oa</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">oa_status</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">journal_oa_type</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">publisher_license_best</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_repository_copy</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">repository_license_best</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">repository_url</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_approved_repository__bmgf</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_preprint</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">can_archive</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">concepts.display_name</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">subject</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">program__bmgf</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">cited_by_count</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">author_email_name</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">email</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">invoice_date</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">invoice_number</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">apc_cost</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">oasupport.status</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">sheets</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_new__bmgf</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.has_shared_data</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.has_open_data</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.doi</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.url</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.accession</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.location</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.licence</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.data.evidence</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.has_made_code</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.has_shared_code</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.has_open_code</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.doi</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.url</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.accession</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.location</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.licence</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">dev.code.evidence</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_original_research</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">data_availability_statement_category</th>
      `,
      body: `
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1016/j.xpro.2023.102563</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">A protocol for measuring the sexual receptivity of female Drosophila</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Elsevier BV</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">STAR Protocols</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2666-1667</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-12-01</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">PMC10507193</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">hybrid</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by-nc-nd</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1016/j.ebiom.2023.104777</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Predictive models of long COVID</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Elsevier BV</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">eBioMedicine</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2352-3964</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-10-01</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">PMC10494314</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Medicine;Coronavirus disease 2019 (COVID-19);Logistic regression;Generalizability theory;Random forest;Internal medicine;Cohort;Diagnosis code;Incidence (geometry);Disease;Artificial intelligence;Statistics;Infectious disease (medical specialty);Population;Computer science;Environmental health;Physics;Mathematics;Optics</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">General Biochemistry, Genetics and Molecular Biology;General Medicine</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">0</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf;publication_type__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1016/j.eclinm.2023.102140</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Immunogenicity and safety of SARS-CoV-2 recombinant protein nanoparticle vaccine GBP510 adjuvanted with AS03: interim results of a randomised, active-controlled, observer-blinded, phase 3 trial</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Elsevier BV</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">eClinicalMedicine</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2589-5370</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-10-01</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">PMC10498190</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by-nc-nd</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Medicine;Immunogenicity;Cohort;Interim analysis;Vaccination;Internal medicine;Seroconversion;Randomized controlled trial;Immunology;Antibody</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">General Medicine</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">0</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf;publication_type__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1016/s2214-109x(23)00383-2</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Potential cost-effectiveness of community availability of tenofovir, lamivudine, and dolutegravir for HIV prevention and treatment in east, central, southern, and west Africa: a modelling analysis</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Elsevier BV</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">The Lancet Global Health</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2214-109X</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-10-01</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1016/j.eclinm.2023.102151</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Immune persistence of an inactivated poliovirus vaccine derived from the Sabin strain: a 10-year follow-up of a phase 3 study</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Elsevier BV</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">eClinicalMedicine</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2589-5370</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-10-01</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">PMC10514427</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">hybrid</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by-nc-nd</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1186/s40249-023-01135-7</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Assessing food security performance from the One Health concept: an evaluation tool based on the Global One Health Index</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Springer Science and Business Media LLC</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Infectious Diseases of Poverty</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2049-9957</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-22</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">PMC10514978</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.7554/elife.85023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Diverse evolutionary pathways challenge the use of collateral sensitivity as a strategy to suppress resistance</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">eLife Sciences Publications, Ltd</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">eLife</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2050-084X</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-22</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1111/nph.19273</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Parallel tuning of semi‐dwarfism via differential splicing of <i>Brachytic1</i> in commercial maize and smallholder sorghum</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Wiley</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">New Phytologist</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">0028-646X;1469-8137</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-22</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">bronze</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">hybrid</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">acceptedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_new__bmgf;name_epmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.3389/fpubh.2023.1147180</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Prevalence and risk factors associated with the occurrence of Campylobacter sp. in children aged 6–24 months in peri-urban Nairobi, Kenya</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-22</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">University of Nairobi;International Livestock Research Institute;University of Copenhagen;London School of Hygiene & Tropical Medicine</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Campylobacter;Hygiene;Campylobacter jejuni;Diarrhea;Environmental health;Sanitation;Medicine;Malnutrition;Diarrheal disease;Veterinary medicine;Biology;Internal medicine;Bacteria;Genetics;Pathology</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">0</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-1008788-1</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">3230</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;finance_v3__bmgf;is_new__bmgf;preprints_oa_locations__bmgf;publication_type__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1007/s41109-023-00595-y</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Overcoming vaccine hesitancy by multiplex social network targeting: an analysis of targeting algorithms and implications</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Springer Science and Business Media LLC</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Applied Network Science</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2364-8228</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-21</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">PMC10514145</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">submittedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">https://www.researchsquare.com/article/rs-2608863/latest.pdf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">publishedVersion</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">FALSE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">custom_keys__bmgf;is_compliant__bmgf;is_new__bmgf;pmc__bmgf;preprints_oa_locations__bmgf</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">TRUE</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>

      `
    }
  },
  articles_grant: {
    number: 848,
    year: 'All time',
    pretty: {
      link: "/temp/bmgf_articles_grant_alltime_on_2023-10-11_pretty.csv",
      head: `  
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">grant</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom">articles published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">compliant articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">free-to-read articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">open access articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">approved repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">preprint version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">no data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">total APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">with APCs</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">average APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">median APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">with grant ID</th>
      `,
      body: `
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1144
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            510
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">66.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">90%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">66.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">79.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">71.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">24.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">44.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$379,188</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">26.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,633.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,715</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1152504
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            154
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">33.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$627,347</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$4,449.27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$5,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1134248
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            130
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">76.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">72.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">40%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">43.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$231,368</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">82.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,122.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,912</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INV-008166
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            120
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">17.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$517,597</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$4,313.31</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$5,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INTERNAL
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            108
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">88%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">88%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">72.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$284,607</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">92.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,635.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,966</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1113682
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            106
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">92.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">24.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">44.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$175,314</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">40.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,652.38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1114827
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            95
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">88.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">85.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">36.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">49.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$206,824</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,585.30</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INV-009934
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            91
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">73.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">22%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$179,780</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,020.00</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,782</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1053230
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            86
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">11.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">31.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$200,418</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,637.08</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INV-003439
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            81
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">76.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">79%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$175,831</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,790.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,340</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>    
      `,
      body_more: `
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP1184344</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">80</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">13.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">31.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$168,899</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">62.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,248.06</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP50838</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">80</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">45%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$216,552</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,926.38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">INV-007594</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">78</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">28.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">60.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$120,023</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">60.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,690.46</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP47075</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">76</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">28.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$199,658</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">90.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,812.08</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP1017641</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">69</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">92.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">88.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">85.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">26.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">65.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$71,302</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">39.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,927.08</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP49817</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">66</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">10.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">40.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">54.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$177,137</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">80.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,107.67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP1148933</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">64</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">21.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">64.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$68,819</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,207.35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">OPP1107597</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">63</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">6.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">60.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">30.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$126,367</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">88.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,038.18</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">INV-008442</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">62</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">17.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">62.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$152,359</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,497.69</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
        </tr>
      `
    },
    raw: {
      link: "/temp/bmgf_articles_grant_alltime_on_2023-10-11_raw.csv",
      head: `
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">grant</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words">articles_published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_compliant_articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_free_to_read</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_oa</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_approved_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_preprint_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_no_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">total_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_apc</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">average_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">median_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_grantid</th>
      `,
      body: `
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1144
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">510</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">339</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">459</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">341</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">406</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">82</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">123</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">225</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">379188</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">133</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2633.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2715</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">510</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1152504
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">154</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">148</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">145</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">627347</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">138</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4449.27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">154</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1134248
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">130</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">127</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">127</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">127</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">231368</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">107</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2122.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1912</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">130</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INV-008166
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">120</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">119</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">120</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">119</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">115</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">115</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">21</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">517597</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">118</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4313.31</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">120</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INTERNAL
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">108</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">102</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">106</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">102</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">284607</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2635.25</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2966</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">108</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1113682
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">106</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">105</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">26</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">53</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">175314</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">43</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3652.38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">106</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1114827
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">95</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">206824</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2585.3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INV-009934
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">91</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">20</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">179780</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2020</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1782</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            OPP1053230
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">86</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">82</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">10</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">59</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">200418</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">70</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2637.08</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            INV-003439
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">81</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">79</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">62</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">15</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">175831</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2790.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2340</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81</td>
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
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">publisher</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom">articles published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">compliant articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">free-to-read articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">open access articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">approved repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">preprint version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">no data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">total APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">with APCs</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">average APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">median APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">with grant ID</th>
      `,
      body: `
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Elsevier BV</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">543</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">71.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">36.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$938,660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">46.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,695.51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,475</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">46.4%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Springer Science and Business Media LLC</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">419</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">90%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">82.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">46.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">17.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">12.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$598,175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">36.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,909.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,970</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Frontiers Media SA</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">217</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">71.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$468,100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">79.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,705.78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,230</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52.5%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Public Library of Science (PLoS)</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">201</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">86.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">44.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">92.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$187,380</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">41.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,257.59</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">64.7%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Wiley</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">190</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">38.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$83,550</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">14.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,094.44</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,400</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52.6%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">MDPI AG</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">164</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">43.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">20.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$160,620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,085.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,160</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">65.2%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Oxford University Press (OUP)</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">99</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">57.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">8.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$14,100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,820.00</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56.6%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">BMJ</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">83.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">85.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">48.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">23.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$147,170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,131.28</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.2%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Informa UK Limited</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">74</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">24.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$16,450</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,175.00</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$740</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51.4%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">F1000 Research Ltd</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">42.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$32,270</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">53.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,112.76</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,150</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.5%</td>
        </tr>
      `,
      body_more: `
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">American Chemical Society (ACS)</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">49</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">38.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">10.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">26.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">59.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$93,440</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,014.19</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">83.7%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">American Society for Microbiology</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">38</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.6%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">92.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">26.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">15.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">13.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$18,280</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">13.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,656</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68.4%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">SAGE Publications</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">30</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">36.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">70%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">43.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">36.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,200</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,200</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$700</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56.7%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">American Society of Tropical Medicine and Hygiene</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">27</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">59.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">7.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">85.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$50,170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,951.18</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Cambridge University Press (CUP)</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">17</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">94.1%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">29.4%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5.9%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">11.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">11.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$20,080</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">41.2%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,868.57</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">82.4%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">International Society of Global Health</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">16</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">62.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">37.5%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">6.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">6.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.8%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$38,070</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.3%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,928.46</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,000</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">American Association for the Advancement of Science (AAAS)</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">12</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">66.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">41.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$11,620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,873.33</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,500</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Johns Hopkins School Bloomberg School of Public Health, Center for Communication Programs</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">12</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">66.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">41.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$11,620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,873.33</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,500</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Proceedings of the National Academy of Sciences</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">12</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">66.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">41.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$11,620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,873.33</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,500</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">American Society for Clinical Investigation</th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">12</th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">66.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">41.7%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">50%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$11,620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,873.33</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,500</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25%</td>
        </tr>
      `
    },
    raw: {
      link: "/temp/bmgf_articles_publisher_2023_on_2023-10-11_raw.csv",
      head: `
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">publisher</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom break-words">articles_published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_compliant_articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_free_to_read</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">is_oa</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_approved_repository_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_preprint_version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_no_data_availability_statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">total_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_apc</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">average_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">median_apcs_paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">has_grantid</th>
      `,
      body: `
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Elsevier BV
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            543
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">365</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">497</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">375</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">390</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">256</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">26</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">276</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">197</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">938660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">254</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3695.51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3475</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">252</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Springer Science and Business Media LLC
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            419
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">377</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">397</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">382</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">346</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">196</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">340</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">598175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">153</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3909.64</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2970</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">264</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Frontiers Media SA
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            217
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">210</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">217</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">216</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">103</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">9</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">156</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">468100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">173</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2705.78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3230</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">114</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Public Library of Science (PLoS)
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            201
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">195</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">201</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">198</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">174</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">37</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">186</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">187380</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">83</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2257.59</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">130</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Wiley
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            190
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">143</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">161</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">148</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">73</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">32</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">7</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">49</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">83550</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3094.44</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3400</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            MDPI AG
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            164
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">163</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">164</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">164</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">128</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">71</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">114</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">34</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">160620</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2085.97</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2160</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">107</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Oxford University Press (OUP)
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            99
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">57</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">8</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">14100</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2820</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2660</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            BMJ
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            91
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">71</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">76</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">44</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">21</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">147170</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3131.28</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2800</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">63</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            Informa UK Limited
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            74
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">60</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">14</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">43</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16450</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">14</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1175</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">740</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">38</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600"></td>
        </tr>
        <tr>
          <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">
            F1000 Research Ltd
          </th>
          <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">
            54
          </th>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">54</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">23</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">10</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">32270</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">29</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1112.76</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1150</td>
          <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">44</td>
        </tr>    
      `
    }
  },
  articles_publisher_subset: {
    number: 63,
    year: '2023',
    pretty: {
      link: "/temp/bmgf_articles_publisher_2023_on_2023-10-11_pretty.csv",
      head: `
        <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">publisher</th>
        <th scope="col" class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 w-24 md:w-32 align-bottom">articles published</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">compliant articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">free-to-read articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">open access articles</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">approved repository version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">preprint version</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">no data availability statement</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">total APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">with APCs</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">average APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">median APCs paid</th>
        <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">with grant ID</th>
      `,
      body: `
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Elsevier BV</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">264</th>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">65.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">67.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">70.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">45.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">4.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">49.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">34.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$932,580</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">44.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,680.47</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,460</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">45.2%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Springer Science and Business Media LLC</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">201</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">88.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">93.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">89.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">80.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">45.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">79.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">11.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$596,150</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,895.50</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,950</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">61.8%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Public Library of Science (PLoS)</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">120</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">95.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">98.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">76.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">46.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">70.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">15.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$465,980</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">78.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,695.50</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,210</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51.3%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Wiley</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">117</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">97.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">85.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">43.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">17.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$186,950</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">40.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,250.70</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,090</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">64.1%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Frontiers Media SA</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">95</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">74.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">37.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">16.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">3.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">35.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">25.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$83,320</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">14%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,090.20</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,380</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">52.2%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Oxford University Press (OUP)</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">63</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.1%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">42.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">20.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$160,300</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">46.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,082.20</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,150</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">64.8%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">Wiley</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">13</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">57.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">87.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">69.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">7.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">27%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">58.3%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$14,060</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,815.50</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,650</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">56.3%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">F1000 Research Ltd</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">8</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">77.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">82.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">84.7%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">47.9%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">1%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">22.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$146,950</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51.1%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$3,120.28</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$2,790</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">68.7%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">BMJ</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">4</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">75.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">91.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">80.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">46.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">23.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">2.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.4%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">57.6%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$16,420</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,170</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$735</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">51.1%</td>
      </tr>
      <tr>
        <th class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 text-left md:whitespace-nowrap md:truncate">American Chemical Society (ACS)</th>
        <th class="border-b border-neutral-500 sticky left-32 md:left-60 bg-neutral-700 p-2 text-left whitespace-nowrap truncate">3</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">99.8%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">42.1%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">18.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">5.5%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">96%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">0%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$32,250</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">53.2%</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,110.76</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">$1,145</td>
        <td class="border-b border-neutral-500 p-2 whitespace-nowrap truncate text-right hover:bg-neutral-600">81.2%</td>
      </tr>
      `
    }
  },
  articles_with_apcs_only: {
    number: "1,027",
    year: "2023",
    link: '/temp/bmgf_articles-with-apcs_from_2023-01-01-to-2023-10-04_on_2023-09-27.csv',
    pretty: {
      head: `
      `,
      body: `
      `
    },
    raw: {
      head: `
        <tr>
          <th scope="col" class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-32 md:w-60 align-bottom">DOI</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">grantid__bmgf</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">publisher_simple</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">journal</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">journal_oa_type</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">published_date</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">oa_status</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">publisher_license_best</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">apc_cost</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">invoice_number</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">invoice_date</th>
          <th scope="col" class="border-b border-neutral-500 p-2 w-32 align-bottom break-words text-right">invoice_year</th>
        </tr>
      `,
      body: `
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.3389/fpubh.2023.1147180</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-22</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">3230</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-1008788-1</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1136/bmj-2022-072249</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-21</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">6800</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">APC600447950</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-04</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1038/s41591-023-02551-w</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-21</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">11690</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">1452513097</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-13</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1128/mbio.01887-23</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-20</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">4270</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">APC600441996</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-08-11</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.3389/fimmu.2023.1220130</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-20</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">3230</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-1008788-1</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.3389/fvets.2023.1168649</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-19</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">3230</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-1008788-1</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.3389/fsoc.2023.1254595</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-19</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">770</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-1008788-1</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1038/s41598-023-42425-2</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">springer/nature/bmc</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">Scientific Reports</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-16</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">gold</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">cc-by</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">1350</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2939206000</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-20</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.1099/mgen.0.001094</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-15</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">3170</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">APC600449722</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
        <tr>
          <td class="border-b border-neutral-500 sticky left-0 bg-neutral-700 p-2 w-60 truncate">10.3389/fphar.2023.1088670</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">closed</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-14</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">3230</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-1008788-1</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023-09-08</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate">2023</td>
          <td class="border-b border-neutral-500 p-2 w-32 truncate"></td>
        </tr>
      `
    }
  }
};