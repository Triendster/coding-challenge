# Seid gegrüßt, liebes NTAG-Team!

Ich habe mich in den letzen Tagen an eurer Coding-Challenge versucht.
Alle Pflichtkomponenten, sprich die Navbar, der MainView, sowie der DetailView wurden eingebaut.
Auch den ComparisonView habe ich eingebaut.
Insofern habe ich also alle Komponenten, die genannt wurden erstellen können und diese sind auch funktionstüchtig.

## Wie kann ich dieses Projekt testen?
Ich gehe mal davon aus, dass ihr Node ohnehin nutzt. Ergo einfach dieses Repository klonen und dann im jeweiligen Verzeichnis `npm install` ausführen.
Mit `npm start` wird das Projekt dann auf `localhost:3000

Im Folgenden kommen Punkte, die ihr wahrscheinlich ansprechen würdet:

## 1. Es waren Bilder gefordert, die beispielsweise das Banner/Profilbild eines Künstlers zeigen
Über relevante API-Endpunkte werden zwar Image-Arrays mit verschiedenen Auflösungen geschickt, aber diese enthalten unabhängig vom gewählten Künstler immer das gleiche Bild eines weißen Sterns.
Das könnt ihr auch noch mal [hier](https://stackoverflow.com/questions/55978243/last-fm-api-returns-same-white-star-image-for-all-artists) nachlesen.
### Wie könnte man dieses Problem lösen?
Wenn man über `artist.getInfo` Anfragen sendet, wird auch eine URL auf das jeweilige LastFM-Profil geschickt.
Mittels eines Webscrapers im Backend könnte man so die relevanten Bilder suchen und in verschiedenen Auflösungen abspeichern.

## 2. Du hast keine Tests für die Komponenten geschrieben
Im Zuge kleiner Projekte macht es aus meiner Sicht wenig Sinn, Tests zu schreiben. Erst wenn Komponenten größer, komplexer und untereinander abhängig sind, sollte man, um auf lange Sicht Entwicklungs-Ressourcen sinnvoll zu verteilen, Tests schreiben.
### Wie könnte man dieses Problem lösen?
Dafür gibt es mittlerweile diverse Frameworks, die das Erstellen von Tests automatisieren können. Ein Beispiel dafür wären [Jest](https://jestjs.io/) oder [Enzyme](https://enzymejs.github.io/enzyme).

## 3. Solltest du nicht Angular für das Projekt verwenden?
Aktuell habe ich noch wenig Erfahrung mit Angular. Ich habe zwar schon ein kleines bisschen damit gespielt, bewege mich aktuell aber noch wesentlich schneller mit React. Da ich diese Woche noch diversen Schülern Nachhilfe gebe, muss ich das bisschen Zeit, was zum Programmieren bleibt sinnvoll nutzen. Unabhängig davon, Sophia meinte ja ohnehin, dass ich statt Angular React nutzen kann. Ich bin natürlich mehr als willig, meine Kenntnisse in Angular auszubauen, gerade wenn es dann auf ein etwaiges Anstellungsverhältnis zugeht. Hoffe, das ist okay für euch, React ist ja ohnehin etwas lesbarer als Angular. :D
### Wie könnte man dieses Problem lösen?
Da wäre natürlich die offensichtliche Lösung, einfach Angular zu lernen. Ich denke aber, das man stets nach Frameworks suchen sollte, die einem viel Arbeit abnehmen können. Da gäbe es beispielsweise [react2angular](https://github.com/coatue-oss/react2angular), [ngReact](https://github.com/ngReact/ngReact).
Hier sei natürlich gesagt, dass diese Pakete nicht fehlerfrei arbeiten, man sollte also auf jeden Fall Grundkenntnisse in Angular besitzen. 
Auch modernster Technologien kann man sich bedienen. Ich selbst nutze beispielsweise gerne [ChatGPT](https://openai.com/blog/chatgpt/) von OpenAI, um CSS oder einfache JS-Funktionen zu generieren, wenn ich zu faul bin, selbst Code zu schreiben. Das funktioniert erstaunlich gut und man kann das übrigens auch verwenden, um eine React-Komponente in eine Angular-Komponente zu transformieren. Auch hier sollte man natürlich genug über das jeweilige Framework wissen, um Fehler auszuradieren. Auch hier gilt wieder: man sollte mit der Technik gehen. Vieles, was Entwickler machen, ist repetitiv. Wenn man dadurch Zeit sparen kann, umso besser für die Firma und den Kunden. Man sollte natürlich trotzdem genug Grundkenntnisse haben, um Sachen in Frage stellen zu können und etwaige Bugs zu fixen.

## 4. CSS hätte man übersichtlicher gestalten können
CSS ist eine sehr geschmacksabhängige Sache. Mein grundlegender Ansatz besteht darin, mir zu überlegen, welche Styles immer wieder vewendet werden könnten. Da kommen mir zum Beispiel `display : flex` oder sowas wie `position : relative` in den Sinn, aber auch Dinge wie `color : white` oder `justify-content : center`. Dann schreibt man für einzelne Komponenten Stylesheets, die im besten Fall Styles enthalten, die spezifisch für das Element sind. Ich halte mich allerdings bei persönlichen Projekten nicht religiös an diese Vorgaben. So kommt es in manchen Fällen zu Dopplungen. In großen Projekten würde ich dann aber definitiv stärker darauf achten. Gerade bei komplexen Komponenten kann man so recht schnell erkennen, was genau am Styling geändert werden muss. Hierfür sollte man sich natürlich auch auf sinnvolle Naming-Standards einigen.
### Wie könnte man dieses Problem lösen?
Bootstrap. Wenn man Bootstrap-Lingo verstanden hat, kann man sehen, was bei Komponenten geändert werden muss, ohne die Komponente zu sehen. Außerdem funktioniert Bootstrap auch mit verschiedenen Breakpoints, womit man sich Testen auf verschiedenen Geräten spart, was mitunter den zeitaufwändigsten Teil von Projekten darstellen kann.

## 5. Conditional Rendering? Was ist mit Error-Handling bei `fetch`-Requests?
Offensichtlich ist es gerade bei größeren Anwendungen notwendig, bei Anfragen, die auf interne oder externe APIs zugreifen, entsprechende Methoden zur Fehlerbehandlung einzubauen. Gerade wenn diese Endpunkte verschiedene Status-Codes schicken oder beispielsweise mit Rate-Limits versehen sind. Außerdem sollte man sich immer wieder vor Augen führen, das `await` bei Anfragen verwendet werden sollte. Gerade wenn Teile des Programms von Daten aus Promises abhängig sind, sollte man dieses Muster verfolgen, da es ansonsten zu ungewollten Fehlern kommen kann. 
### Wie könnte man dieses Problem lösen?
Einfach akribischere Fehlerbehandlung implementieren. Methoden, die REST-konforme Requests durchführen sollten als `async` deklariert werden, gerade wenn Teile des Codes von diesen Anfragen abhängen. Die API-Endpunkte sollten unter verschiedenen Bedingungen getestet und ihre Dokumentation studiert werden. 
