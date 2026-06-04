const questions = [
  {
    id: 1,
    statement: "Vor dem Besuch dieser Ausstellung hätte ich spontan mindestens drei chinesische Frauen aus der Republikzeit (1912–1949) nennen können.",
    awareAnswer: "agree",
    explanation: "Chinesische Frauen der Republikzeit waren Revolutionärinnen, Schriftstellerinnen, Politikerinnen – und sind global nahezu unbekannt. Dieses Unwissen ist kein persönliches Versagen, sondern ein strukturelles Ergebnis der Geschichtsschreibung."
  },
  {
    id: 2,
    statement: "Wenn Frauen in Geschichtsbüchern fehlen, liegt das hauptsächlich daran, dass sie tatsächlich weniger zur Geschichte beigetragen haben.",
    awareAnswer: "disagree",
    explanation: "Frauen fehlen, weil Geschichte lange von Männern für Männer geschrieben wurde – nicht weil Frauen weniger beigetragen haben. Das Fehlen ist ein Produkt der Geschichtsschreibung, nicht der Geschichte."
  },
  {
    id: 3,
    statement: "Feminismus ist im Kern ein westliches Konzept, das sich schlecht auf Kulturen wie China übertragen lässt.",
    awareAnswer: "disagree",
    explanation: "Chinesische Frauen haben Ende des 19. und Anfang des 20. Jahrhunderts unabhängig und parallel zu westlichen Bewegungen für ihre Rechte gekämpft. Feminismus als 'westlich' abzustempeln, macht diese Kämpfe unsichtbar."
  },
  {
    id: 4,
    statement: "Das Bild der 'traditionellen, gehorsamen chinesischen Frau' beschreibt die historische Realität der meisten chinesischen Frauen zutreffend.",
    awareAnswer: "disagree",
    explanation: "Dieses Bild ist ein Konstrukt – entstanden aus patriarchalischen Interessen und westlichem Orientalismus. Chinesische Frauen haben zu jeder Zeit widersprochen, gehandelt und rebelliert."
  },
  {
    id: 5,
    statement: "Geschichte kann objektiv und vollständig sein, ohne explizit Genderperspektiven einzubeziehen.",
    awareAnswer: "disagree",
    explanation: "Geschichte ohne Genderperspektive ist keine neutrale Geschichte – sie ist eine männliche Geschichte, die als Norm gilt. Objektivität entsteht durch mehr Perspektiven, nicht durch weniger."
  },
  {
    id: 6,
    statement: "Frauen der chinesischen Republikzeit waren vor allem Opfer gesellschaftlicher Umstände – weniger aktive Gestalterinnen der Geschichte.",
    awareAnswer: "disagree",
    explanation: "Frauen wie Qiu Jin, Xiang Jingyu oder He Xiangning waren Revolutionärinnen, Journalistinnen, Politikerinnen. Die Reduktion auf 'Opfer' ist eine Form der nachträglichen Entmächtigung."
  },
  {
    id: 7,
    statement: "Ich habe in der Schule deutlich mehr über Männer als über Frauen in der Geschichte gelernt.",
    awareAnswer: "agree",
    explanation: "Das trifft auf die überwiegende Mehrheit zu – und sollte als strukturelles Problem wahrgenommen werden, nicht als Selbstverständlichkeit."
  },
  {
    id: 8,
    statement: "Es ist vertretbar, die Rolle der Frauen in einem Geschichtskurs über China in einem Absatz zusammenzufassen.",
    awareAnswer: "disagree",
    explanation: "Frauen stellen die Hälfte der Bevölkerung. Ihre Geschichte auf einen Absatz zu reduzieren ist keine didaktische Entscheidung – es ist eine Entscheidung, die Hälfte der Geschichte für irrelevant zu erklären."
  },
  {
    id: 9,
    statement: "Die Tatsache, dass diese Ausstellung gezielt über Frauen berichtet, empfinde ich als politisch motiviert.",
    awareAnswer: "disagree",
    explanation: "Ausstellungen über Männer gelten selten als politisch. Wenn das gezielte Sichtbarmachen von Frauen als 'politisch' empfunden wird, zeigt das, wie stark die männliche Perspektive als 'normal' gilt."
  },
  {
    id: 10,
    statement: "Das Konzept der 'traditionellen Frauenrolle' ist vor allem eine natürliche Entwicklung – keine durch Machtverhältnisse aufgezwungene Konstruktion.",
    awareAnswer: "disagree",
    explanation: "Frauenrollen wurden historisch aktiv durch Recht, Religion und soziale Strukturen durchgesetzt und verteidigt. Was 'traditionell' heißt, ist das Ergebnis von Machtverhältnissen – nicht von Natur."
  },
  {
    id: 11,
    statement: "Chinesische Frauen der Republikzeit haben sich vor allem für nationalistische Ziele eingesetzt – Feminismus war für sie sekundär.",
    awareAnswer: "disagree",
    explanation: "Viele Frauen haben Feminismus und Nationalismus verknüpft, nicht priorisiert. Diese Vereinfachung unterschätzt die Komplexität ihrer politischen Identitäten und dient vor allem dazu, den Feminismus kleinzuschreiben."
  },
  {
    id: 12,
    statement: "Frauengeschichte ist ein wichtiges, eigenständiges Forschungsfeld – kein 'Spezialthema' am Rand der echten Geschichte.",
    awareAnswer: "agree",
    explanation: "Frauengeschichte ist die Geschichte der Hälfte der Menschheit. Ohne sie ist die Geschichtswissenschaft grundlegend unvollständig – nicht nur ergänzungsbedürftig."
  },
  {
    id: 13,
    statement: "Auch heute sind Frauen in Geschichtsbüchern und Geschichtsunterricht noch deutlich unterrepräsentiert.",
    awareAnswer: "agree",
    explanation: "Zahlreiche Studien bestätigen dies. Das Wissen darum ist der erste Schritt – das Hinterfragen von Lehrplänen der zweite."
  },
  {
    id: 14,
    statement: "Mein mentales Bild von 'chinesischer Geschichte' ist vor allem von männlichen Protagonisten geprägt.",
    awareAnswer: "agree",
    explanation: "Das ist fast universell so. Zu erkennen, dass das eigene Geschichtsbild einseitig ist, ist keine Niederlage – sondern Voraussetzung für ein vollständigeres Verständnis."
  },
  {
    id: 15,
    statement: "Eine Ausstellung, die gezielt Frauen in den Mittelpunkt stellt, verändert, wie ich über Geschichte denke – oder sollte es zumindest.",
    awareAnswer: "agree",
    explanation: "Wer diese Frage mit 'nein' beantwortet, verweigert sich der Auseinandersetzung – die aber genau das Ziel dieser Ausstellung ist. Kunst und Ausstellungen sind immer auch politisch."
  }
];

const resultLevels = [
  {
    min: 0,
    max: 8,
    label: "Strukturell Unwissend",
    color: "#C41E3A",
    description: "Du hast die grundlegendsten Fragen zur Frauengeschichte und zum Feminismus falsch beantwortet. Das ist das Ergebnis eines Bildungssystems, das Frauengeschichte systematisch marginalisiert hat. Das Wissen, das dir fehlt, ist jetzt verfügbar. Auch für dich."
  },
  {
    min: 9,
    max: 15,
    label: "Oberflächlich Informiert",
    color: "#C41E3A",
    description: "Du weißt, dass Feminismus existiert und dass Frauen unterdrückt wurden. Aber dein Verständnis bleibt politisch harmlos – du erkennst das Problem, ohne seine Mechanismen zu verstehen. Halbwissen schützt vor Mitschuld nicht."
  },
  {
    min: 16,
    max: 22,
    label: "Informiert, aber bequem",
    color: "#B8860B",
    description: "Du hast viele richtige Impulse – aber bequeme Antworten dort, wo es unbequem wird. Das Bewusstsein reicht nicht bis zu den Stellen, wo es wirklich wehtut. Wissen ohne Konsequenz ist Dekoration."
  },
  {
    min: 23,
    max: 27,
    label: "Bewusst, mit Lücken",
    color: "#2E7D32",
    description: "Du verstehst die Strukturen. Aber du zögerst noch bei Thesen, die konkrete Konsequenzen haben. Bewusstsein, das nicht zur Handlung führt, bleibt halbfertig."
  },
  {
    min: 28,
    max: 30,
    label: "Feministisch Durchdacht",
    color: "#1B5E20",
    description: "Du verstehst die strukturellen Dimensionen von Frauengeschichte und Feminismus. Damit stehst du in einer Minderheit. Die Frage ist nicht mehr, ob du es weißt – sondern was du damit machst."
  }
];
