import bruto from './manifesto.json'

export interface Capitulo {
  n: number
  rotulo: string
  titulo: string
  subtitulo: string
  slug: string
  palavras: number
}

export interface Parte {
  rotulo: string
  nome: string
  capitulos: Capitulo[]
}

export interface Petrea {
  n: number
  titulo: string
  /** Detalhe da cláusula; vazio quando o enunciado se basta. */
  texto: string
  /** Artigos do articulado que realizam esta cláusula. */
  artigos: number[]
}

export interface MateriaPetrea {
  grupo: string
  /** Glosa da matéria no manuscrito; vazia na maioria dos grupos. */
  nota: string
  itens: Petrea[]
}

/** Artigo do articulado jurídico (`manuscrito/carta.md`). */
export interface Artigo {
  n: number
  titulo: string
  /** Título e capítulo em que o artigo está, na hierarquia da Carta. */
  secao: string
  capitulo: string
  petreas: number[]
  /** Verdadeiro no art. 1º, que alcança as 121 quanto à irrevogabilidade. */
  todasAsPetreas: boolean
  /** Capítulos do manuscrito de onde vem o detalhamento. */
  fontes: string
  caput: string
  incisos: string[]
  comentario: string[]
  /** O que o manuscrito não decide; vazio quando não há. */
  pendencia: string[]
  /** Preenchido nos dois artigos cujo dispositivo o autor redige. */
  marcacaoAutor: string
}

/** Um ponto do programa mínimo. */
export interface PontoPrograma {
  n: number
  grupo: string
  texto: string
  /** "hoje" cabe na ordem vigente, "emenda", "depois" da ruptura. */
  quando: string[]
}

export interface DocumentoPrograma {
  letra: string
  slug: string
  titulo: string
  subtitulo: string
  palavras: number
}

export interface Programa {
  titulo: string
  subtitulo: string
  arquivo: string
  /** Mês e ano da última atualização; o caderno envelhece, o volume não. */
  data: string
  paginas: number | null
  kb: number | null
  documentos: DocumentoPrograma[]
  pontos: PontoPrograma[]
}

export interface Obra {
  autor: string
  obra: string
  ano: string
  /** Caminho dentro de `biblioteca/`; vazio quando citada sem exemplar local. */
  arquivo: string
  /** Verdadeiro quando o exemplar existe e foi copiado para `public/biblioteca/`. */
  existe: boolean
  kb: number | null
  /** pdf, html ou epub. */
  tipo: string
  /** Idioma do exemplar, detectado do texto do arquivo — não do título. */
  idioma: string
  idiomaNome: string
  uso: string
}

export interface GrupoBibliografico {
  grupo: string
  obras: Obra[]
}

export interface Manifesto {
  titulo: string
  subtitulo: string
  epigrafe: string
  autor: string
  cidade: string
  ano: string
  licenca: string
  licencaNome: string
  licencaUrl: string
  pdf: {
    arquivo: string
    baixarComo: string
    paginas: number | null
    kb: number | null
  }
  numeros: {
    capitulos: number
    secoes: number
    palavras: number
    petreas: number | null
    obras: number | null
    paginas: number | null
    referencias: number
  }
  abertura: Capitulo[]
  programa: Programa
  carta: MateriaPetrea[]
  articulado: Artigo[]
  partes: Parte[]
  objecoes: Capitulo[]
  bibliografia: GrupoBibliografico[]
}

/** Gerado por `build.py` a partir de manuscrito/ — não editar à mão. */
export const manifesto = bruto as Manifesto

/** Onde vive a edição de leitura (site/index.html), servida ao lado da landing. */
export const URL_LEITURA = './leitura/index.html'

export function milhar(n: number): string {
  return n.toLocaleString('pt-BR')
}

export function peso(kb: number | null): string {
  if (!kb) return ''
  return kb > 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
}
