import _australia_anz from './australia/anz.png'
import _australia_banksa from './australia/banksa.png'
import _australia_bankwest from './australia/bankwest.png'
import _australia_bendigobank from './australia/bendigobank.png'
import _australia_boq from './australia/boq.png'
import _australia_commbank from './australia/commbank.png'
import _australia_ing from './australia/ing.png'
import _australia_macquarie from './australia/macquarie.png'
import _australia_mebank from './australia/mebank.png'
import _australia_nab from './australia/nab.png'
import _australia_rabobank from './australia/rabobank.png'
import _australia_stgeorge from './australia/stgeorge.png'
import _australia_suncorp from './australia/suncorp.png'
import _australia_up from './australia/up.png'
import _australia_westpac from './australia/westpac.png'
import _global_bankofamerica from './global/bankofamerica.svg'
import _global_barclays from './global/barclays.svg'
import _global_bmo from './global/bmo.png'
import _global_bnpparibas from './global/bnpparibas.png'
import _global_caixabank from './global/caixabank.svg'
import _global_capitalone from './global/capitalone.png'
import _global_chase from './global/chase.svg'
import _global_citibank from './global/citibank.png'
import _global_commerzbank from './global/commerzbank.svg'
import _global_deutschebank from './global/deutschebank.svg'
import _global_goldmansachs from './global/goldmansachs.svg'
import _global_hsbc from './global/hsbc.svg'
import _global_ing from './global/ing.png'
import _global_jpmorgan from './global/jpmorgan.png'
import _global_lloydsbank from './global/lloydsbank.png'
import _global_monzo from './global/monzo.svg'
import _global_natwest from './global/natwest.png'
import _global_nubank from './global/nubank.svg'
import _global_rbs from './global/rbs.png'
import _global_revolut from './global/revolut.svg'
import _global_santander from './global/santander.png'
import _global_standardchartered from './global/standardchartered.png'
import _global_starlingbank from './global/starlingbank.svg'
import _global_td from './global/td.png'
import _global_ubs from './global/ubs.png'
import _global_wellsfargo from './global/wellsfargo.svg'
import _global_wise from './global/wise.svg'
import _japan_japanpost from './japan/japanpost.png'
import _japan_mizuho from './japan/mizuho.png'
import _japan_mufg from './japan/mufg.png'
import _japan_rakuten from './japan/rakuten.svg'
import _japan_sbibank from './japan/sbibank.png'
import _japan_smbc from './japan/smbc.png'
import _new_zealand_anz from './new-zealand/anz.png'
import _new_zealand_asb from './new-zealand/asb.png'
import _new_zealand_bnz from './new-zealand/bnz.png'
import _new_zealand_heartland from './new-zealand/heartland.png'
import _new_zealand_kiwibank from './new-zealand/kiwibank.png'
import _new_zealand_tsb from './new-zealand/tsb.png'
import _new_zealand_westpac from './new-zealand/westpac.png'
import _singapore_citibank from './singapore/citibank.png'
import _singapore_dbs from './singapore/dbs.png'
import _singapore_maybank from './singapore/maybank.png'
import _singapore_ocbc from './singapore/ocbc.png'
import _singapore_posb from './singapore/posb.png'
import _singapore_standardchartered from './singapore/standardchartered.png'

// Normalises imports across environments:
// Next.js/webpack returns StaticImageData ({ src, width, height }) for images.
// Vite (Storybook, and most consumer bundlers) returns the URL string directly.
function u(mod: unknown): string {
  if (typeof mod === 'string') return mod
  const m = mod as Record<string, unknown>
  if (typeof m.src === 'string') return m.src
  const d = m.default as Record<string, unknown> | string | undefined
  if (typeof d === 'string') return d
  if (d && typeof (d as Record<string, unknown>).src === 'string') return (d as Record<string, unknown>).src as string
  return ''
}

export const BANK_LOGOS: Record<string, string> = {
  'australia/anz.png': u(_australia_anz),
  'australia/banksa.png': u(_australia_banksa),
  'australia/bankwest.png': u(_australia_bankwest),
  'australia/bendigobank.png': u(_australia_bendigobank),
  'australia/boq.png': u(_australia_boq),
  'australia/commbank.png': u(_australia_commbank),
  'australia/ing.png': u(_australia_ing),
  'australia/macquarie.png': u(_australia_macquarie),
  'australia/mebank.png': u(_australia_mebank),
  'australia/nab.png': u(_australia_nab),
  'australia/rabobank.png': u(_australia_rabobank),
  'australia/stgeorge.png': u(_australia_stgeorge),
  'australia/suncorp.png': u(_australia_suncorp),
  'australia/up.png': u(_australia_up),
  'australia/westpac.png': u(_australia_westpac),
  'global/bankofamerica.svg': u(_global_bankofamerica),
  'global/barclays.svg': u(_global_barclays),
  'global/bmo.png': u(_global_bmo),
  'global/bnpparibas.png': u(_global_bnpparibas),
  'global/caixabank.svg': u(_global_caixabank),
  'global/capitalone.png': u(_global_capitalone),
  'global/chase.svg': u(_global_chase),
  'global/citibank.png': u(_global_citibank),
  'global/commerzbank.svg': u(_global_commerzbank),
  'global/deutschebank.svg': u(_global_deutschebank),
  'global/goldmansachs.svg': u(_global_goldmansachs),
  'global/hsbc.svg': u(_global_hsbc),
  'global/ing.png': u(_global_ing),
  'global/jpmorgan.png': u(_global_jpmorgan),
  'global/lloydsbank.png': u(_global_lloydsbank),
  'global/monzo.svg': u(_global_monzo),
  'global/natwest.png': u(_global_natwest),
  'global/nubank.svg': u(_global_nubank),
  'global/rbs.png': u(_global_rbs),
  'global/revolut.svg': u(_global_revolut),
  'global/santander.png': u(_global_santander),
  'global/standardchartered.png': u(_global_standardchartered),
  'global/starlingbank.svg': u(_global_starlingbank),
  'global/td.png': u(_global_td),
  'global/ubs.png': u(_global_ubs),
  'global/wellsfargo.svg': u(_global_wellsfargo),
  'global/wise.svg': u(_global_wise),
  'japan/japanpost.png': u(_japan_japanpost),
  'japan/mizuho.png': u(_japan_mizuho),
  'japan/mufg.png': u(_japan_mufg),
  'japan/rakuten.svg': u(_japan_rakuten),
  'japan/sbibank.png': u(_japan_sbibank),
  'japan/smbc.png': u(_japan_smbc),
  'new-zealand/anz.png': u(_new_zealand_anz),
  'new-zealand/asb.png': u(_new_zealand_asb),
  'new-zealand/bnz.png': u(_new_zealand_bnz),
  'new-zealand/heartland.png': u(_new_zealand_heartland),
  'new-zealand/kiwibank.png': u(_new_zealand_kiwibank),
  'new-zealand/tsb.png': u(_new_zealand_tsb),
  'new-zealand/westpac.png': u(_new_zealand_westpac),
  'singapore/citibank.png': u(_singapore_citibank),
  'singapore/dbs.png': u(_singapore_dbs),
  'singapore/maybank.png': u(_singapore_maybank),
  'singapore/ocbc.png': u(_singapore_ocbc),
  'singapore/posb.png': u(_singapore_posb),
  'singapore/standardchartered.png': u(_singapore_standardchartered),
}
