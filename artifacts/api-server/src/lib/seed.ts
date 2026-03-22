import { db } from "@workspace/db";
import { newsTable } from "@workspace/db/schema";
import { count } from "drizzle-orm";

const seedArticles = [
  {
    title: "Mistrzostwa Województwa 2024 - Wielki sukces Jedynki!",
    excerpt: "Zawodnicy KP Jedynka zdobyli łącznie 8 medali na Mistrzostwach Województwa 2024.",
    content: [
      "Zawodnicy Klubu Pływackiego Jedynka stanęli na wysokości zadania podczas tegorocznych Mistrzostw Województwa, które odbyły się na krytej pływalni w Krakowie.",
      "Nasi pływacy wywalczyli łącznie 8 medali: 3 złote, 3 srebrne i 2 brązowe. Szczególnie wyróżnił się Marek Kowalski, który zdobył dwa złota w stylu dowolnym na 100m i 200m. Świetny wynik osiągnęła również Anna Wiśniewska, triumfując na dystansie 50m motylkiem z nowym rekordem województwa.",
      "Trener główny, Piotr Nowak, był bardzo zadowolony z wyników: To efekt ciężkiej pracy całego zespołu przez ostatnie miesiące. Jestem bardzo dumny z każdego zawodnika.",
      "Następnym celem jest udział w Ogólnopolskiej Olimpiadzie Młodzieży zaplanowanej na jesień 2024 roku.",
    ].join("\n\n"),
    imageUrl: "/images/news/mistrzostwa.png",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Nowe godziny treningów od 1 kwietnia",
    excerpt: "Od 1 kwietnia 2024 zmieniamy harmonogram treningów dla wszystkich grup.",
    content: [
      "Informujemy, że od 1 kwietnia 2024 roku wprowadzamy nowy harmonogram treningów dla wszystkich grup wiekowych KP Jedynka.",
      "Grupa juniorów (10-14 lat) będzie trenować w poniedziałki, środy i piątki w godzinach 16:00-17:30. Grupa seniorów (15+ lat) spotyka się we wtorki, czwartki i soboty w godzinach 17:00-19:00. Dla najmłodszych (6-9 lat) zajęcia odbywają się w soboty i niedziele w godzinach 10:00-11:00.",
      "Zmiany wynikają z nowego harmonogramu udostępnienia toru przez Aquapark Jedynka. Prosimy wszystkich rodziców i zawodników o dostosowanie się do nowego planu.",
      "Szczegółowe pytania kierować do biura klubu lub do trenera prowadzącego grupę.",
    ].join("\n\n"),
    imageUrl: "/images/news/treningi.png",
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Otwarty Turniej Pływacki Jedynka Cup 2024",
    excerpt: "Zapraszamy na Otwarty Turniej Pływacki Jedynka Cup 2024 - 15 maja na basenie Aquapark.",
    content: [
      "Z przyjemnością zapraszamy wszystkie kluby pływackie z regionu na Otwarty Turniej Pływacki Jedynka Cup 2024, który odbędzie się 15 maja 2024 roku na krytym basenie Aquapark Jedynka.",
      "Turniej przeznaczony jest dla zawodników we wszystkich kategoriach wiekowych - od żaków po seniorów. Rywalizacja odbywa się na dystansach 50m, 100m i 200m we wszystkich stylach pływackich oraz w wyścigu zmianowym 4x50m.",
      "Wpisowe wynosi 30 zł za zawodnika. Rejestracja online na stronie turniejjedynka.pl do 10 maja. Dla pierwszych 100 zarejestrowanych zawodników przewidziane są specjalne upominki.",
      "Nagrody rzeczowe i puchary czekają na zwycięzców każdej kategorii. Szczegółowy regulamin dostępny w biurze klubu i na stronie internetowej.",
    ].join("\n\n"),
    imageUrl: "/images/news/turniej.png",
    publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Podsumowanie sezonu zimowego 2023/2024",
    excerpt: "Podsumowanie sezonu zimowego 2023/2024 - 23 medale w 12 zawodach!",
    content: [
      "Sezon zimowy 2023/2024 dobiegł końca i czas na podsumowanie osiągnięć naszych pływaków. Był to jeden z najlepszych sezonów w historii Klubu Pływackiego Jedynka.",
      "W ciągu całego sezonu nasi zawodnicy wzięli udział w 12 zawodach różnego szczebla, zdobywając łącznie 23 medale: 9 złotych, 8 srebrnych i 6 brązowych. Pobito 5 rekordów klubowych oraz 2 rekordy województwa.",
      "Najbardziej utytułowanym zawodnikiem sezonu okazał się Tomasz Zając, który na swoim koncie ma aż 4 złote medale z zawodów rangi ogólnopolskiej. Wielkie brawa należą się też całej sekcji juniorek, które po raz pierwszy w historii awansowały do finału Mistrzostw Polski Juniorów.",
      "Dziękujemy zawodnikom, trenerom, rodzicom i wszystkim kibicom za wsparcie w tym wyjątkowym sezonie!",
    ].join("\n\n"),
    imageUrl: "/images/news/sezon.png",
    publishedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Zgrupowanie letnie w Kołobrzegu - relacja",
    excerpt: "Podsumowanie tygodniowego zgrupowania przygotowawczego na wybrzeżu Bałtyku.",
    content: [
      "W dniach 10-17 czerwca zawodnicy KP Jedynka wzięli udział w tygodniowym zgrupowaniu letnim w Kołobrzegu. Był to intensywny tydzień pełen dwufazowych treningów, zajęć na otwartej wodzie oraz ćwiczeń siłowych na plaży.",
      "Zgrupowanie objęło łącznie 42 zawodników z grup juniorskich i seniorskich. Każdego dnia odbywały się dwie sesje treningowe - poranna w krytym basenie oraz popołudniowa na torach wyznaczonych w morzu.",
      "Trenerzy szczególnie podkreślają postępy zawodników w technice pływania stylem grzbietowym oraz poprawę wytrzymałości tlenowej całej grupy seniorskiej.",
      "Następne zgrupowanie zaplanowane jest na przełom sierpnia i września przed startem sezonu jesiennego.",
    ].join("\n\n"),
    imageUrl: "/images/news/zgrupowanie.png",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    title: "Rekrutacja do sekcji pływackiej 2024/2025",
    excerpt: "Zapraszamy dzieci w wieku 6-12 lat na bezpłatne zajęcia próbne w ramach rekrutacji do nowego sezonu.",
    content: [
      "Klub Pływacki Jedynka ogłasza nabór do sekcji pływackiej na sezon 2024/2025. Poszukujemy utalentowanych dzieci w wieku od 6 do 12 lat, które chciałyby spróbować swoich sił w zorganizowanym sporcie pływackim.",
      "Bezpłatne zajęcia próbne odbędą się w każdą sobotę września w godzinach 10:00-11:30 na pływalni Aquapark Jedynka przy ul. Sportowej 5. Dzieci zostaną ocenione przez naszych doświadczonych trenerów pod kątem predyspozycji i aktualnego poziomu umiejętności pływackich.",
      "Do udziału w zajęciach próbnych wymagane jest jedynie zaświadczenie lekarskie o braku przeciwwskazań do uprawiania sportu oraz strój kąpielowy i czepek. Liczba miejsc jest ograniczona - zgłoszenia przyjmujemy do 5 września pod adresem rekrutacja@kpjedynka.pl.",
      "Zapraszamy! Wspólnie budujemy przyszłość polskiego pływania.",
    ].join("\n\n"),
    imageUrl: "/images/news/rekrutacja.png",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export async function seedIfEmpty() {
  try {
    const [result] = await db.select({ value: count() }).from(newsTable);
    if (result.value === 0) {
      await db.insert(newsTable).values(seedArticles);
      console.log("Database seeded with sample news articles.");
    }
  } catch (err) {
    console.error("Seed error:", err);
  }
}
