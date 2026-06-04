/* search-data.js — statischer Suchindex für Zitate und Seiten */
/* Personen werden zur Laufzeit aus data.js aufgebaut (search.js)  */
/* Inhalt: 11 Primärquellen · 5 Seiteneinträge                     */
const SEARCH_INDEX = [

  // ═══════════════════════════════════════════════════════════════
  //  PRIMÄRQUELLEN
  // ═══════════════════════════════════════════════════════════════

  {
    de: {
      title: 'Ding Ling — „Ich bin eine schlechte Frau"',
      sub: 'Tagebuch der Miss Sophie, 1928 · Körper & Begehren',
      body: 'miss sophie begehren körper innenwelt weiblich cixous écriture féminine selbstermächtigung patriarchalisch norm prosa tagebuch'
    },
    en: {
      title: 'Ding Ling — "I am a bad woman"',
      sub: 'Miss Sophie\'s Diary, 1928 · Body & Desire',
      body: 'Miss Sophie desire body inner world female écriture féminine self-empowerment patriarchal norm diary prose'
    },
    url: 'quellen.html#koerper',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Xiao Hong — „Körper der Frau als Ort des Leidens"',
      sub: 'Feld des Lebens und des Todes, 1934 · Körper & Begehren',
      body: 'körper leiden bäuerinnen mandschurei gewalt geburt erschöpfung judith butler materialität sichtbarkeit prosa'
    },
    en: {
      title: 'Xiao Hong — "The woman\'s body as a place of suffering"',
      sub: 'Field of Life and Death, 1934 · Body & Desire',
      body: 'body suffering peasant women Manchuria violence birth exhaustion Judith Butler materiality visibility prose'
    },
    url: 'quellen.html#koerper',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Ding Ling — „Gedanken zum 8. März" (Yan\'an 1942)',
      sub: 'Frauentag-Essay · Schreiben als Widerstand',
      body: 'frauentag 8 märz yan\'an kpch kommunismus patriarchat wollstonecraft unverheiratet anhängsel scheidung feministische kritik revolution'
    },
    en: {
      title: 'Ding Ling — "Thoughts on March 8th" (Yan\'an 1942)',
      sub: 'Women\'s Day essay · Writing as Resistance',
      body: 'Women\'s Day March 8 Yan\'an CCP communism patriarchy Wollstonecraft unmarried divorce feminist critique revolution'
    },
    url: 'quellen.html#schreiben',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Eileen Chang — „Berühmt werden muss man früh"',
      sub: 'Geschrieben in Wasser, 1944 · Schreiben als Widerstand',
      body: 'ruhm berühmt schreiben souveränität handlungsfenster ökonomische unabhängigkeit butler performativer akt shanghai besatzung'
    },
    en: {
      title: 'Eileen Chang — "Become famous early"',
      sub: 'Written on Water, 1944 · Writing as Resistance',
      body: 'fame famous writing sovereignty window of action economic independence Butler performative act Shanghai occupation'
    },
    url: 'quellen.html#schreiben',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Bing Xin — „Liebe links, Zuneigung rechts"',
      sub: 'Briefe an kleine Leser, 1923 · Schreiben als Widerstand',
      body: 'liebesphilosophie fürsorge care ethics gilligan kinderliteratur philosophie zuneigung natur briefe'
    },
    en: {
      title: 'Bing Xin — "Love left, affection right"',
      sub: 'Letters to Young Readers, 1923 · Writing as Resistance',
      body: 'philosophy of love care ethics Gilligan children\'s literature affection nature letters'
    },
    url: 'quellen.html#schreiben',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Qiu Jin — „Sagt nicht, Frauen seien kein heroischer Stoff"',
      sub: 'Lied der Fülle des Flusses, ca. 1905 · Revolution & Emanzipation',
      body: 'ci gedicht manjianghong schwert heldin revolution butler gender performance männerkleidung frauenbefreiung klassisch'
    },
    en: {
      title: 'Qiu Jin — "Say not that women lack heroic spirit"',
      sub: 'Song of the Full River, ca. 1905 · Revolution & Emancipation',
      body: 'ci poem sword heroine revolution Butler gender performance men\'s clothing women\'s liberation classical form'
    },
    url: 'quellen.html#revolution',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Xiang Jingyu — „Frauenbefreiung ist Teil der Gesellschaft"',
      sub: 'Über die Frauenbefreiungsbewegung, 1922 · Revolution & Emanzipation',
      body: 'frauenbefreiung gesellschaft klasse marxistisch-feministisch intersektionalität unterdrückung patriarchat revolution crenshaw'
    },
    en: {
      title: 'Xiang Jingyu — "Women\'s liberation is part of society"',
      sub: 'On the Women\'s Liberation Movement, 1922 · Revolution & Emancipation',
      body: 'women\'s liberation society class Marxist-feminist intersectionality oppression patriarchy revolution Crenshaw'
    },
    url: 'quellen.html#revolution',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'He Xiangning — „Erst die Nation, dann die Frau"',
      sub: 'Rede zum Internationalen Frauentag, Guangzhou 1924 · Revolution',
      body: 'nation nationale befreiung frauenemanzipation fanon spivak postkolonial nationale souveränität frauenfrage guangzhou 1924'
    },
    en: {
      title: 'He Xiangning — "Nation first, then women\'s liberation"',
      sub: 'Speech on International Women\'s Day, Guangzhou 1924 · Revolution',
      body: 'nation national liberation women\'s emancipation Fanon Spivak postcolonial national sovereignty women\'s question Guangzhou 1924'
    },
    url: 'quellen.html#revolution',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Ruan Lingyu — „Gerüchte sind eine furchtbare Sache"',
      sub: 'Abschiedsbrief, 8. März 1935 · Bild, Blick & Leinwand',
      body: 'gerüchte abschiedsbrief suizid 1935 frauentag mulvey male gaze blick foucault disziplinierung boulevard presse 人言可畏'
    },
    en: {
      title: 'Ruan Lingyu — "Gossip is a fearful thing"',
      sub: 'Farewell letter, 8 March 1935 · Image, Gaze & Screen',
      body: 'gossip farewell letter suicide 1935 Women\'s Day Mulvey male gaze Foucault discipline tabloid press'
    },
    url: 'quellen.html#blick',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Xie Caizhen — „An Orphan\'s Cry" (1925)',
      sub: 'Erster Film einer Regisseurin · Bild, Blick & Leinwand',
      body: 'film regisseurin hinter kamera arbeiterschicht mädchen kaplan blickumkehr weibliche regie produktion erste regisseurin'
    },
    en: {
      title: 'Xie Caizhen — "An Orphan\'s Cry" (1925)',
      sub: 'First film by a female director · Image, Gaze & Screen',
      body: 'film director behind camera working class girl Kaplan reversal of gaze female direction production first female director'
    },
    url: 'quellen.html#blick',
    type: 'quote', icon: '言'
  },
  {
    de: {
      title: 'Hu Die — „Auch eine Schauspielerin ist ein Mensch"',
      sub: 'Memoiren, posthum 1988 · Bild, Blick & Leinwand',
      body: 'innerlichkeit schauspielerin rolle goffman rivière weiblichkeit maske star öffentlich privat filmkönigin navigieren systeme'
    },
    en: {
      title: 'Hu Die — "An actress is still a human being"',
      sub: 'Memoirs, posthumously 1988 · Image, Gaze & Screen',
      body: 'inner life actress role Goffman Rivière femininity mask star public private movie queen navigating systems'
    },
    url: 'quellen.html#blick',
    type: 'quote', icon: '言'
  },

  // ═══════════════════════════════════════════════════════════════
  //  SEITEN
  // ═══════════════════════════════════════════════════════════════

  {
    de: {
      title: 'Virtuelle Galerie',
      sub: '11 Porträt-Karten · Horizontales Scrollen',
      body: 'galerie ausstellung porträts chinesisch republikzeit frauen karten scrollen bilder'
    },
    en: {
      title: 'Virtual Gallery',
      sub: '11 Portrait cards · Horizontal scroll',
      body: 'gallery exhibition portraits Chinese Republican era women cards scroll images'
    },
    url: 'galerie3d.html',
    type: 'page', icon: '廊'
  },
  {
    de: {
      title: 'Historisches Gedächtnis',
      sub: 'Wikipedia-Aufrufe · Bekannt als … · Wie sichtbar sind diese Frauen?',
      body: 'gedächtnis sichtbarkeit wikipedia bekannt als statistik netzwerk vergleich männer zeitgenossen erinnerung'
    },
    en: {
      title: 'Historical Memory',
      sub: 'Wikipedia views · Known as … · How visible are these women?',
      body: 'memory visibility Wikipedia known as statistics network comparison men contemporaries remembrance'
    },
    url: 'sichtbarkeit.html',
    type: 'page', icon: '見'
  },
  {
    de: {
      title: 'Quiz: Wie aufgeklärt bist du wirklich?',
      sub: '15 Fragen · Feminismus · Frauengeschichte',
      body: 'quiz bewusstsein feminismus frauengeschichte genderperspektive chinesische geschichte unterrepräsentiert strukturell test bewusstseinstest'
    },
    en: {
      title: 'Quiz: How aware are you really?',
      sub: '15 questions · Feminism · Women\'s history',
      body: 'quiz awareness feminism women\'s history gender perspective Chinese history underrepresented structural consciousness test'
    },
    url: 'quiz.html',
    type: 'page', icon: '問'
  },
  {
    de: {
      title: 'Primärquellen — Stimmen',
      sub: 'Texte & Zitate · Körper · Schreiben · Revolution · Blick',
      body: 'quellen zitate texte primärquellen körper begehren schreiben widerstand revolution emanzipation bild blick leinwand'
    },
    en: {
      title: 'Primary Sources — Voices',
      sub: 'Texts & quotes · Body · Writing · Revolution · Gaze',
      body: 'sources quotes texts primary body desire writing resistance revolution emancipation image gaze screen'
    },
    url: 'quellen.html',
    type: 'page', icon: '文'
  },
  {
    de: {
      title: 'Übersicht — New Woman, Modern Girl',
      sub: 'Startseite · Digitale Begleitausstellung · 1912–1949',
      body: 'startseite übersicht ausstellung seminar weiblichkeitsentwürfe neue frauen moderne mädchen republikzeit'
    },
    en: {
      title: 'Overview — New Woman, Modern Girl',
      sub: 'Home · Digital companion exhibition · 1912–1949',
      body: 'home overview exhibition seminar femininity new women modern girls Republican era'
    },
    url: 'index.html',
    type: 'page', icon: '首'
  }

];
