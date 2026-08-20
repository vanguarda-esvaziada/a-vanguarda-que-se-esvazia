/**
 * Conteúdo editorial da landing, extraído do manuscrito (proclamação, RETOMAR
 * e capítulos citados). Texto do autor — alterar aqui só junto com o original.
 */

export interface Sacada {
  n: string
  titulo: string
  texto: string
  onde: string
}

export const SACADAS: Sacada[] = [
  {
    n: '01',
    titulo: 'A vanguarda-símbolo',
    texto:
      'Nenhuma vanguarda saiu do poder porque se pediu que desaparecesse. Aqui não se pede: ela fica no hino, no feriado, na fachada — só não administra. É o mecanismo que fez monarquias sobreviverem: esvaziamento em troca de permanência.',
    onde: 'cap. 18',
  },
  {
    n: '02',
    titulo: 'A escala de comunicação',
    texto:
      'Um sistema de planejamento, não um organograma. Sem mercado, que só escuta quem tem dinheiro, e sem Gosplan, que não tem banda para o detalhe local: cada escala agrega sem apagar a origem. O nível federal lê Rondônia, não “região Norte”.',
    onde: 'cap. 13',
  },
  {
    n: '03',
    titulo: 'A autogestão dispensa a repressão',
    texto:
      'Sabotagem exige autoridade — é ato administrativo, não de força. Propriedade privada é o direito de decidir sozinho sobre algo coletivo; retirada essa cadeira, não há ato a reprimir. Prevenção por arquitetura, não por polícia.',
    onde: 'cap. 11',
  },
  {
    n: '04',
    titulo: 'As cinco pétreas que blindam a fase final',
    texto:
      'Liberdade de organização sindical, competências irreversíveis, cronograma fora do alcance do partido, revogação de mandato só pela base e proibição de nomeação por cima. A autogestão vira garantia constitucional, não boa vontade da vanguarda.',
    onde: 'itens 9, 23, 24, 25 e 26',
  },
]

export interface Linha {
  chave: string
  texto: string
}

export const TESE: Linha[] = [
  {
    chave: 'O método',
    texto:
      'Leninismo como método de transição. A vanguarda toma o poder pela força, depois de longo trabalho de base, e sustenta o Estado proletário enquanto a transição corre.',
  },
  {
    chave: 'A forma',
    texto:
      'Anarcossindicalismo federado e tecnocrático como forma final. Quem trabalha administra, quem é afetado decide, e a decisão acontece na escala em que a informação existe.',
  },
  {
    chave: 'O desfecho',
    texto:
      'A vanguarda se esvazia — por cronograma inscrito na Carta, até restar como símbolo. Permanece para sempre, não administra nada.',
  },
]

export const DECLARACOES: string[] = [
  'A propriedade privada dos meios de produção é o direito de decidir sozinho sobre o que é de todos. Essa assinatura vai deixar de existir.',
  'Terra que se distribui não volta a se concentrar. Demarcação indígena e quilombola irrevogável.',
  'Saúde, educação e moradia como direito exigível em juízo, não como meta de plano de governo.',
  'Crédito coletivo, para que nunca mais uma greve de capital derrube um governo eleito.',
  'Nenhum município com serviço de segunda classe, nenhuma região abandonada por regra de repartição que dependa da boa vontade de quem produz mais.',
  'O conflito é insumo: greve, crítica e povo puto entram no sistema em vez de serem calados por ele.',
]

/** O dado que abre a proclamação. */
export const CHOQUE = {
  ano: '2022',
  itens: [
    { valor: 'US$ 159 bi', rotulo: 'em comida exportada' },
    { valor: '33 milhões', rotulo: 'de pessoas passando fome' },
    { valor: 'ninguém', rotulo: 'preso, demitido ou responsabilizado' },
  ],
  remate:
    'Não é um acidente que se corrige. É uma máquina funcionando como foi construída.',
  golpe: 'Nós vamos desmontar a máquina.',
}

export const NEGACOES = [
  {
    titulo: 'Não somos o partido da alternância',
    texto:
      'Já trocamos de governo dez vezes. A terra continuou concentrada, a prisão continuou prendendo o mesmo corpo, o trabalho continuou barato. Quem promete resolver isso com outro presidente está prometendo a décima primeira tentativa.',
  },
  {
    titulo: 'Não somos o partido da paciência',
    texto:
      'Em 2014 este país saiu do Mapa da Fome; em 2022 tinha trinta e três milhões de famintos. Foram oito anos para desfazer dez. Tudo o que se conquista por lei ordinária se perde por lei ordinária.',
  },
  {
    titulo: 'Não somos o partido da pureza',
    texto:
      'Não esperamos um povo melhor do que este. Construímos um sistema que funciona com as pessoas que este país produziu — porque as outras não existem, e nunca existiram em lugar nenhum.',
  },
]
