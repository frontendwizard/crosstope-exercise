import algoliasearch from "algoliasearch/lite"
import {
  Highlight,
  Hits,
  InstantSearch,
  RefinementList,
  SearchBox,
} from "react-instantsearch-dom"
import "instantsearch.css/themes/algolia.css"
import { Hit } from "react-instantsearch-core"

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
)

type Epitope = {
  sequence: string
  epitope_id_by_iedb: string
  link_epitope_id_by_iedb: string
  complex_code: string
  deposition: string
  release: string
  last_modification: string
  structure_type: string
  mhc_allele: string
  source_protein: string
  source_organism: string
  epitope_position: string
  immunological_background: string
  reference: string
  link_para_source_protein: string
  link_para_reference: string
  id_sequence: number
  structure_source: string
  peptide_lenght: string
  link_para_structure_type: string
  objectID: string
}

const App = () => (
  <InstantSearch indexName="sequences" searchClient={searchClient}>
    <aside>
      <h2>MHC Allele</h2>
      <RefinementList attribute="mhc_allele" />
      <h2>Immunological Background</h2>
      <RefinementList attribute="immunological_background" />
      <h2>Peptide Lenght</h2>
      <RefinementList attribute="peptide_lenght" />
    </aside>
    <main>
      <SearchBox />
      <Hits hitComponent={HitComponent} />
    </main>
  </InstantSearch>
)

const HitComponent = ({ hit }: { hit: Hit<Epitope> }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "4px" }}>
      <img
        style={{ width: "100%", height: "auto" }}
        src={`https://storage.googleapis.com/crosstope/${hit.complex_code}_V5.jpg`}
        alt={`visual representation of pMHC ${hit.sequence}`}
      />
      <Highlight attribute="sequence" hit={hit} />
      <Highlight attribute="mhc_allele" hit={hit} />
      <Highlight attribute="immunological_background" hit={hit} />
    </div>
  )
}

export default App
