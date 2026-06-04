/* translations.js — UI string dictionary */
const UI = {
  de: {
    // Navigation
    nav_back: "← Übersicht",
    nav_title: "Frauen der chinesischen Republikzeit",
    nav_gallery_link: "Galerie →",

    // Profile page tabs
    tab_biografie: "Biografie",
    tab_zeitleiste: "Zeitleiste",
    tab_galerie: "Galerie",
    tab_quiz: "Quiz",

    // Lightbox (frau.html)
    lb_close: "Schließen",
    lb_image_label: "Bildansicht",

    // Profile page – Steckbrief & quiz
    steckbrief_title: "Steckbrief",
    img_not_available: "Bild nicht verfügbar",
    netz_legend_main: "Hauptperson",
    netz_legend_person: "Person",
    netz_legend_org: "Organisation",
    netz_legend_movement: "Bewegung",
    netz_legend_ref: "Verweis (anderes Profil)",
    quiz_no_questions: "Für diese Person sind noch keine Quizfragen vorhanden.",
    quiz_question_counter: "Frage {n} von {total}",
    quiz_intro_text: "Teste dein Wissen über {name}. Beantworte mindestens 2 von 3 Fragen richtig, um sie in deiner Ausstellung sichtbar zu machen.",
    quiz_already_passed: "Du hast dieses Quiz bereits bestanden. ✓",
    quiz_passed_result: "{richtig} von {total} richtig — Quiz bestanden.",
    quiz_failed_result: "{richtig} von {total} richtig — noch nicht bestanden.",
    quiz_pass_requirement: "Mindestens 2 richtige Antworten zum Bestehen.",
    quiz_part_of_exhibition: "{name} ist nun Teil deiner Ausstellung.",
    quiz_to_exhibition: "Zur Ausstellung →",
    quiz_submit: "Auswerten",
    quiz_retry: "Nochmal versuchen",
    frau_profile_list_prompt: "Wähle ein Profil:",
    frau_title_fallback: "Frauen der chinesischen Republikzeit",

    // Gallery page (galerie3d)
    galerie_eyebrow_rev: "Revolutionärinnen & Aktivistinnen",
    galerie_eyebrow_intel: "Schriftstellerinnen & Intellektuelle",
    galerie_eyebrow_film: "Filmemacherinnen & Schauspielerinnen",
    galerie_title_rev: "Wer formte das neue China?",
    galerie_title_intel: "Wer schrieb die neue Wirklichkeit?",
    galerie_title_film: "Wer prägte das Bild der modernen Frau?",
    galerie_desc_rev: "Mit Waffen, Politik und hartnäckigem Aktivismus erkämpften diese Frauen die Republik — und ein Wahlrecht, das ihnen verweigert wurde.",
    galerie_desc_intel: "Ihre Texte brachen Tabus, ihre Lehrstühle standen auf unerkundetem Terrain. Sie gaben der Moderne eine Sprache — auf Chinesisch.",
    galerie_desc_film: "Auf der Leinwand schufen sie neue Weiblichkeitsbilder — und erlebten dafür Ruhm, Skandal und Verfolgung.",
    galerie_link_memory: "Historisches Gedächtnis",
    galerie_link_quiz: "Quiz starten",
    galerie_link_overview: "Zur Übersicht",
    galerie_scroll_hint: "Scrollen →",
    galerie_outro_eyebrow: "Ende der Galerie · 11 Frauen",
    galerie_outro_title: "Entdecke mehr über diese Frauen.",
    galerie_outro_back: "Zurück zur Übersicht",
    galerie_lb_bekannt: "Bekannt als",
    galerie_lb_to_profile: "Zum Profil →",
    galerie_lb_back: "← Zurück zur Galerie",
    galerie_card_cta: "Großansicht öffnen",
    galerie_intro_eyebrow: "Virtuelle Ausstellung · 11 Frauen · 1912–1949",
    galerie_intro_title: "Ihre Geschichte.",
    galerie_intro_sub: "Elf Frauen der chinesischen Republikzeit — Revolutionärinnen, Schriftstellerinnen, Filmikonen. Sie haben Geschichte geprägt. Wenige kennen ihre Namen.",
    galerie_enter_btn: "Galerie betreten",

    // Quiz page (standalone, quiz.html / app.js)
    quiz_page_eyebrow: "Feminismus · Frauengeschichte · Bewusstsein",
    quiz_page_headline: "Wie aufgeklärt bist du wirklich?",
    quiz_page_lead: "15 Thesen. Es gibt richtige und falsche Antworten — dieser Test misst, wie bewusst du mit Feminismus und Frauengeschichte umgehst.",
    quiz_page_body: "Dieser Test misst, wie bewusst du mit Feminismus und Frauengeschichte umgehst. Die Grundlage bildet die Geschichte der Frauen in der chinesischen Republikzeit (1912–1949) — einer Ära, die du wahrscheinlich nicht so gut kennst, wie du denkst.",
    quiz_page_start_btn: "Test beginnen →",
    quiz_page_footnote: "Anonym · Keine Daten werden gespeichert · ca. 4 Minuten",
    quiz_answer_agree: "Stimme zu",
    quiz_answer_neutral: "Neutral",
    quiz_answer_disagree: "Stimme nicht zu",
    quiz_result_eyebrow: "Dein Ergebnis",
    quiz_result_min_label: "Nicht bewusst",
    quiz_result_max_label: "Vollständig bewusst",
    quiz_result_discover_btn: "Frauen entdecken →",
    quiz_result_retry_btn: "Nochmal versuchen",
    quiz_breakdown_heading: "Deine Antworten im Detail",
    quiz_verdict_correct: "✓ Richtig",
    quiz_verdict_neutral: "○ Neutral",
    quiz_verdict_wrong: "✗ Falsch",
    quiz_result_score: "{richtig} / {total} richtig",

    // Network page (netzwerk.html / netzwerk.js)
    netzwerk_eyebrow: "Historisches Gedächtnis · 11 Frauen · 1912–1949",
    netzwerk_title: "Wer wird erinnert?",
    netzwerk_desc: "Wie diese Frauen beschrieben werden — ein Vergleich.",
    netzwerk_bekannt_section: "Bekannt als …",
    netzwerk_bekannt_section2: "In Lexika, Enzyklopädien und Wikipedia-Einleitungen werden diese Frauen häufig zuerst durch ihre Beziehung zu einem Mann definiert. Was sie selbst geleistet haben, folgt — wenn überhaupt — danach.",
    netzwerk_toggle_en: "Englische Wikipedia",
    netzwerk_toggle_zh: "Chinesische Wikipedia",
    netzwerk_legend_women: "Frauen",
    netzwerk_legend_men: "Männer der Ära (Kontrastmaßstab)",
    netzwerk_loading: "Daten werden geladen…",
    netzwerk_error: "Daten konnten nicht geladen werden.",
    netzwerk_fetch_error: "Wikipedia-Daten konnten nicht abgerufen werden.",
    netzwerk_chart_title: "Wikipedia-Seitenaufrufe",
    netzwerk_chart_intro_en: "Monatliche Seitenaufrufe in der englischsprachigen Wikipedia (12 Monate).",
    netzwerk_chart_intro_zh: "Monatliche Seitenaufrufe in der chinesischsprachigen Wikipedia (12 Monate).",
    netzwerk_source_en: "Quelle: Wikimedia REST API · Englische Wikipedia",
    netzwerk_source_zh: "Quelle: Wikimedia REST API · Chinesische Wikipedia",

    // Landing page (index.html / welle.js)
    index_discover_btn: "↓ Entdecken",
    index_eyebrow: 'Digitale Begleitausstellung · SoSe 2026',
    index_subline: "Sichtbarmachung weiblicher Geschichte 1912–1949",
    index_intro: "Diese Website entstand im Rahmen des Seminars \„Neue Frauen\" und \„Moderne Mädchen\": Weiblichkeitsentwürfe in der chinesischen Republikzeit. Sie begleitet eine Plakatausstellung, die Frauen vorstellt, die Geschichte geprägt haben — und die dennoch weitgehend unbekannt sind.",
    index_bg_title: "Hintergrund",
    index_bg_body_1: "Das Seminar \„Neue Frauen\" und \„Moderne Mädchen\" untersucht, wie in der chinesischen Republikzeit (1912–1949) neue Weiblichkeitsbilder entstanden, verhandelt und umkämpft wurden. Im Mittelpunkt stehen Frauen, die als Revolutionärinnen, Schriftstellerinnen, Aktivistinnen und Medienschaffenden aktiv an der Gestaltung dieser Ära beteiligt waren.",
    index_bg_body_2: "Die Plakatausstellung macht diese Frauen sichtbar — buchstäblich. Jedes Plakat widmet sich einer Person und ist mit einem QR-Code versehen, der zu diesem digitalen Begleitmaterial führt: Biografien, interaktive Zeitleisten, historische Quellen und die Plakate in einer digitalen Galerie.",
    index_bg_body_3: "Wer sind diese Frauen? Warum kennen wir sie nicht? Was sagt das über unsere Geschichtsschreibung? Diese Fragen stehen im Zentrum — und sie sind nicht nur historisch.",
    index_context_label: "Kontext",
    index_context_key_seminar: "Seminar",
    index_context_val_seminar: "\„Neue Frauen\" und \„Moderne Mädchen\": Weiblichkeitsentwürfe in der chinesischen Republikzeit",
    index_context_key_zeitraum: "Zeitraum",
    index_context_val_zeitraum: "Chinesische Republikzeit, 1912–1949",
    index_context_key_ziel: "Ziel",
    index_context_val_ziel: "Frauen sichtbar machen, die Geschichte geprägt haben",
    index_context_key_format: "Format",
    index_context_val_format: "Plakatausstellung mit digitaler Begleitwebsite",
    index_discover_title: "Entdecken",
    index_discover_sub: "Wähle einen Bereich",
    index_gallery_label: "Virtuelle Ausstellung · 11 Porträts",
    index_gallery_title: "Die Galerie betreten",
    index_gallery_desc: "Elf Frauen. Revolutionärinnen, Intellektuelle, Filmikonen. Scrolle durch die Ausstellung und öffne jedes Porträt.",
    index_gallery_cta: "Galerie betreten →",
    index_network_label: "Historisches Gedächtnis",
    index_network_title: "Wer wird erinnert?",
    index_network_desc: "Bisherige Darstellung, Wikipedia-Präsenz — und ein Vergleich mit männlichen Zeitgenossen.",
    index_network_cta: "Gedächtnis erkunden →",
    index_quellen_label: "Primärquellen",
    index_quellen_title: "Stimmen aus der Republikzeit",
    index_quellen_desc: "Zitate und Texte im Licht feministischer Theorie — Butler, Mulvey, Cixous.",
    index_quellen_cta: "Quellen lesen →",
    index_quiz_label: "Das Quiz",
    index_quiz_title: "Wie aufgeklärt bist du wirklich?",
    index_quiz_desc: "15 Thesen zu Feminismus und Frauengeschichte.",
    index_quiz_cta: "Quiz starten →",
    index_welle_title: "Deine Ausstellung",
    index_welle_desc: "Jede Frau, über die du das Quiz bestanden hast, erscheint hier sichtbar.",
    welle_counter: "{n} von 11 Frauen sichtbar gemacht",
    welle_hint_zero: "Öffne ein Profil und bestehe das Quiz, um eine Frau sichtbar zu machen.",
    welle_hint_all: "Hinter diesen 11 Namen stehen hunderte weitere, die niemand aufgeschrieben hat.",

    // Sources page (quellen.html)
    quellen_hero_eyebrow: "Primärquellen · Chinesische Republikzeit 1912–1949",
    quellen_hero_title: "Stimmen",
    quellen_hero_sub: "Texte, Zitate und filmische Gesten, in denen Frauen der Republikzeit ihre eigene Wirklichkeit beschrieben. Vier Themen — gelesen im Licht feministischer Theorie.",
    quellen_nav_koerper: "Körper",
    quellen_nav_schreiben: "Schreiben",
    quellen_nav_revolution: "Revolution",
    quellen_nav_blick: "Blick",
    quellen_chip_1: "01 Körper &amp; Begehren",
    quellen_chip_2: "02 Schreiben als Widerstand",
    quellen_chip_3: "03 Revolution &amp; Emanzipation",
    quellen_chip_4: "04 Bild, Blick &amp; Leinwand",
    quellen_title_01: "Körper &amp; Begehren",
    quellen_title_02: "Schreiben als Widerstand",
    quellen_title_03: "Revolution &amp; Emanzipation",
    quellen_title_04: "Bild, Blick &amp; Leinwand",
    quellen_analysis_label: "Theoretischer Kontext",
    quellen_de_label: "Deutsche Übertragung für diese Ausstellung",
    quellen_classic_label: "Klassische Übertragung, vielfach belegt",
    quellen_film_label: "Kein Textzitat überliefert",
    quellen_outro_eyebrow: "Primärquellen · 11 Frauen · 1912–1949",
    quellen_outro_title: "Diese Texte warten auf weitere Lektüren.",
    quellen_outro_gallery: "Virtuelle Galerie",
    quellen_outro_memory: "Historisches Gedächtnis",
    quellen_outro_back: "Zurück zur Übersicht",

    // Theory sections (Theme introductions)
    quellen_theory_01: "Simone de Beauvoir schrieb 1949: „Man wird nicht als Frau geboren, man wird dazu gemacht.” In der chinesischen Literatur der 1920er Jahre formulierten Schriftstellerinnen diesen Gedanken früher und radikaler als die westliche Theorie — indem sie weibliches Begehren, Schmerz und Körperlichkeit explizit in die Ich-Perspektive setzten. Hélène Cixous' Konzept der <em>écriture féminine</em> — des Schreibens, das den weiblichen Körper in Sprache überführt — lässt sich an diesen Texten exemplarisch studieren.",

    quellen_theory_02: "„Wer schreibt, existiert nicht bloß — er widersteht.” Für Frauen der Republikzeit war das Schreiben kein privates Vergnügen, sondern ein öffentlicher Einspruch: gegen konfuzianische Schweigegebote, gegen männlich dominierte Literaturkanons, gegen Erwartungen an die „tugendhafte Frau”. Gayatri Spivaks Frage „Can the Subaltern Speak?” erhält hier eine historische Antwort: Diese Frauen sprachen — auf Chinesisch, in Zeitschriften, auf Podien. Und sie wurden dafür verfolgt, verbannt oder exiliert.",

    quellen_theory_03: "Die chinesische Frauenbewegung der Republikzeit stand vor einem Dilemma: Sie musste gleichzeitig die nationale Frage (Imperialismus, Kolonialismus), die Klassenfrage (Kapitalismus, Feudalismus) und die Geschlechterfrage verhandeln. Kimberlé Crenshaws Konzept der <em>Intersektionalität</em> — dass Unterdrückungsformen sich überkreuzen und verstärken — beschreibt rückwirkend eine Realität, die Frauen wie Xiang Jingyu und Qiu Jin bereits erlebten und theoretisierten. Ihre Texte zeigen: Emanzipation war für sie nie nur eine Frage des Geschlechts.",

    quellen_theory_04: "Laura Mulveys bahnbrechender Essay „Visual Pleasure and Narrative Cinema” (1975) analysierte, wie klassisches Kino den Blick strukturell als männlich konstruiert: die Frau ist Objekt des Schauens, nicht Subjekt. Für das Shanghaier Stummfilmkino der 1920er und 30er Jahre gilt das nur bedingt: Hier produzierten Schauspielerinnen wie Ruan Lingyu und Hu Die eine eigene Form von Stardom — eine Präsenz, die den Blick anzog und gleichzeitig zu kontrollieren versuchte. Und mit Xie Caizhen stand erstmals eine Frau hinter der Kamera.",

    // Analysis texts for each quote
    quellen_analysis_ding_ling_sophie: "Das Tagebuchformat ist bei Ding Ling kein literarisches Ornament, sondern ein Akt der Selbstermächtigung: Sophies Ich spricht über Begehren, Enttäuschung und körperliche Sehnsucht in einer Direktheit, die der chinesischen Prosa bis dahin fremd war. In der Sprache Cixous' schreibt Sophie sich selbst in die Existenz — gegen eine Kultur, die weibliche Innenwelten als unsagbar betrachtete. Die Selbstbeschimpfung („schlechte Frau”) zitiert die patriarchalische Norm nur, um sie zu untergraben.",

    quellen_analysis_xiao_hong: "Xiao Hongs Prosa verweigert die Idealisierung des weiblichen Körpers. Statt Schönheit zeigt sie Geburt, Erschöpfung und Gewalt — und macht den Körper damit zu einem politischen Terrain. Judith Butlers Frage, wessen Körper als „materie-würdig” gilt, stellt sich hier in historischer Schärfe: Die Bäuerinnen in <em>生死场</em> existieren in einem System, das ihren Körper verbraucht und zugleich unsichtbar macht. Xiao Hongs Sprache ist der Gegenentwurf dazu.",

    quellen_analysis_ding_ling_yanan: "Bemerkenswert an diesem Text ist sein Kontext: Ding Ling schrieb ihn nicht unter dem bürgerlichen Regime, sondern innerhalb der kommunistischen Basis in Yan'an — also in einer Gesellschaft, die Frauenemanzipation offiziell auf ihre Fahne geschrieben hatte. Damit benennt sie, was Mary Wollstonecraft zwei Jahrhunderte früher für Europa formulierte: dass politische Revolution die Geschlechterverhältnisse nicht automatisch transformiert. Der Text wurde von der KPCh-Führung scharf kritisiert — ein Beleg dafür, dass feministische Kritik auch innerhalb der Linken als subversiv galt.",

    quellen_analysis_eileen_chang: "Was oberflächlich wie Eitelkeit klingt, ist bei Eileen Chang eine präzise Analyse weiblicher Handlungsfenster. Für Frauen der Republikzeit waren Ruhm und ökonomische Unabhängigkeit zeitlich eng begrenzt — durch Heirat, Krankheit, politische Verfolgung. Chang, die mit 23 Jahren ihren ersten Bestseller veröffentlichte, verstand Schreiben als einzige Form von Souveränität, die Frauen in der chinesischen Gesellschaft ergreifen konnten. Im Sinne Judith Butlers lässt sich die frühe Publikation als performativer Akt lesen: Chang schreibt sich in eine Gegenwart, bevor sie ihr genommen wird.",

    quellen_analysis_bing_xin: "Bing Xins „Liebes-Philosophie” (爱的哲学) wird oft als apolitisch missverstanden. Doch in einer Zeit, in der Frauen zwischen Revolutionismus und konfuzianischer Tugend zerrissen wurden, war die Behauptung einer weiblichen Stimme des Mitgefühls und der Fürsorge ein implizit politischer Akt. Carol Gilligans feministisches Konzept der <em>Care Ethics</em> — einer Ethik, die aus weiblicher Erfahrung entsteht — bietet einen Rahmen, Bing Xins Werk neu zu lesen: nicht als sentimentalen Rückzug, sondern als Gegenentwurf zu einer Vernunft, die Fürsorge abwertet.",

    quellen_analysis_qiu_jin: "Qiu Jin schrieb dieses Ci-Gedicht in der klassischen Form der <em>Manjianghong</em> — einer Form, die durch Yue Feis patriotisches Gedicht aus dem 12. Jahrhundert für männliche Heldenmut stand. Diese Wahl ist hochgradig performativ im Sinne Butlers: Qiu Jin eignet sich ein männlich kodiertes Genre an und schreibt es mit weiblichem Subjekt um. Das Schwert an der Wand — das ungezogene Schwert — steht für eine Kraft, die noch wartet: die Frau als latente Revolutionärin. Qiu Jin trug tatsächlich Männerkleidung und übte den Umgang mit Waffen.",

    quellen_analysis_xiang_jingyu: "Xiang Jingyus Argumentation antizipiert die marxistisch-feministische Debatte, die in der westlichen Theorie erst in den 1960er und 70er Jahren explodiert. Ihr Text steht in der Spannung zwischen zwei Positionen: dem sozialistischen Argument, dass Geschlechterunterdrückung sich nach der Klassenrevolution von selbst löst, und dem feministischen Einspruch, dass Patriarchat eine eigenständige Unterdrückungsform darstellt. Ding Lings Yan'an-Essay von 1942 würde zeigen, dass Xiang Jingyus Warnung berechtigt war: auch die Revolution reproduzierte das Patriarchat.",

    quellen_analysis_he_xiangning: "He Xiangnigs Position steht für eine Denkfigur, die in der postkolonialen Theorie kontrovers diskutiert wird: die Unterordnung der Geschlechterfrage unter die nationale Frage. Frantz Fanon und später Spivak haben gezeigt, wie diese Denkfigur Frauen systematisch vertröstete — „erst die Revolution, dann eure Rechte.” Und doch wäre es ahistorisch, He Xiangnigs Position nur als Selbstverleugnung zu lesen: In einer Situation kolonialer Aggression war nationale Souveränität auch eine Voraussetzung für jeden weiteren Kampf.",

    quellen_analysis_ruan_lingyu: "Vier Zeichen — und eine ganze Gesellschaftsordnung steckt darin. Ruan Lingyus letzter Satz benennt, was die Theorie des \„Male Gaze\" (Mulvey) für das Kino beschreibt, in seiner gesellschaftlichen Verallgemeinerung: den öffentlichen Blick als Kontroll- und Bestrafungsmechanismus gegenüber Frauen. Ihr Körper auf der Leinwand war Objekt der Bewunderung; ihr Privatleben wurde zum Objekt der Verurteilung. Michel Foucaults Begriff der \„Disziplinierungsgesellschaft\" — in der Norm durch Sichtbarkeit und Beobachtung erzwungen wird — lässt sich an ihrem Schicksal wie an einem historischen Lehrstück lesen.",

    quellen_analysis_xie_caizhen: "Xie Caizhen ist in zweifacher Hinsicht bedeutsam: Hinter der Kamera bricht sie mit dem männlichen Produktionsmonopol; vor der Kamera stellt sie eine arbeitende Frau dar, deren Körper nicht ästhetisiert, sondern in seiner sozialen Verletzlichkeit gezeigt wird. E. Ann Kaplan, die Mulveys Argument auf weibliche Regisseurinnen angewendet hat, spricht von einer möglichen „Umkehrung des Blicks” — einem weiblichen Blick, der andere Körper, andere Schicksale, andere Geschichten in den Fokus nimmt. Xie Caizhen tat genau das — 50 Jahre vor dieser Theorie.",

    quellen_analysis_hu_die: "Hu Dies Aussage klingt bescheiden, ist es aber nicht. Sie fordert das Recht auf Innerlichkeit — für eine Frau, deren Beruf es war, Innerlichkeit vorzuspielen. Erving Goffmans Theorie der sozialen Rolle und die feministischen Erweiterungen durch Joan Rivière (Weiblichkeit als Maske) lassen sich hier anwenden: Hu Die navigiert zwischen der öffentlichen Rolle des Stars, der gesellschaftlichen Erwartung an die tugendhafte Frau und ihrem privaten Selbst. Ihr Überleben über vier politische Systeme hinweg war selbst eine Meisterleistung dieser Navigation.",

    // Film description for Xie Caizhen
    quellen_film_desc_xie: "Xie Caizhens einziger bekannter Film erzählt die Geschichte eines jungen Mädchens aus der Arbeiterschicht, das Armut, Verlust und gesellschaftliche Ausgrenzung übersteht. Xie führte Regie, spielte die Hauptrolle und produzierte den Film mit — als einzige Frau in allen Schlüsselpositionen.",

    // Direct quotes (German versions from HTML)
    quellen_quote_ding_ling_sophie_de: "„Ich gebe zu, dass ich eine schlechte Frau bin — aber ich will nur aufschreiben, was ich fühle.”",

    quellen_quote_xiao_hong_de: "„Der Körper der Frau ist ein Ort des Leidens — und zugleich der Ort, an dem das Leben sich fortsetzt.”",

    quellen_quote_ding_ling_yanan_de: "„Frauen … bleibt sie unverheiratet, gilt sie als unmoralisch; heiratet sie, wird sie zum Anhängsel ihres Mannes; lässt sie sich scheiden, ist sie eine ehrlose Person.”",

    quellen_quote_eileen_chang_de: "„Berühmt werden muss man früh. Kommt es zu spät, ist selbst die Freude nicht mehr so vollständig.”",

    quellen_quote_bing_xin_de: "„Liebe links, Zuneigung rechts — sie begleiten den Weg des Lebens auf beiden Seiten, pflanzen Samen zu jeder Zeit, lassen Blumen zu jeder Zeit erblühen.”",

    quellen_quote_qiu_jin_de: "„Sagt nicht, Frauen seien kein heroisches Stoff — Nacht für Nacht singt das Drachenschwert an der Wand.”",

    quellen_quote_xiang_jingyu_de: "„Frauenbefreiung ist keine reine Frauenrechtsfrage — sie ist Teil der Befreiung der gesamten Gesellschaft.”",

    quellen_quote_he_xiangning_de: "„Wenn Frauen wirklich befreit werden sollen, muss zuerst die Nation befreit werden.”",

    quellen_quote_ruan_lingyu_de: "„Gerüchte sind eine furchtbare Sache.”",

    quellen_quote_hu_die_de: "„Ich bin nur eine Schauspielerin — aber auch eine Schauspielerin ist ein Mensch, mit eigener Freude, eigenem Zorn, eigenem Kummer.”",

    // Work-in-progress banner
    wip_banner: "Work in Progress — diese Website wird laufend erweitert und überarbeitet.",
  },

  en: {
    // Navigation
    nav_back: '<span class="nav-arrow">←</span> Overview',
    nav_title: "Women of the Chinese Republic",
    nav_gallery_link: 'Gallery <span class="nav-arrow">→</span>',

    // Profile page tabs
    tab_biografie: "Biography",
    tab_zeitleiste: "Timeline",
    tab_galerie: "Gallery",
    tab_quiz: "Quiz",

    // Lightbox (frau.html)
    lb_close: "Close",
    lb_image_label: "Image view",

    // Profile page – Steckbrief & quiz
    steckbrief_title: "Profile",
    img_not_available: "Image not available",
    netz_legend_main: "Main person",
    netz_legend_person: "Person",
    netz_legend_org: "Organisation",
    netz_legend_movement: "Movement",
    netz_legend_ref: "Reference (other profile)",
    quiz_no_questions: "No quiz questions are available for this person yet.",
    quiz_question_counter: "Question {n} of {total}",
    quiz_intro_text: "Test your knowledge of {name}. Answer at least 2 of 3 questions correctly to make her visible in your exhibition.",
    quiz_already_passed: "You have already completed this quiz. ✓",
    quiz_passed_result: "{richtig} of {total} correct — quiz passed.",
    quiz_failed_result: "{richtig} of {total} correct — not yet passed.",
    quiz_pass_requirement: "At least 2 correct answers to pass.",
    quiz_part_of_exhibition: "{name} is now part of your exhibition.",
    quiz_to_exhibition: "To the Exhibition →",
    quiz_submit: "Evaluate",
    quiz_retry: "Try again",
    frau_profile_list_prompt: "Choose a profile:",
    frau_title_fallback: "Women of the Chinese Republic",

    // Gallery page (galerie3d)
    galerie_eyebrow_rev: "Revolutionaries & Activists",
    galerie_eyebrow_intel: "Writers & Intellectuals",
    galerie_eyebrow_film: "Filmmakers & Actresses",
    galerie_title_rev: "Who shaped modern China?",
    galerie_title_intel: "Who wrote the new reality?",
    galerie_title_film: "Who defined the image of the modern woman?",
    galerie_desc_rev: "With weapons, politics, and relentless activism, these women fought for the Republic — and for voting rights they were denied.",
    galerie_desc_intel: "Their texts broke taboos, their academic positions stood on uncharted ground. They gave modernity a voice — in Chinese.",
    galerie_desc_film: "On screen they created new images of womanhood — and experienced fame, scandal, and persecution for it.",
    galerie_link_memory: "Historical Memory",
    galerie_link_quiz: "Start Quiz",
    galerie_link_overview: "To Overview",
    galerie_scroll_hint: "Scroll →",
    galerie_outro_eyebrow: "End of Gallery · 11 Women",
    galerie_outro_title: "Discover more about these women.",
    galerie_outro_back: "Back to Overview",
    galerie_lb_bekannt: "Known as",
    galerie_lb_to_profile: "To Profile →",
    galerie_lb_back: "← Back to Gallery",
    galerie_card_cta: "Open full view",
    galerie_intro_eyebrow: "Virtual Exhibition · 11 Portraits · 1912–1949",
    galerie_intro_title: "Their Story.",
    galerie_intro_sub: "Eleven women of the Chinese Republic — revolutionaries, intellectuals, film icons. They shaped history. Few know their names.",
    galerie_enter_btn: "Enter Gallery",

    // Quiz page (standalone, quiz.html / app.js)
    quiz_page_eyebrow: "Feminism · Women's History · Consciousness",
    quiz_page_headline: "How enlightened are you really?",
    quiz_page_lead: "15 statements. There are right and wrong answers — this test measures how consciously you engage with feminism and women's history.",
    quiz_page_body: "This test measures how consciously you engage with feminism and women's history. It is grounded in the history of women in the Chinese Republic (1912–1949) — an era you probably don't know as well as you think.",
    quiz_page_start_btn: "Start Test →",
    quiz_page_footnote: "Anonymous · No data is stored · approx. 4 minutes",
    quiz_answer_agree: "Agree",
    quiz_answer_neutral: "Neutral",
    quiz_answer_disagree: "Disagree",
    quiz_result_eyebrow: "Your Result",
    quiz_result_min_label: "Not conscious",
    quiz_result_max_label: "Fully conscious",
    quiz_result_discover_btn: "Discover Women →",
    quiz_result_retry_btn: "Try Again",
    quiz_breakdown_heading: "Your Answers in Detail",
    quiz_verdict_correct: "✓ Correct",
    quiz_verdict_neutral: "○ Neutral",
    quiz_verdict_wrong: "✗ Wrong",
    quiz_result_score: "{richtig} / {total} correct",

    // Network page (netzwerk.html / netzwerk.js)
    netzwerk_eyebrow: "Historical Memory · 11 Women · 1912–1949",
    netzwerk_title: "Who is remembered?",
    netzwerk_desc: "How these women are described — a comparison.",
    netzwerk_bekannt_section: "Known as …",
    netzwerk_bekannt_section2: "In reference works, encyclopedias, and Wikipedia leads, these women are frequently defined primarily by their ties to a man. What they achieved themselves only follows later—if it is mentioned at all.",
    netzwerk_toggle_en: "English Wikipedia",
    netzwerk_toggle_zh: "Chinese Wikipedia",
    netzwerk_legend_women: "Women",
    netzwerk_legend_men: "Men of the Era (contrast baseline)",
    netzwerk_loading: "Loading data…",
    netzwerk_error: "Data could not be loaded.",
    netzwerk_fetch_error: "Wikipedia data could not be retrieved.",
    netzwerk_chart_title: "Wikipedia Page Views",
    netzwerk_chart_intro_en: "Monthly page views on English Wikipedia (12 months).",
    netzwerk_chart_intro_zh: "Monthly page views on Chinese Wikipedia (12 months).",
    netzwerk_source_en: "Source: Wikimedia REST API · English Wikipedia",
    netzwerk_source_zh: "Source: Wikimedia REST API · Chinese Wikipedia",

    // Landing page (index.html / welle.js)
    index_discover_btn: "↓ Discover",
    index_eyebrow: "Digital Exhibition Companion · Summer 2026",
    index_subline: "Making Visible the History of Women 1912–1949",
    index_intro: "This website was created as part of the seminar <em>\"New Women\" and \"Modern Girls\": Constructions of Womanhood in the Chinese Republic</em>. It accompanies a poster exhibition introducing women who shaped history — yet remain largely unknown.",
    index_bg_title: "Background",
    index_bg_body_1: "The seminar <em>\"New Women\"and \"Modern Girls\"</em> examines how new images of womanhood emerged, were negotiated, and contested in the Chinese Republic (1912–1949). Its focus is on women who actively participated in shaping this era as revolutionaries, writers, activists, and media makers.",
    index_bg_body_2: "The poster exhibition makes these women visible — literally. Each poster is dedicated to a person and features a QR code linking to this digital companion material: biographies, interactive timelines, historical sources, and the posters in a digital gallery.",
    index_bg_body_3: "Who are these women? Why don't we know them? What does that tell us about how we write history? These questions stand at the center — and they are not merely historical.",
    index_context_label: "Context",
    index_context_key_seminar: "Seminar",
    index_context_val_seminar: "\"New Women\" and \"Modern Girls\": Constructions of Womanhood in the Chinese Republic",
    index_context_key_zeitraum: "Period",
    index_context_val_zeitraum: "Chinese Republic, 1912–1949",
    index_context_key_ziel: "Goal",
    index_context_val_ziel: "Make visible the women who shaped history",
    index_context_key_format: "Format",
    index_context_val_format: "Poster exhibition with digital companion website",
    index_discover_title: "Discover",
    index_discover_sub: "Choose an area",
    index_gallery_label: "Virtual Exhibition · 11 Portraits",
    index_gallery_title: "Enter the Gallery",
    index_gallery_desc: "Eleven women. Revolutionaries, intellectuals, film icons. Scroll through the exhibition and open each portrait.",
    index_gallery_cta: "Enter Gallery →",
    index_network_label: "Historical Memory",
    index_network_title: "Who is remembered?",
    index_network_desc: "Previous representations, Wikipedia presence — and a comparison with male contemporaries.",
    index_network_cta: "Explore Memory →",
    index_quellen_label: "Primary Sources",
    index_quellen_title: "Voices from the Republic",
    index_quellen_desc: "Quotes and texts read through feminist theory — Butler, Mulvey, Cixous.",
    index_quellen_cta: "Read Sources →",
    index_quiz_label: "The Quiz",
    index_quiz_title: "How enlightened are you really?",
    index_quiz_desc: "15 statements on feminism and women's history.",
    index_quiz_cta: "Start Quiz →",
    index_welle_title: "Your Exhibition",
    index_welle_desc: "Every woman whose quiz you pass appears here, made visible.",
    welle_counter: "{n} of 11 women made visible",
    welle_hint_zero: "Open a profile and pass the quiz to make a woman visible.",
    welle_hint_all: "Behind these 11 names stand hundreds of others whom no one recorded.",

    // Sources page (quellen.html)
    quellen_hero_eyebrow: "Primary Sources · Chinese Republic 1912–1949",
    quellen_hero_title: "Voices",
    quellen_hero_sub: "Texts, quotations, and cinematic gestures in which women of the Republic described their own reality. Four themes — read in the light of feminist theory.",
    quellen_nav_koerper: "Body",
    quellen_nav_schreiben: "Writing",
    quellen_nav_revolution: "Revolution",
    quellen_nav_blick: "Gaze",
    quellen_chip_1: "01 Body &amp; Desire",
    quellen_chip_2: "02 Writing as Resistance",
    quellen_chip_3: "03 Revolution &amp; Emancipation",
    quellen_chip_4: "04 Image, Gaze &amp; Screen",
    quellen_title_01: "Body &amp; Desire",
    quellen_title_02: "Writing as Resistance",
    quellen_title_03: "Revolution &amp; Emancipation",
    quellen_title_04: "Image, Gaze &amp; Screen",
    quellen_analysis_label: "Theoretical Context",
    quellen_de_label: "German translation for this exhibition",
    quellen_classic_label: "Classical translation, widely documented",
    quellen_film_label: "No text quotation transmitted",
    quellen_outro_eyebrow: "Primary Sources · 11 Women · 1912–1949",
    quellen_outro_title: "These texts await further reading.",
    quellen_outro_gallery: "Virtual Gallery",
    quellen_outro_memory: "Historical Memory",
    quellen_outro_back: "Back to Overview",

    // Theory sections (Theme introductions)
    quellen_theory_01: "Simone de Beauvoir wrote in 1949: \"One is not born, but rather becomes, a woman.\" In Chinese literature of the 1920s, women writers formulated this idea earlier and more radically than Western theory — by placing female desire, pain, and embodiment explicitly in the first-person perspective. Hélène Cixous' concept of <em>écriture féminine</em> — writing that transcribes the female body into language — can be studied exemplarily in these texts.",

    quellen_theory_02: "\"Who writes exists not merely — they resist.\" For women of the Republic, writing was not a private pleasure but a public objection: against Confucian silencing, against male-dominated literary canons, against expectations of the \"virtuous woman.\" Gayatri Spivak's question \"Can the Subaltern Speak?\" finds a historical answer here: these women spoke — in Chinese, in magazines, on podiums. And they were persecuted, banished, or exiled for it.",

    quellen_theory_03: "The Chinese women's movement of the Republican era faced a dilemma: it had to simultaneously negotiate the national question (imperialism, colonialism), the class question (capitalism, feudalism), and the gender question. Kimberlé Crenshaw's concept of <em>intersectionality</em> — that forms of oppression interlock and reinforce each other — retrospectively describes a reality that women like Xiang Jingyu and Qiu Jin already experienced and theorized. Their texts show: for them, emancipation was never merely a question of gender.",

    quellen_theory_04: "Laura Mulvey's groundbreaking essay \"Visual Pleasure and Narrative Cinema\" (1975) analyzed how classical cinema structurally constructs the gaze as masculine: the woman is an object of looking, not a subject. For Shanghai silent cinema of the 1920s and 30s this holds only partially: here actresses like Ruan Lingyu and Hu Die produced their own form of stardom — a presence that attracted the gaze while simultaneously attempting to control it. And with Xie Caizhen, for the first time, a woman stood behind the camera.",

    // Analysis texts for each quote (English translations)
    quellen_analysis_ding_ling_sophie: "The diary form in Ding Ling's work is not a literary ornament but an act of self-empowerment: Sophie's \"I\" speaks about desire, disappointment, and bodily longing with a directness foreign to Chinese prose up to that point. In Cixous' language, Sophie writes herself into existence — against a culture that regarded female interiority as unspeakable. The self-condemnation (\"bad woman\") merely cites the patriarchal norm in order to undermine it.",

    quellen_analysis_xiao_hong: "Xiao Hong's prose refuses the idealization of the female body. Instead of beauty, she shows birth, exhaustion, and violence — and thus transforms the body into political terrain. Judith Butler's question of whose body counts as \"livable\" becomes historically acute here: the peasant women in <em>生死场</em> exist in a system that exhausts their bodies while rendering them invisible. Xiao Hong's language is the counterargument to this.",

    quellen_analysis_ding_ling_yanan: "What is remarkable about this text is its context: Ding Ling wrote it not under bourgeois rule but within the communist base in Yan'an — in a society that officially made women's emancipation its banner. By doing so, she names what Mary Wollstonecraft articulated two centuries earlier for Europe: that political revolution does not automatically transform gender relations. The CCP leadership sharply criticized this text — evidence that feminist critique was viewed as subversive even within the Left.",

    quellen_analysis_eileen_chang: "What superficially sounds like vanity is in Eileen Chang a precise analysis of women's windows of agency. For women of the Republic, fame and economic independence were strictly time-limited — by marriage, illness, political persecution. Chang, who published her first bestseller at 23, understood writing as the only form of sovereignty women could seize in Chinese society. In Butler's terms, early publication can be read as a performative act: Chang writes herself into a present before it is taken from her.",

    quellen_analysis_bing_xin: "Bing Xin's \"philosophy of love\" (爱的哲学) is often misunderstood as apolitical. Yet in a time when women were torn between revolution and Confucian virtue, the assertion of a female voice of compassion and care was an implicitly political act. Carol Gilligan's feminist concept of <em>care ethics</em> — an ethics arising from female experience — provides a framework for rereading Bing Xin's work: not as sentimental retreat, but as a counterargument to a reason that devalues care.",

    quellen_analysis_qiu_jin: "Qiu Jin wrote this ci poem in the classical form of <em>Manjianghong</em> — a form established by Yue Fei's patriotic poem from the 12th century as a form of masculine heroism. This choice is highly performative in Butler's sense: Qiu Jin appropriates a masculine-coded genre and rewrites it with a female subject. The sword on the wall — the undrawn sword — stands for a force still waiting: woman as latent revolutionary. Qiu Jin actually wore men's clothing and practiced weaponry.",

    quellen_analysis_xiang_jingyu: "Xiang Jingyu's argument anticipates the Marxist-feminist debate that would not explode in Western theory until the 1960s and 70s. Her text stands in tension between two positions: the socialist argument that gender oppression resolves itself after class revolution, and the feminist objection that patriarchy constitutes an autonomous form of oppression. Ding Ling's 1942 Yan'an essay would demonstrate that Xiang Jingyu's warning was justified: the revolution too reproduced patriarchy.",

    quellen_analysis_he_xiangning: "He Xiangning's position stands for a way of thinking contested in postcolonial theory: the subordination of the gender question to the national question. Frantz Fanon and later Spivak showed how this logic systematically deferred women's demands — \"first the revolution, then your rights.\" Yet it would be ahistorical to read He Xiangning's position as mere self-denial: in a situation of colonial aggression, national sovereignty was also a precondition for any further struggle.",

    quellen_analysis_ruan_lingyu: "Four characters — and an entire social order is contained within them. Ruan Lingyu's final words articulate what theory of the \"male gaze\" (Mulvey) describes for cinema, in its broader societal generalization: public looking as a mechanism of control and punishment toward women. Her body on screen was an object of admiration; her private life became an object of judgment. Michel Foucault's concept of \"disciplinary society\" — in which norms are enforced through visibility and observation — can be read in her fate like a historical lesson.",

    quellen_analysis_xie_caizhen: "Xie Caizhen is significant in two respects: behind the camera she breaks the male production monopoly; in front of the camera she depicts a working woman whose body is not aestheticized but shown in its social vulnerability. E. Ann Kaplan, who applied Mulvey's argument to female filmmakers, speaks of a possible \"reversal of the gaze\" — a female gaze that focuses on different bodies, different fates, different stories. Xie Caizhen did exactly that — 50 years before this theory existed.",

    quellen_analysis_hu_die: "Hu Die's statement sounds modest, but it is not. It asserts the right to interiority — for a woman whose profession was to perform interiority. Erving Goffman's theory of social roles and its feminist extensions through Joan Rivière (femininity as mask) can be applied here: Hu Die navigates between the public role of the star, societal expectations of the virtuous woman, and her private self. Her survival across four political systems was itself a masterpiece of this navigation.",

    // Film description for Xie Caizhen (English translation)
    quellen_film_desc_xie: "Xie Caizhen's only known film tells the story of a young girl from the working class who endures poverty, loss, and social exclusion. Xie directed, played the lead role, and produced the film — as the only woman in all key positions.",

    // Direct quotes (English translations from Chinese originals)
    quellen_quote_ding_ling_sophie_de: "\"I admit I am a bad woman — but I only want to write down what I feel.\"",

    quellen_quote_xiao_hong_de: "\"A woman's body is a place of suffering — and also the place where life continues.\"",

    quellen_quote_ding_ling_yanan_de: "\"Women … if she remains unmarried, she is called immoral; if she marries, she becomes an appendage to her husband; if she divorces, she becomes a dishonorable person.\"",

    quellen_quote_eileen_chang_de: "\"One must become famous early. If it comes too late, even joy is not as complete.\"",

    quellen_quote_bing_xin_de: "\"Love on the left, affection on the right — they accompany the path of life on both sides, planting seeds at all times, letting flowers bloom at all times.\"",

    quellen_quote_qiu_jin_de: "\"Do not say that women are not heroic material — night after night the dragon sword sings upon the wall.\"",

    quellen_quote_xiang_jingyu_de: "\"Women's liberation is not a matter of women's rights alone — it is part of the liberation of the entire society.\"",

    quellen_quote_he_xiangning_de: "\"For women to be truly liberated, the nation must first be liberated.\"",

    quellen_quote_ruan_lingyu_de: "\"Rumor is a fearful thing.\"",

    quellen_quote_hu_die_de: "\"I am only an actress — but an actress too is a human being, with her own joy, her own anger, her own sorrow.\"",

    // Work-in-progress banner
    wip_banner: "Work in progress — this website is being continuously expanded and revised.",
  }
};
