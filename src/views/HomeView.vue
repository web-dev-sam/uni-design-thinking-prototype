<template>
  <header class="w-full h-20">
    <img src="@/assets/header.svg" alt="Vue logo" class="h-20 absolute -z-10 object-cover w-full" />
    <div class="container">
      <nav>
        <ul class="flex">
          <li>
            <a href="#" class="text-base text-white">
              <img src="@/assets/logo.svg" alt="Logo" class="h-8" />
            </a>
          </li>
          <li class="flex-1"></li>
          <li class="ml-8">
            <a href="/module.html" class="text-base text-white leading-[36px]">Weiter Machen</a>
          </li>
          <li class="ml-8">
            <a href="/module.html" class="text-base text-white leading-[36px]">Meine Module</a>
          </li>
          <li class="mx-8">
            <div class="border-r-2 border-white h-[36px]"></div>
          </li>
          <li>
            <a href="#" class="text-base">
              <img src="@/assets/profile.svg" alt="User" class="h-8" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <div class="container flex mt-16">
    <div
      class="flex-[0_0_350px] px-4 text-left mt-10 hidden bg-white z-40"
      :class="navbarExpanded ? '!block absolute inset-0 top-20 px-8 pt-7' : 'onecol:block'"
    >
      <button @click="($event) => (navbarExpanded = !navbarExpanded)" class="onecol:hidden">
        <i class="fa-solid fa-play rotate-180 mr-2"></i>Zurück
      </button>
      <nav class="p-0 left-navigation sticky top-10">
        <ul>
          <li v-for="section in MODULE_DATA.sections" :key="section.title">
            <h2
              class="h3 cursor-pointer hover:opacity-80"
              :class="currentModule.title === section.title ? 'font-gradient-cta' : ''"
              @click="($event) => ((currentModule = section), (navbarExpanded = false))"
            >
              {{ section.title }}
            </h2>
            <a
              :href="`#${subsection.id}`"
              v-for="subsection in section.subsections"
              :key="subsection.id"
              @click="($event) => ((currentModule = section), (navbarExpanded = false))"
            >
              {{ subsection.title
              }}<i class="fa-solid float-right leading-7" :class="subsection?.icon" v-if="subsection?.icon"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="flex-auto px-4">
      <div class="mb-10 onecol:hidden">
        <button class="float-left" @click="($event) => (navbarExpanded = !navbarExpanded)">
          <i class="fa-solid fa-play mr-2 rotate-180"></i>Übersicht
        </button>
        <div class="clear-both"></div>
      </div>
      <div>
        <section class="mt-10">
          <p class="block uppercase text-xl">{{ MODULE_DATA.title }}</p>
          <div class="flex gap-4">
            <h1 class="h1 text-left">{{ currentModule.title }}</h1>
            <div class="flex-auto"></div>
            <div class="flex">
              <i
                @click="onStopAudio"
                class="fa-solid fa-stop font-gradient-cta text-3xl self-center h-8 cursor-pointer"
                :class="isSpeaking ? '' : 'hidden'"
              ></i>
            </div>
            <div class="flex">
              <i
                @click="onPlayAudio"
                class="fa-solid fa-headphones-simple font-gradient-cta text-3xl self-center h-8 cursor-pointer"
                :class="isSpeaking ? (isPaused ? 'fa-play' : 'fa-pause') : 'fa-headphones-simple'"
              ></i>
            </div>
            <div class="flex onecol:hidden">
              <i class="fa-solid fa-cloud-arrow-down text-gray-500 text-3xl self-center h-8 cursor-not-allowed"></i>
            </div>
          </div>
        </section>
        <section class="mt-5">
          <iframe
            src="https://www.youtube.com/embed/meTpMP0J5E8"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="w-full rounded-3xl aspect-video"
            v-if="false"
          ></iframe>
        </section>
        <section class="mt-5">
          <ArticleSection v-for="section in currentModule.paragraphs" :key="section.text" :section="section" />
        </section>
        <section>
          <button
            class="float-right mt-5"
            @click="($event) => ((currentModule = nextModule), (navbarExpanded = false))"
            v-if="nextModule?.title"
          >
            {{ nextModule.title }} <i class="fa-solid fa-play ml-2"></i>
          </button>
          <div class="clear-both"></div>
        </section>
        <section class="text-left" id="kommentare">
          <h1 class="h1 mt-20">Kommentare</h1>
          <h3 class="mt-2">Schreibe hier einen Kommentar</h3>
          <textarea
            class="w-full h-40 mt-5 border-pink border-2 rounded-3xl p-5"
            placeholder="Stelle eine Frage oder gebe Feedback zu diesem Modul..."
          ></textarea>
          <button class="float-right mt-5">Senden <i class="fa-solid fa-paper-plane ml-2"></i></button>
          <div class="clear-both"></div>
        </section>
        <Comment
          class="mt-20"
          name="Lena Mustermann"
          profilepic="/images/profilepic1.png"
          area="Einführung"
          role="Studentin"
          time="vor 2 Stunden"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nunc aliquet nunc, vel lacinia nunc nisl eget nunc."
          :nested="false"
        ></Comment>
        <Comment
          name="Max Mustermann"
          profilepic="/images/profilepic2.png"
          area="Global"
          role="Tutor"
          time="vor 1 Stunde"
          message="@lena_mustermann Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel tincidunt lacinia, nisl nunc aliquet nunc, vel lacinia nunc nisl eget nunc."
          :nested="true"
        ></Comment>
      </div>
    </div>
  </div>
  <footer class="h-80 bg-slate-900 mt-28"></footer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Comment from "@/components/Comment.vue";
import ArticleSection from "@/components/ArticleSection.vue";

@Options({
  components: {
    Comment,
    ArticleSection,
  },
})
export default class HomeView extends Vue {
  nnavbarExpanded = false;
  MODULE_DATA = {
    title: "Design Thinking",
    sections: [
      {
        title: "Einführung",
        paragraphs: [
          {
            type: "text",
            text: "Die Gründe, weshalb Innovationen für Unternehmen eine derart große Bedeutung besitzen, sind vielfältig. Einerseits wird mit Innovation und Kreativität die nachhaltige Sicherung, aber auch die permanente Erweiterung des Geschäftsmodells verbunden. Unternehmen wie beispielsweise Nokia oder Research In Motion (RIM) sind nicht zuletzt darum gescheitert, weil es ihnen in den vergangenen Jahren nicht gelungen ist, kundenorientierte und vom Markt akzeptierte Innovationen hervorzubringen. Andererseits führt die zunehmende Digitalisierung unserer Gesellschaft zu einer umfassenden Veränderung von Produkten, Dienstleistungen, Prozessen und Geschäftsmodellen. In diesem Kontext ist Innovation die treibende Kraft, um sich neuen Gegebenheiten anpassen zu können (Brenner et al. 2014).",
          },
          {
            type: "text",
            text: "Mithilfe der Methode des Design Thinking können Unternehmen und Bildungsinstitutionen dem Anspruch auf ständige Innovationen gerecht werden. Die Methode des Design Thinking entstand in den 1970er- und 1980er-Jahren an der Universität Stanford im Rahmen der Ausbildung von Ingenieuren. Früh erkannten die Dozenten, dass eine rein technisch orientierte Ausbildung nicht ausreichend ist, um den zukünftigen Herausforderungen am Markt zu begegnen. Ergänzend zum traditionellen Curriculum wurden Kurse angeboten, welche den Menschen als Konsumenten und als Nutzer von Technologie in den Mittelpunkt stellten. Inzwischen hat sich ein ganzes Design-Thinking-Methodenset daraus entwickelt, das menschlich-psychologische Faktoren („desirability“) genauso berücksichtigt wie technische, prozessuale („feasability“) und Faktoren der Wirtschaftlichkeit („viability“) (Grots und Pratschke 2009, S. 18). Auch in der Praxis wird die Methode inzwischen häufig adaptiert, beispielsweise bei der Volkswagen AG, deren Chief Information Officer (CIO), Martin Hoffmann, kürzlich in einem Interview erwähnte: „Für die einen ist die Methode ,Design Thinking‘ Kinderkram, für die anderen die Zukunft“ (Freimark 2012).",
          },
          {
            type: "text",
            text: "Anwendung findet die Design-Thinking-Methode gleichermaßen für Innovationen in den Bereichen Dienstleistung, Prozesse und Geschäftsmodelle. Im Sinne des St. Galler Business-Innovation-Modell stellt das Design Thinking somit eine Methode dar, welche insbesondere die Phasen Ideengenerierung, Design und Test unterstützt. Dabei eignet sich Design Thinking für alle drei Innovationsarten: Prozess-, Produkt- und Dienstleistungssowie Geschäftsmodellinnovationen. Der folgende Beitrag beschreibt die Innovationsmethode Design Thinking. Als Datenbasis dienen über vierzig durchgeführte Design-Thinking-Projekte mit Dienstleistungsunternehmen und Industriepartnern wie der Allianz, Audi, Ball Packaging Europe, Clariant, Deutsche Bank, FIFA, Haufe-Lexware, Merck, SAP, Swisscom, Telecom Austria Group, UBS oder Washtec.",
          },
        ],
      },
      {
        title: "Grundlagen",
        paragraphs: [
          {
            type: "text",
            text: "Design Thinking ist eine Methode, die auf Basis eines iterativen Prozesses kundenorientierte, innovative Ergebnisse zur Lösung von komplexen Problemen liefert. Der Begriff „Design“ bezieht sich dabei in seinem Verständnis auf die angelsächsischen Wurzeln (Oxford Dictionaries 2014). Während das deutschsprachige Begriffsverständnis mit dem Wort „Design“ die kreativen, schöpferischen und gestalterischen Aspekte der Arbeit assoziiert, werden im angelsächsischen Sprachgebrauch auch die Anteile der konzeptionellen und technischen Gestaltung von Systemen und Objekten unter dem Begriff subsumiert. Damit bezieht sich Design Thinking als Methode auf einen umfassenderen Bereich als den der rein kreativen Gestaltung. Insbesondere Vogel (Vogel 2010) bietet einen interessanten entwicklungshistorischen Überblick, welcher bis in die Zeiten des Bauhauses zurückreicht.",
          },
          {
            type: "text",
            text: "Während die Methode des Design Thinking bereits vor über 40 Jahren an der Universität Stanford entwickelt wurde, lässt sich der Begriff erst ab den 1990er-Jahren in der Literatur finden. Rowe (1987) ist einer der ersten Autoren, welcher im Umfeld der Architektur neue Problemlösungsverfahren für die Städteplanung (engl. Urban planning) mit diesem Begriff bezeichnete (Dorst 2011, S. 521). Inzwischen lässt sich der Begriff in vielen Wissenschafts- und Anwendungsgebieten finden, so zum Beispiel in den Folgenden (Dolak et al. 2013, S. 2):",
          },
          {
            type: "list",
            items: [
              {
                text: "<strong>Aus- und Weiterbildung:</strong> Häufig unter dem Begriff „Design-based Learning“ zu finden, wird Design Thinking als eine Methode zur Steigerung der Kreativität und Innovationsfähigkeit sowie der Einbeziehung von Mitarbeitern in den Innovationsprozess verstanden. Im universitären Kontext beschrieben Faste, Wilde und Roth diesen Ansatz sehr früh im Bereich des Ingenieurwesens (Faste et al. 1993).",
              },
              {
                text: "<strong>Industriedesign:</strong> Im Industriedesign liegt der Fokus in der äußeren Gestaltung von Produkten sowie auf dem Gestaltungsprozess an sich. Diese Fokussierung entspricht weitestgehend der deutschsprachigen Auffassung des Designbegriffes. In der Literatur stellen Ambrose und Harris (Ambrose und Harris 2010) in ihrem Buch den Ansatz plakativ dar.",
              },
              {
                text: "<strong>Ingenieurwesen:</strong> Im Bereich des Ingenieurwesens wird Design Thinking verwendet, um technische Lösungen zu konstruieren, die Kundenanforderungen umfassend erfüllen.",
              },
              {
                text: "<strong>Informationsmanagement:</strong> Das Informationsmanagement verwendet Design Thinking zur kundenorientierten Gestaltung von Informationssystemen, digitalen Dienstleistungen und Geschäftsmodellen (Vetterli et al. 2012, S. 229; Vetterli et al. 2013).",
              },
              {
                text: "<strong>Innovationsmanagement:</strong> Design Thinking wird als eine Methode zur Steigerung des Wettbewerbsvorteils von Unternehmen genutzt.",
              },
            ],
          },
          {
            type: "text",
            text: "Dieses breite Spektrum an Wissenschafts- und Anwendungsgebieten führt dazu, dass der Begriff „Design Thinking“ wie auch der „Design“-Begriff in der Wissenschaft und Praxis nur vage definiert sind (Dorst 2011, S. 521; Buchanan 1992, S. 5).",
          },
          {
            type: "text",
            text: "Weiterhin werden mit dem Design-Thinking-Begriff stets vier Perspektiven verbunden:",
          },
          {
            type: "list",
            items: [
              {
                text: "<strong>Kunden- und Menschenorientierung:</strong> Der Mensch und Kunde steht am Anfang des Gestaltungs- und Innovationsprozesses. Ausgehend von Bedürfnissen der Kunden werden Anforderungen an die technische und ökonomische Gestaltung dargestellt und in Form von Prototypen Lösungen entworfen (Brown 2008, S. 2, 8). Generell kann Design Thinking sowohl in sogenannten B2C-Szenarien (Business-to-Consumer) eingesetzt werden als auch im B2B-Umfeld (Business-to-Business).",
              },
              {
                text: "<strong>Komplexe Probleme („ill-defined“ und „wicked problems“):</strong> Design Thinking wird häufig auch für Fälle eingesetzt, bei denen zu Beginn das Problem an sich noch nicht dargestellt und klar umrissen werden kann. Erst das Auffinden einer Lösung verschafft Klarheit über das Problem selbst! Diese Art von Problemen wird im Englischen je nach Komplexität entweder als „ill-defined problem“ oder „wicked problem“ bezeichnet (Churchman 1967, S. 1; Rowe 1987, S. 40–41; Buchanan 1992, S. 14–15). Rittel, ein Mathematiker, Designer und Hochschullehrer der Hochschule für Gestaltung Ulm sowie University of California at Berkeley, argumentiert dabei, dass Designer überwiegend „wicked problems“ bearbeiten (Buchanan 1992, S. 15).",
              },
              {
                text: "<strong>Divergierendes Denken:</strong> Divergierendes Denken ist die Fähigkeit eines Menschen, als einfallsreich und unkonventionell empfundene Ideen hervorzubringen, um Probleme auf eine neue, fortschrittliche Art und Weise zu lösen (Runco und Acar 2012). Kontrastierend steht dem divergierenden Denken das Konzept des konvergierenden Denkens gegenüber, welches in der Regel zu konventionellen und „korrekten“ Ideen und Lösungen führt (Runco und Acar 2012, S. 66). Das konvergierende Denken ist ein fester Bestandteil unserer schulischen, universitären und beruflichen Ausbildung. Darum liegt die Herausforderung von Unternehmen heutzutage darin, konvergierendes Denken durch divergierendes Denken in der Mitarbeiterschaft und Organisation zu ergänzen, um Innovationen hervorbringen zu können. Brown und Wyatt (2010, S. 33) bezeichnen diese Fähigkeit zu Denken und zu Handeln als essenziell für Design Thinking und dessen Anwendung in Unternehmen.",
              },
              {
                text: "<strong>Iteratives Vorgehen:</strong> Der Prozess des Design Thinking wird typischerweise iterativ durchlaufen. Dies bedeutet, dass sich schrittweise in wiederholten Prozessdurchläufen (Mikrozyklen) der schlussendlichen Lösung angenähert wird. Damit besteht die Möglichkeit, auf Grundlage sich verändernder Erkenntnisse die Zwischenergebnisse an neue Gegebenheiten anzupassen und zu testen (Schindlholzer et al. 2011, S. 31).",
              },
            ],
          },
          {
            type: "quiz",
            title: "Quiz: Design Thinking",
            description: "Teste dein Wissen über Design Thinking.",
            quiz: {
              question: "Welche der folgenden Aussagen ist richtig?",
              answers: [
                {
                  text: "Design Thinking ist eine Methode, die sich auf die Entwicklung von Produkten und Dienstleistungen konzentriert.",
                  correct: false,
                },
                {
                  text: "Design Thinking ist eine Methode, die sich auf die Entwicklung von Geschäftsmodellen konzentriert.",
                  correct: true,
                },
                {
                  text: "Design Thinking ist eine Methode, die sich auf die Entwicklung von Prozessen konzentriert.",
                  correct: false,
                },
              ],
            },
          },
          {
            type: "lab",
            title: "Projekt: Lernplattform",
            description: "Entwickle eine Lernplattform für die IU.",
            hints: [
              "Du kannst dich an der Plattform Moodle orientieren.",
              "Wähle eine geeignete Technologie aus.",
              "Nutze die Design Thinking-Methode.",
            ],
          },
          {
            type: "links",
            links: [
              {
                text: "Wikipedia: Design Thinking",
                link: "https://de.wikipedia.org/wiki/Design_Thinking",
              },
            ],
          },
          // {
          //   type: "image",
          //   path: "/images/image.png",
          // },
          {
            type: "literature",
            literature: [
              {
                text: "Brenner W, Karagiannis D, Kolbe L, Krüger J, Leifer L, Lamberti HJ, Leimeister J, Österle H, Petri C et al (2014) User, use & utility research. The digital user as new design perspective in business and information systems engineering. Business & Information Systems Engineering 6(1):55-61",
              },
              {
                text: "Grots A, Pratschke M (2009) Design Thinking - Kreativität als Methode. Marketing Rev St Gallen 2:18-23",
              },
              {
                text: "Freimark vA (2012) Design Thinking - Das Ende von Help Desk Schulungen. CIO-Magazin. http://www.cio.de/strategien/2913849/. Zugegriffen: 5. Januar 2014",
                link: "http://www.cio.de/strategien/2913849/",
              },
            ],
          },
        ],
      },
      {
        title: "Elemente des Design Thinking",
        paragraphs: [
          {
            type: "text",
            text: "Was macht nun im Einzelnen die Methode „Design Thinking“ aus? Viele Organisationen, die in den letzten Jahren versucht haben Innovationsmethoden einzuführen, haben vor allem sehr engagiert die Gestaltung von Räumen und Arbeitsflächen vorangetrieben, um Kreativität und ein die Ambition von jedem Mitarbeiter förderndes Umfeld zu schaffen (Jenkins 2010, S. 24). Doch die Umsetzung zeigt, dass mehr als nur innovative Räumlichkeiten notwendig sind (Brown 2008; Jenkins 2010, S. 24). Im Folgenden werden die Aspekte „Kultur“, „Vorgehensmodell und Techniken“, „Teams“ und „Arbeitsumfeld“ näher beschrieben.",
          },
          {
            type: "section-header",
            title: "Kultur",
            id: "kultur",
          },
          {
            type: "text",
            text: "Die Kultur des Design Thinking beschreibt Denkmuster und Verhaltensweisen, die für die Anwendung dieser Methode unabdingbar und erfolgsentscheidend sind. Diese Kultur stellt eine geistige Grundhaltung dar und muss sowohl von den einzelnen Akteuren, wie zum Beispiel Firmenmitarbeitern, als auch von aggregierten Ebenen – Teams oder der Organisation – verinnerlicht werden. Die Kultur des Design Thinking prägt damit die gesamte Arbeits- und Denkweise eines Akteurs oder Teams und beschränkt sich nicht nur auf die Bearbeitung eines unmittelbaren Problems.",
          },
          {
            type: "section-header",
            title: "Vorgehensmodell und Techniken",
            id: "vorgehensmodell-und-techniken",
          },
          {
            type: "text",
            text: "Design Thinking basiert auf einem langjährig und gut untersuchten Vorgehensmodell und einer umfangreichen Zusammenstellung an Techniken zur Erreichung der Meilensteine im Vorgehensmodell. Das nachfolgend dargestellte Modell orientiert sich am Vorgehen der Universität Stanford und wurde in Nuancen an die Bedürfnisse der Dienstleistungsund Geschäftsmodellinnovation angepasst (Meinel und Leifer 2011; Vetterli et al. 2012).",
          },
          {
            type: "section-header",
            title: "Arbeitsumfeld",
            id: "arbeitsumfeld",
          },
          {
            type: "text",
            text: "Wie die Zusammensetzung des Teams oder die Gestaltung des Vorgehensmodells ist auch das räumliche Arbeitsumfeld für ein kreatives und innovatives Ergebnis maßgeblich entscheidend (Grots und Pratschke 2009, S. 19). Henn und Allen (2007) haben hierzu in den letzten Jahrzehnten an der Schnittstelle zwischen Architektur und Betriebswirtschaftslehre geforscht und diesen Zusammenhang untermauert. Nicht zuletzt zeigen Unternehmen wie zum Beispiel Google, die diesen Zusammenhang verstanden haben und nutzen, dass dessen Umsetzung im Markt überaus erfolgreich ist.",
          },
        ],
        subsections: [
          {
            id: "kultur",
            title: "Kultur",
          },
          {
            id: "vorgehensmodell-und-techniken",
            title: "Vorgehensmodell und Techniken",
          },
          {
            id: "arbeitsumfeld",
            title: "Arbeitsumfeld",
          },
        ],
      },
      {
        title: "Übersicht",
        paragraphs: [
          {
            type: "section-header",
            title: "Zusammenfassung",
            id: "zusammenfassung",
          },
          {
            type: "list",
            items: [
              {
                text: "<strong>Aus- und Weiterbildung:</strong> Häufig unter dem Begriff „Design-based Learning“ zu finden, wird Design Thinking als eine Methode zur Steigerung der Kreativität und Innovationsfähigkeit sowie der Einbeziehung von Mitarbeitern in den Innovationsprozess verstanden. Im universitären Kontext beschrieben Faste, Wilde und Roth diesen Ansatz sehr früh im Bereich des Ingenieurwesens (Faste et al. 1993).",
              },
              {
                text: "<strong>Industriedesign:</strong> Im Industriedesign liegt der Fokus in der äußeren Gestaltung von Produkten sowie auf dem Gestaltungsprozess an sich. Diese Fokussierung entspricht weitestgehend der deutschsprachigen Auffassung des Designbegriffes. In der Literatur stellen Ambrose und Harris (Ambrose und Harris 2010) in ihrem Buch den Ansatz plakativ dar.",
              },
              {
                text: "<strong>Ingenieurwesen:</strong> Im Bereich des Ingenieurwesens wird Design Thinking verwendet, um technische Lösungen zu konstruieren, die Kundenanforderungen umfassend erfüllen.",
              },
              {
                text: "<strong>Informationsmanagement:</strong> Das Informationsmanagement verwendet Design Thinking zur kundenorientierten Gestaltung von Informationssystemen, digitalen Dienstleistungen und Geschäftsmodellen (Vetterli et al. 2012, S. 229; Vetterli et al. 2013).",
              },
              {
                text: "<strong>Innovationsmanagement:</strong> Design Thinking wird als eine Methode zur Steigerung des Wettbewerbsvorteils von Unternehmen genutzt.",
              },
            ],
          },
          {
            type: "section-header",
            title: "Probeklausur",
            id: "probeklausur",
          },
          {
            type: "quiz",
            title: "Design Thinking Musterklausur",
            description: "Teste dein Wissen über Design Thinking.",
            quiz: {
              question: "Welche der folgenden Aussagen ist richtig?",
              answers: [
                {
                  text: "Design Thinking ist eine Methode, die sich auf die Entwicklung von Produkten und Dienstleistungen konzentriert.",
                  correct: false,
                },
                {
                  text: "Design Thinking ist eine Methode, die sich auf die Entwicklung von Geschäftsmodellen konzentriert.",
                  correct: true,
                },
                {
                  text: "Design Thinking ist eine Methode, die sich auf die Entwicklung von Prozessen konzentriert.",
                  correct: false,
                },
              ],
            },
          },
        ],
        subsections: [
          {
            id: "zusammenfassung",
            title: "Zusammenfassung",
            icon: "fas fa-check",
          },
          {
            id: "probeklausur",
            title: "Probeklausur",
            icon: "fas fa-file-alt",
          },
          {
            id: "kommentare",
            title: "Kommentare",
            icon: "fas fa-comment",
          },
        ],
      },
    ],
  };
  currentModule = this.MODULE_DATA.sections[0];
  isSpeaking = false;
  isPaused = false;

  onPlayAudio() {
    if (window.speechSynthesis.speaking && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isSpeaking = true;
      this.isPaused = false;
      return;
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.isSpeaking = true;
      this.isPaused = true;
      return;
    }

    const voice = speechSynthesis.getVoices().find((voice) => voice.lang === "de-DE");
    const msg = new SpeechSynthesisUtterance();
    const text = this.currentModule.paragraphs.map((p) => p.text).join("");
    msg.text = text;
    if (voice) {
      msg.voice = voice;
      window.speechSynthesis.speak(msg);
      this.isSpeaking = true;
      this.isPaused = false;
    } else {
      msg.text = "No german voice found";
      window.speechSynthesis.speak(msg);
      this.isSpeaking = true;
      this.isPaused = false;
    }
  }

  onStopAudio() {
    window.speechSynthesis.cancel();
    this.isSpeaking = false;
    this.isPaused = false;
  }

  get navbarExpanded() {
    return this.nnavbarExpanded;
  }

  set navbarExpanded(value) {
    document.body.classList.toggle("overflow-hidden", value);
    window.scrollTo(0, 0);
    this.onStopAudio();
    this.nnavbarExpanded = value;
  }

  get nextModule() {
    const index = this.MODULE_DATA.sections.indexOf(this.currentModule);
    return this.MODULE_DATA.sections[index + 1];
  }
}
</script>

<style scoped>
.left-navigation {
  @apply mt-28;
}

.left-navigation li {
  @apply mt-5;
}

.left-navigation h2 {
  @apply leading-6 mb-2;
}

.left-navigation li a {
  @apply block py-1.5 px-5 text-lg hover:bg-slate-200 rounded-xl;
}
</style>
