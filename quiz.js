let currentQ = 0;
let score = 0;
let answered = false;

/* ── Timer ─────────────────────────────────── */
const PER_Q_SECONDS = 15;
const CIRCUMFERENCE = 2 * Math.PI * 16; 

let timerInterval = null;
let timeLeft = PER_Q_SECONDS;

function startTimer() {
  clearInterval(timerInterval);
  timeLeft = PER_Q_SECONDS;
  updateTimerUI(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function updateTimerUI(t) {
  const numEl  = document.getElementById("timerNum");
  const ringEl = document.getElementById("ringFill");
  const wrapEl = document.getElementById("timerWrap");

  if (!numEl || !ringEl) return;

  numEl.textContent = t;

  // shrink the stroke as time drains
  const offset = CIRCUMFERENCE * (1 - t / PER_Q_SECONDS);
  ringEl.style.strokeDashoffset = offset;

  const urgent = t <= 5;
  numEl.classList.toggle("urgent", urgent);
  ringEl.classList.toggle("urgent", urgent);
  wrapEl.classList.toggle("shake",  urgent && t > 0);
}

function handleTimeout() {
  if (answered) return;
  answered = true;

  // dim all options, reveal correct answer
  const q = selectedQuestions[currentQ];
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(b => {
    b.disabled = true;
    if (b.innerText === q.correctAnswer) {
      b.classList.add("correct");
    } else {
      b.classList.add("timeout");
    }
  });

  // show fun fact
  funDiv.innerText = q.funFact;
  funDiv.classList.remove("show");
  setTimeout(() => funDiv.classList.add("show"), 230);

  // auto-advance after 1.8 s
  setTimeout(() => nextQuestion(), 1800);
}
/* ── End Timer ───────────────────────────────── */

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category"); 
const diff = urlParams.get("difficulty");

const funDiv = document.getElementById("funfact")

const quizData = {
  pop: {
    easy: [
      {
        question: "Which actor plays Spider-Man in the Marvel Cinematic Universe?",
        options: ["Andrew Garfield", "Tom Holland", "Tobey Maguire", "Chris Evans"],
        correctAnswer: "Tom Holland",
        funFact: "Tom Holland actually found out he got the role of Spider-Man by scrolling through Instagram and seeing a post from Marvel!"
      },
      {
        question: "What shape is the famous scar on Harry Potter's forehead?",
        options: ["A star", "A crescent moon", "A lightning bolt", "A cross"],
        correctAnswer: "A lightning bolt",
        funFact: "J.K. Rowling has admitted she chose a lightning bolt simply because it 'looked cool' and she didn't want her hero to have a donut-shaped scar."
      },
      {
        question: "What is the dedicated fanbase of Taylor Swift called?",
        options: ["The Hive", "Swifties", "Little Monsters", "Arianators"],
        correctAnswer: "Swifties",
        funFact: "The 'Swiftie' fandom is so influential that their massive stadium tours have actually caused localized, measurable seismic activity—literal mini-earthquakes!"
      },
      {
        question: "Who lives in a pineapple under the sea?",
        options: ["Patrick Star", "Squidward Tentacles", "SpongeBob SquarePants", "Mr. Krabs"],
        correctAnswer: "SpongeBob SquarePants",
        funFact: "The creator of SpongeBob, Stephen Hillenburg, was actually a real-life marine biologist before he went into animation."
      },
      {
        question: "What is the name of the main purple villain in the Avengers movies who collects Infinity Stones?",
        options: ["Loki", "Ultron", "Thanos", "Kang"],
        correctAnswer: "Thanos",
        funFact: "Thanos’s iconic 'snap' in Infinity War wiped out exactly 50% of all living creatures, a cinematic moment that took digital artists months to perfectly render into dust."
      },
      {
        question: "What is the real name of 'Baby Yoda' from The Mandalorian?",
        options: ["Yaddle", "Grogu", "Din", "Boba"],
        correctAnswer: "Grogu",
        funFact: "Even though everyone calls him 'Baby Yoda', he isn't actually Yoda as a baby. He just belongs to the same mysterious, unnamed alien species."
      },
      {
        question: "Which singer is known for the hit song 'Bad Guy' and iconic green-and-black hair?",
        options: ["Dua Lipa", "Billie Eilish", "Halsey", "Olivia Rodrigo"],
        correctAnswer: "Billie Eilish",
        funFact: "Billie Eilish recorded almost her entire debut album, which swept the Grammys, in her brother Finneas's small childhood bedroom."
      },
      {
        question: "What is the name of Mario's taller, green-wearing brother?",
        options: ["Wario", "Bowser", "Toad", "Luigi"],
        correctAnswer: "Luigi",
        funFact: "Luigi was originally created just so a second player could join the game, and his green color was chosen due to memory limitations on early arcade machines."
      },
      {
        question: "What country is pop star Justin Bieber originally from?",
        options: ["United States", "Australia", "Canada", "United Kingdom"],
        correctAnswer: "Canada",
        funFact: "Justin Bieber was actually discovered accidentally on YouTube when an executive clicked on his video by mistake while searching for a different artist."
      },
      {
        question: "Who is the main protagonist of The Hunger Games series?",
        options: ["Hermione Granger", "Katniss Everdeen", "Tris Prior", "Bella Swan"],
        correctAnswer: "Katniss Everdeen",
        funFact: "Jennifer Lawrence accidentally deafened herself in one ear for almost a week while filming Catching Fire after diving into stagnant water."
      },
      {
        question: "What is the name of the coffee shop where the characters in 'Friends' always hang out?",
        options: ["MacLaren's Pub", "Central Perk", "Monk's Diner", "The Peach Pit"],
        correctAnswer: "Central Perk",
        funFact: "Gunther, the blonde barista at Central Perk, didn't have a name until the middle of the second season and originally had zero lines."
      },
      {
        question: "What valuable necklace is dropped into the ocean at the end of the movie Titanic?",
        options: ["The Hope Diamond", "The Heart of the Ocean", "The Star of India", "The Ocean's Pearl"],
        correctAnswer: "The Heart of the Ocean",
        funFact: "The Heart of the Ocean is fictional, but it was heavily inspired by the real-life Hope Diamond, which is supposedly cursed."
      },
      {
        question: "What is the name of the fictional town where Stranger Things takes place?",
        options: ["Riverdale", "Hawkins", "Stars Hollow", "Sunnydale"],
        correctAnswer: "Hawkins",
        funFact: "The show was originally going to be called 'Montauk' and was based on real-world conspiracy theories involving a military base in New York."
      },
      {
        question: "Which magical character says 'You shall not pass!' in The Lord of the Rings?",
        options: ["Dumbledore", "Merlin", "Gandalf", "Saruman"],
        correctAnswer: "Gandalf",
        funFact: "Ian McKellen based Gandalf’s distinct accent and speaking cadence on the actual voice of J.R.R. Tolkien, the author of the books."
      },
      {
        question: "What is the name of the lovable snowman in Disney's Frozen?",
        options: ["Sven", "Kristoff", "Olaf", "Marshmallow"],
        correctAnswer: "Olaf",
        funFact: "Olaf was originally pitched as an obnoxious, sarcastic sidekick. The creators later realized making him innocent and naive was much funnier."
      },
      {
        question: "Rihanna is the founder of which wildly successful makeup brand?",
        options: ["Rare Beauty", "Kylie Cosmetics", "Fenty Beauty", "Florence by Mills"],
        correctAnswer: "Fenty Beauty",
        funFact: "Rihanna's last name is actually Fenty! The brand completely changed the makeup industry by launching with an unprecedented 40 different foundation shades."
      },
      {
        question: "What is the name of the regional manager of Dunder Mifflin in the early seasons of The Office?",
        options: ["Dwight Schrute", "Jim Halpert", "Michael Scott", "Andy Bernard"],
        correctAnswer: "Michael Scott",
        funFact: "Steve Carell stopped watching the original British version of The Office after just a few minutes because he didn't want to accidentally copy Ricky Gervais's performance."
      },
      {
        question: "Who is Shrek's annoying but loyal animal sidekick?",
        options: ["Puss in Boots", "Donkey", "Dragon", "Pinocchio"],
        correctAnswer: "Donkey",
        funFact: "The animators originally struggled with Donkey's fur texture until a lead animator decided to base his fuzzy look on real-life bunny rabbits."
      },
      {
        question: "Which actress played the lead role in the 2023 live-action Barbie movie?",
        options: ["Emma Stone", "Margot Robbie", "Scarlett Johansson", "Florence Pugh"],
        correctAnswer: "Margot Robbie",
        funFact: "The Barbie movie used so much of a specific shade of pink paint that it actually caused a temporary global shortage of that color!"
      },
      {
        question: "What iconic city does Batman protect?",
        options: ["Metropolis", "Star City", "Central City", "Gotham City"],
        correctAnswer: "Gotham City",
        funFact: "The name 'Gotham' was chosen randomly. The creator just flipped through a New York phone book and stopped on 'Gotham Jewelers'."
      },
      {
        question: "What is the name of the highest-grossing film of all time (as of recent years)?",
        options: ["Avengers: Endgame", "Avatar", "Titanic", "Star Wars: The Force Awakens"],
        correctAnswer: "Avatar",
        funFact: "James Cameron actually had to wait over a decade to make Avatar because the CGI technology required to create the Na'vi didn't exist yet in the 90s."
      },
      {
        question: "Which pop star is known as the 'Queen of Pop'?",
        options: ["Britney Spears", "Madonna", "Lady Gaga", "Whitney Houston"],
        correctAnswer: "Madonna",
        funFact: "Madonna arrived in New York City with just $35 in her pocket and told a cab driver to take her to 'the center of everything'."
      },
      {
        question: "What is the highest-selling video game console of all time?",
        options: ["PlayStation 2", "Nintendo DS", "Nintendo Switch", "Xbox 360"],
        correctAnswer: "PlayStation 2",
        funFact: "The PS2 was incredibly popular partly because it doubled as a cheap DVD player when DVD technology was brand new and very expensive."
      },
      {
        question: "What color is the pill that Neo takes in The Matrix?",
        options: ["Blue", "Red", "Green", "Yellow"],
        correctAnswer: "Red",
        funFact: "The iconic 'digital rain' code from The Matrix is actually just heavily modified, flipped characters from Japanese sushi recipes."
      },
      {
        question: "Who wrote the hit Broadway musical 'Hamilton'?",
        options: ["Stephen Sondheim", "Andrew Lloyd Webber", "Lin-Manuel Miranda", "Jonathan Larson"],
        correctAnswer: "Lin-Manuel Miranda",
        funFact: "Lin-Manuel Miranda performed the very first rough draft of the opening song at the White House for Barack Obama years before the play ever opened."
      },
      {
        question: "What day do the Plastics wear pink in 'Mean Girls'?",
        options: ["Monday", "Tuesday", "Wednesday", "Friday"],
        correctAnswer: "Wednesday",
        funFact: "Tina Fey didn't just write Mean Girls; she based many of the characters and brutal high school dynamics on an actual parenting book she read."
      },
      {
        question: "Which fast-food chain features a mascot named Ronald?",
        options: ["Wendy's", "Burger King", "KFC", "McDonald's"],
        correctAnswer: "McDonald's",
        funFact: "The very first McDonald's mascot wasn't a clown at all—it was a little chef named 'Speedee' with a hamburger for a head."
      },
      {
        question: "What is the name of Beyoncé’s dedicated fanbase?",
        options: ["The Barbz", "The Beyhive", "The A-Team", "The Navy"],
        correctAnswer: "The Beyhive",
        funFact: "Beyoncé is incredibly protective of her work. She actually keeps all of her unreleased music in a physical, temperature-controlled vault."
      },
      {
        question: "Which Disney princess loses a glass slipper?",
        options: ["Ariel", "Belle", "Cinderella", "Aurora"],
        correctAnswer: "Cinderella",
        funFact: "In the original, darker fairytale versions, the glass slipper wasn't glass at all—it was made of fur or gold depending on the translation."
      },
      {
        question: "What animated movie features the song 'Hakuna Matata'?",
        options: ["The Jungle Book", "Aladdin", "The Lion King", "Tarzan"],
        correctAnswer: "The Lion King",
        funFact: "The roar of the lions in the original animated movie isn't actually made by lions. It's a voice actor growling into a metal trash can to make it echo!"
      }
    ],
    medium: [
      {
        question: "Which movie won the Academy Award for Best Picture in 2020, becoming the first non-English language film to do so?",
        options: ["Roma", "Parasite", "Minari", "Crouching Tiger, Hidden Dragon"],
        correctAnswer: "Parasite",
        funFact: "Director Bong Joon-ho actually built the entire multi-level 'rich house' from scratch just for the movie; it wasn't a real home!"
      },
      {
        question: "In Breaking Bad, what unique physical characteristic makes Walter White's methamphetamine so famous?",
        options: ["It smells like vanilla", "It is perfectly spherical", "It has a distinct blue color", "It dissolves instantly in water"],
        correctAnswer: "It has a distinct blue color",
        funFact: "The famous 'blue meth' used as a prop on the set of Breaking Bad was actually just blue-tinted rock candy."
      },
      {
        question: "At which award show did Lady Gaga wear her infamous 'meat dress'?",
        options: ["The Grammys", "The Oscars", "The MTV Video Music Awards", "The Met Gala"],
        correctAnswer: "The MTV Video Music Awards",
        funFact: "The meat dress was 100% real raw beef. After the show, it was preserved by taxidermists and turned into a type of beef jerky to be displayed in a museum."
      },
      {
        question: "What is the name of the fictional town in Indiana where Parks and Recreation is set?",
        options: ["Scranton", "Pawnee", "Eagleton", "Springfield"],
        correctAnswer: "Pawnee",
        funFact: "The writers initially created Pawnee's rival town, Eagleton, simply because they needed an excuse to shoot an episode in a slightly nicer, wealthier-looking neighborhood."
      },
      {
        question: "What was the very first movie officially released in the Marvel Cinematic Universe?",
        options: ["The Incredible Hulk", "Captain America: The First Avenger", "Iron Man", "Thor"],
        correctAnswer: "Iron Man",
        funFact: "During the filming of Iron Man in 2008, the script was completely unfinished. Robert Downey Jr. and the director improvised a massive portion of the dialogue right on set."
      },
      {
        question: "What is the name of Jon Snow's direwolf in Game of Thrones?",
        options: ["Nymeria", "Grey Wind", "Summer", "Ghost"],
        correctAnswer: "Ghost",
        funFact: "Sophie Turner, who played Sansa Stark, actually adopted the dog that played her direwolf, Lady, in real life."
      },
      {
        question: "What physical object does Leonardo DiCaprio’s character use to check if he is dreaming in Inception?",
        options: ["A loaded die", "A chess piece", "A pocket watch", "A spinning top"],
        correctAnswer: "A spinning top",
        funFact: "Christopher Nolan has never officially confirmed if the top falls at the end of the movie, leaving the ending permanently up to audience interpretation."
      },
      {
        question: "What is Madonna's full birth name?",
        options: ["Madonna Louise Ciccone", "Madonna Marie Perry", "Madonna Angela Rossi", "Madonna Elizabeth Smith"],
        correctAnswer: "Madonna Louise Ciccone",
        funFact: "Before she became a massive global superstar, Madonna worked at a Dunkin' Donuts in Times Square—and supposedly got fired for squirting jelly at a customer."
      },
      {
        question: "What was the title of Kanye West's debut studio album released in 2004?",
        options: ["Late Registration", "Graduation", "The College Dropout", "808s & Heartbreak"],
        correctAnswer: "The College Dropout",
        funFact: "Kanye recorded his breakout single 'Through the Wire' literally with his jaw wired shut after surviving a nearly fatal car crash."
      },
      {
        question: "Which of these was Quentin Tarantino’s first feature-length film as a director?",
        options: ["Pulp Fiction", "Reservoir Dogs", "Jackie Brown", "Kill Bill"],
        correctAnswer: "Reservoir Dogs",
        funFact: "The movie's budget was so low that most of the actors had to bring their own clothes to wear as costumes on set."
      },
      {
        question: "In Doctor Who, the TARDIS is disguised as what ordinary object?",
        options: ["A red telephone box", "A blue police public call box", "A postbox", "A grandfather clock"],
        correctAnswer: "A blue police public call box",
        funFact: "The TARDIS is only stuck as a police box because its 'chameleon circuit' broke in the very first episode back in 1963, and the Doctor just never fixed it."
      },
      {
        question: "What was the original title of the first Harry Potter book when it was published in the UK?",
        options: ["Harry Potter and the Sorcerer's Stone", "Harry Potter and the Philosopher's Stone", "Harry Potter and the Magic Stone", "Harry Potter and the Alchemist's Secret"],
        correctAnswer: "Harry Potter and the Philosopher's Stone",
        funFact: "The US publishers changed the word 'Philosopher' to 'Sorcerer' because they believed American children wouldn't want to read a book that sounded too much like academics."
      },
      {
        question: "How did the legendary television series The Sopranos famously end?",
        options: ["Tony goes to prison", "A massive shootout", "A sudden cut to black mid-sentence", "Tony escapes to Italy"],
        correctAnswer: "A sudden cut to black mid-sentence",
        funFact: "When the finale aired in 2007, millions of viewers actually thought their cable TV had completely disconnected or gone out during the sudden black screen."
      },
      {
        question: "At which award show did Britney Spears famously perform with a live python draped over her shoulders?",
        options: ["The 2000 Grammys", "The 2001 MTV Video Music Awards", "The 2003 Billboard Music Awards", "The 1999 Teen Choice Awards"],
        correctAnswer: "The 2001 MTV Video Music Awards",
        funFact: "Britney was absolutely terrified of snakes. She spent days psyching herself up for the performance and refused to rehearse with the snake until the last minute."
      },
      {
        question: "Which legendary musician's real name is Reginald Kenneth Dwight?",
        options: ["David Bowie", "Freddie Mercury", "Elton John", "Mick Jagger"],
        correctAnswer: "Elton John",
        funFact: "Elton John is a massive music buyer—he reportedly buys a new copy of every single album released on CD each week just to listen to new sounds."
      },
      {
        question: "What is the name of the haunted hotel in Stephen King's The Shining?",
        options: ["The Bates Motel", "The Overlook Hotel", "The Stanley Hotel", "The Dolphin Hotel"],
        correctAnswer: "The Overlook Hotel",
        funFact: "Stephen King famously hated Stanley Kubrick's movie adaptation of his book, mostly because he felt the director ruined the character of Jack Torrance."
      },
      {
        question: "What kind of car is turned into a time machine in Back to the Future?",
        options: ["A Pontiac Firebird", "A Ford Mustang", "A DeLorean DMC-12", "A Chevy Impala"],
        correctAnswer: "A DeLorean DMC-12",
        funFact: "In the original script, the time machine wasn't a car at all—it was a refrigerator. Steven Spielberg changed it because he was terrified kids would lock themselves in fridges."
      },
      {
        question: "Which of the following was NOT a member of Destiny's Child?",
        options: ["Beyoncé Knowles", "Kelly Rowland", "Michelle Williams", "Ciara Harris"],
        correctAnswer: "Ciara Harris",
        funFact: "Before they were Destiny's Child, the group went through several names, including 'Girl's Tyme' when they competed (and lost) on Star Search in the early 90s."
      },
      {
        question: "At what Oscars ceremony did Will Smith infamously slap Chris Rock on stage?",
        options: ["2020", "2021", "2022", "2023"],
        correctAnswer: "2022",
        funFact: "Will Smith went on to win the Best Actor award less than an hour after the slap happened, resulting in one of the most awkward acceptance speeches in television history."
      },
      {
        question: "Who was the drummer for Nirvana before becoming the frontman of the Foo Fighters?",
        options: ["Chad Smith", "Travis Barker", "Dave Grohl", "Taylor Hawkins"],
        correctAnswer: "Dave Grohl",
        funFact: "Dave Grohl actually recorded the very first Foo Fighters album entirely by himself. He played every single instrument on the record."
      },
      {
        question: "Which classic film features the famous line, 'Here's looking at you, kid'?",
        options: ["Gone with the Wind", "Casablanca", "Citizen Kane", "The Godfather"],
        correctAnswer: "Casablanca",
        funFact: "That iconic line wasn't actually in the script. Humphrey Bogart improvised it while teaching his co-star Ingrid Bergman how to play poker between takes."
      },
      {
        question: "What is the name of the alternate dimension in Stranger Things?",
        options: ["The Void", "The Other Side", "The Upside Down", "The Shadow Realm"],
        correctAnswer: "The Upside Down",
        funFact: "The sound effect for the creepy Demogorgon monster in season one is actually created by layering the sounds of a crying baby and rustling dry leaves."
      },
      {
        question: "Which artist won Album of the Year at the Grammys three times (for Fearless, 1989, and Folklore)?",
        options: ["Adele", "Taylor Swift", "Beyoncé", "Billie Eilish"],
        correctAnswer: "Taylor Swift",
        funFact: "Taylor Swift wrote the entirety of her third album, 'Speak Now', completely by herself with zero co-writers, just to prove to critics that she actually wrote her own music."
      },
      {
        question: "What is the name of the fictional African country where Black Panther is set?",
        options: ["Zamunda", "Genosha", "Wakanda", "Krakoa"],
        correctAnswer: "Wakanda",
        funFact: "The beautiful native language spoken in Wakanda is actually Xhosa, a real-world language spoken by millions of people in South Africa and Zimbabwe."
      },
      {
        question: "Which iconic sitcom character created a game called 'True American'?",
        options: ["Barney Stinson (HIMYM)", "Nick Miller (New Girl)", "Joey Tribbiani (Friends)", "Charlie Kelly (It's Always Sunny)"],
        correctAnswer: "Nick Miller (New Girl)",
        funFact: "The rules of 'True American' were never fully written down by the show's creators. They mostly just encouraged the actors to yell random historical facts and drink."
      },
      {
        question: "Which director is famous for his obsession with using practical effects and directed Interstellar and Oppenheimer?",
        options: ["James Cameron", "Denis Villeneuve", "Christopher Nolan", "Ridley Scott"],
        correctAnswer: "Christopher Nolan",
        funFact: "For Oppenheimer, Nolan refused to use CGI for the atomic blast. His team figured out how to recreate the visual of a nuclear explosion using highly flammable chemicals and forced perspective."
      },
      {
        question: "Who holds the record for the most Oscar nominations for acting?",
        options: ["Jack Nicholson", "Meryl Streep", "Katharine Hepburn", "Daniel Day-Lewis"],
        correctAnswer: "Meryl Streep",
        funFact: "Despite having over 20 nominations, Meryl Streep actually left her very first Oscar statuette on top of a toilet at the governor's ball right after winning it!"
      },
      {
        question: "In the TV show The Office, what kind of farm does Dwight Schrute own?",
        options: ["A dairy farm", "A beet farm", "A potato farm", "A horse ranch"],
        correctAnswer: "A beet farm",
        funFact: "Rainn Wilson, the actor who plays Dwight, actually loves the outdoors in real life but knows absolutely nothing about farming."
      },
      {
        question: "What pop punk band released the seminal album 'Enema of the State' in 1999?",
        options: ["Green Day", "Fall Out Boy", "Blink-182", "Sum 41"],
        correctAnswer: "Blink-182",
        funFact: "The band originally just called themselves 'Blink', but had to add the '-182' after an Irish techno band threatened to sue them over the name."
      },
      {
        question: "Which actor voiced the character of Darth Vader in the original Star Wars trilogy?",
        options: ["David Prowse", "James Earl Jones", "Mark Hamill", "Alec Guinness"],
        correctAnswer: "James Earl Jones",
        funFact: "While James Earl Jones provided the legendary voice, the man physically inside the suit was a 6-foot-6 British bodybuilder named David Prowse."
      }
    ],
    hard: [
      {
        question: "Which musical artist holds the record for the most Grammy Awards won in history?",
        options: ["Quincy Jones", "Paul McCartney", "Beyoncé", "Stevie Wonder"],
        correctAnswer: "Beyoncé",
        funFact: "In 2023, Beyoncé won her 32nd Grammy, officially breaking a 26-year-old record previously held by Hungarian-British classical conductor Georg Solti."
      },
      {
        question: "What was the very first music video ever broadcast on MTV when the network launched on August 1, 1981?",
        options: ["'Video Killed the Radio Star' by The Buggles", "'You Better Run' by Pat Benatar", "'Money for Nothing' by Dire Straits", "'Thriller' by Michael Jackson"],
        correctAnswer: "'Video Killed the Radio Star' by The Buggles",
        funFact: "The second video played on MTV was Pat Benatar's 'You Better Run'. Funnily enough, MTV actually forgot to tell some of the artists they were launching the network that day."
      },
      {
        question: "In the 1989 Batman movie starring Michael Keaton, what is the real name of the character who becomes The Joker?",
        options: ["Arthur Fleck", "Jack Napier", "Jeremiah Valeska", "Oswald Cobblepot"],
        correctAnswer: "Jack Napier",
        funFact: "Jack Nicholson famously negotiated a legendary contract for this movie, taking a massive pay cut in exchange for a percentage of the box office and all Joker merchandise sales. It made him over $50 million."
      },
      {
        question: "Which renowned film director directed the iconic music video for Michael Jackson's song 'Bad'?",
        options: ["Steven Spielberg", "Francis Ford Coppola", "Martin Scorsese", "David Fincher"],
        correctAnswer: "Martin Scorsese",
        funFact: "The full version of the 'Bad' music video is actually an 18-minute short film. It also features a young, unknown actor making his debut: Wesley Snipes."
      },
      {
        question: "What was the first animated film in history to be nominated for the Academy Award for Best Picture?",
        options: ["Snow White and the Seven Dwarfs", "The Lion King", "Spirited Away", "Beauty and the Beast"],
        correctAnswer: "Beauty and the Beast",
        funFact: "It achieved this historic nomination in 1991, competing alongside heavy-hitting live-action dramas like 'The Silence of the Lambs' and 'JFK'."
      },
      {
        question: "In the critically acclaimed 90s sitcom 'Frasier', what was the real name of the Jack Russell Terrier who played Frasier's dog, Eddie?",
        options: ["Moose", "Skip", "Barkley", "Bingo"],
        correctAnswer: "Moose",
        funFact: "Moose the dog was so incredibly popular during the show's run that he regularly received more fan mail than any of his human co-stars."
      },
      {
        question: "Which of these massive 1980s pop hits was actually written by Prince under the pseudonym 'Christopher'?",
        options: ["'I Feel for You' by Chaka Khan", "'Manic Monday' by The Bangles", "'Stand Back' by Stevie Nicks", "'Hungry Like the Wolf' by Duran Duran"],
        correctAnswer: "'Manic Monday' by The Bangles",
        funFact: "Prince reportedly used a fake name because he didn't want his massive superstar status to overshadow the band and distract from their success."
      },
      {
        question: "What is the name of the sinister, mega-corporation that serves as the overarching antagonist in the 'Alien' movie franchise?",
        options: ["Cyberdyne Systems", "Tyrell Corporation", "Weyland-Yutani", "Omni Consumer Products"],
        correctAnswer: "Weyland-Yutani",
        funFact: "The corporation's overly optimistic, cynical slogan seen in the movies is 'Building Better Worlds'."
      },
      {
        question: "In the Lord of the Rings: The Two Towers, actor Viggo Mortensen (Aragorn) lets out a visceral scream of anguish while kicking a helmet. Why was this scream so realistic?",
        options: ["He actually broke two of his toes during that exact take.", "He thought another actor was injured on set.", "Director Peter Jackson surprised him with a loud explosion.", "He was suffering from severe hypothermia."],
        correctAnswer: "He actually broke two of his toes during that exact take.",
        funFact: "Instead of calling 'cut' when he broke his toes, Mortensen stayed in character and used the genuine physical pain to power through the emotional scene."
      },
      {
        question: "Who was the very first guest to ever appear on 'Late Night with David Letterman' when it premiered in 1982?",
        options: ["Steve Martin", "Robin Williams", "Bill Murray", "Tom Hanks"],
        correctAnswer: "Bill Murray",
        funFact: "Bill Murray became a massive good-luck charm for Letterman. He was not only the first guest on 'Late Night', but also the first guest on Letterman's later CBS show, and his final guest before he retired."
      },
      {
        question: "Which author wrote the 1968 science fiction novel that the movie 'Blade Runner' was based on?",
        options: ["Isaac Asimov", "Arthur C. Clarke", "Philip K. Dick", "William Gibson"],
        correctAnswer: "Philip K. Dick",
        funFact: "The actual title of the book is completely different from the movie. It is titled 'Do Androids Dream of Electric Sheep?'."
      },
      {
        question: "In the legendary horror movie 'Scream' (1996), director Wes Craven makes a stealthy cameo as a janitor named Fred. What is he wearing?",
        options: ["A Ghostface mask pushed up on his head", "A bloody apron", "A red and green striped sweater", "A Woodsboro High letterman jacket"],
        correctAnswer: "A red and green striped sweater",
        funFact: "The red and green striped sweater is a direct nod to Freddy Krueger, the iconic villain Craven created for 'A Nightmare on Elm Street'."
      },
      {
        question: "Which artist originally recorded the song 'Tainted Love' in 1965, long before Soft Cell turned it into an 80s synth-pop anthem?",
        options: ["Diana Ross", "Gloria Jones", "Dusty Springfield", "Aretha Franklin"],
        correctAnswer: "Gloria Jones",
        funFact: "Gloria Jones's original, upbeat soul version was actually a massive commercial flop when it released. It was completely forgotten until British club DJs discovered it years later."
      },
      {
        question: "Which legendary entertainer was the very first Black woman to achieve an EGOT (winning an Emmy, Grammy, Oscar, and Tony)?",
        options: ["Diana Ross", "Viola Davis", "Whoopi Goldberg", "Aretha Franklin"],
        correctAnswer: "Whoopi Goldberg",
        funFact: "Whoopi clinched her EGOT status in 2002. She won her Oscar for 'Ghost', her Grammy for Best Comedy Recording, and her Tony for producing the musical 'Thoroughly Modern Millie'."
      },
      {
        question: "In the universe of Frank Herbert’s 'Dune', what is the specific name of the highly valuable, life-extending resource found only on the planet Arrakis?",
        options: ["Vibranium", "Unobtainium", "Melange", "Tiberium"],
        correctAnswer: "Melange",
        funFact: "Commonly just called 'The Spice', Herbert was heavily inspired by his own research into the cultivation of hallucinogenic mushrooms when writing about Melange."
      },
      {
        question: "What was the name of the incredibly influential, surreal 1990s television show co-created by David Lynch and Mark Frost?",
        options: ["The X-Files", "Twin Peaks", "The Twilight Zone", "Fringe"],
        correctAnswer: "Twin Peaks",
        funFact: "When the show was originally pitched to network executives, it didn't have its iconic name yet. It was pitched under the working title 'Northwest Passage'."
      },
      {
        question: "In the classic N64 video game 'The Legend of Zelda: Ocarina of Time', what is the name of Link's trusty horse?",
        options: ["Agro", "Roach", "Epona", "Shadowmere"],
        correctAnswer: "Epona",
        funFact: "The creators didn't just make the name up—Epona is actually named after the real-world ancient Gallo-Roman goddess of horses and fertility."
      },
      {
        question: "What studio album did Michael Jackson release directly following the massive success of 'Thriller'?",
        options: ["Off the Wall", "Dangerous", "Bad", "HIStory"],
        correctAnswer: "Bad",
        funFact: "The 'Bad' album was an absolute juggernaut. It produced five consecutive Billboard Hot 100 number one singles, a record that remained unbroken for decades."
      },
      {
        question: "What short-lived but highly influential 1999 television series launched the careers of Seth Rogen, James Franco, and Jason Segel?",
        options: ["Undeclared", "Party Down", "My So-Called Life", "Freaks and Geeks"],
        correctAnswer: "Freaks and Geeks",
        funFact: "Despite its massive cult following and launching the careers of several Hollywood A-listers, the show was canceled before its first season even finished airing."
      },
      {
        question: "What is the highest-grossing R-rated movie of all time at the worldwide box office?",
        options: ["Deadpool & Wolverine", "Joker", "Oppenheimer", "The Matrix Reloaded"],
        correctAnswer: "Deadpool & Wolverine",
        funFact: "Deadpool & Wolverine absolutely shattered records in 2024, finally taking the crown from 'Joker', which had previously held the title for years."
      }
    ]
  },
  sport: {
      easy: [
        {
          id: "s_e1",
          question: "How many players are on the field for one soccer team during a standard match?",
          options: ["9", "10", "11", "12"],
          correctAnswer: "11",
          funFact: "The fastest red card in professional soccer history was given just 2 seconds after the opening whistle!"
        },
        {
          id: "s_e2",
          question: "How high is a regulation NBA basketball hoop from the floor?",
          options: ["9 feet", "10 feet", "11 feet", "12 feet"],
          correctAnswer: "10 feet",
          funFact: "When basketball was first invented in 1891, they used actual peach baskets. The referee had to climb a ladder to get the ball out after every single point."
        },
        {
          id: "s_e3",
          question: "How many bases are there on a standard baseball diamond (including home plate)?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "4",
          funFact: "The bases are exactly 90 feet apart. It was decided over a century ago, and mathematicians have proven it's the absolute perfect distance to make close plays at first base."
        },
        {
          id: "s_e4",
          question: "In tennis, what is a score of zero called?",
          options: ["Nil", "Zero", "Naught", "Love"],
          correctAnswer: "Love",
          funFact: "The term 'love' likely comes from the French word 'l'oeuf', which means 'the egg', because an egg looks like a zero."
        },
        {
          id: "s_e5",
          question: "How many points is a touchdown worth in American football (before the extra point)?",
          options: ["3", "6", "7", "8"],
          correctAnswer: "6",
          funFact: "In the very early days of American football, a touchdown was actually only worth 4 points, and kicking a field goal was considered more valuable!"
        },
        {
          id: "s_e6",
          question: "Which legendary boxer famously said, 'Float like a butterfly, sting like a bee'?",
          options: ["Mike Tyson", "George Foreman", "Muhammad Ali", "Joe Frazier"],
          correctAnswer: "Muhammad Ali",
          funFact: "Ali actually had his bicycle stolen when he was 12 years old. He told a police officer he wanted to 'whup' the thief, and the officer told him he better learn how to box first."
        },
        {
          id: "s_e7",
          question: "How often are the Summer Olympic Games held?",
          options: ["Every 2 years", "Every 3 years", "Every 4 years", "Every 5 years"],
          correctAnswer: "Every 4 years",
          funFact: "The gold medals given out at the Olympics are actually mostly made of silver! They only contain about 1% actual solid gold."
        },
        {
          id: "s_e8",
          question: "In golf, what is the term for completing a hole one stroke under par?",
          options: ["Eagle", "Birdie", "Bogey", "Albatross"],
          correctAnswer: "Birdie",
          funFact: "The term 'birdie' originated in 1899 when an American golfer hit a great shot and called it a 'bird of a shot', which was 19th-century slang for something excellent."
        },
        {
          id: "s_e9",
          question: "What is a standard ice hockey puck made out of?",
          options: ["Hard plastic", "Vulcanized rubber", "Compressed carbon", "Lead"],
          correctAnswer: "Vulcanized rubber",
          funFact: "Before games, NHL pucks are actually frozen solid. If they weren't frozen, they would bounce all over the ice like a rubber ball."
        },
        {
          id: "s_e10",
          question: "Which sport is known as 'America's Pastime'?",
          options: ["Basketball", "American Football", "Baseball", "Ice Hockey"],
          correctAnswer: "Baseball",
          funFact: "During World War II, the U.S. military designed grenades to be the exact same size and weight as a baseball so American soldiers could throw them naturally."
        },
          
        {
          id: "s_e11",
          question: "What object is hit back and forth in a game of badminton?",
          options: ["A ball", "A puck", "A shuttlecock", "A dart"],
          correctAnswer: "A shuttlecock",
          funFact: "A professional badminton smash can travel over 300 mph—making the shuttlecock faster than a Formula 1 race car!"
        },
        {
          id: "s_e12",
          question: "What are the five colors of the Olympic rings?",
          options: ["Red, Blue, Green, Yellow, Black", "Red, White, Blue, Gold, Silver", "Orange, Purple, Green, Yellow, Black", "Red, Blue, Green, White, Black"],
          correctAnswer: "Red, Blue, Green, Yellow, Black",
          funFact: "Those specific five colors were chosen because at least one of them appears on the flag of every single competing nation in the world."
        },
        {
          id: "s_e13",
          question: "What is the annual championship game of the NFL called?",
          options: ["The World Series", "The Super Bowl", "The Pro Bowl", "The Final Four"],
          correctAnswer: "The Super Bowl",
          funFact: "The name 'Super Bowl' was actually inspired by a children's toy called the 'Super Ball' that an NFL owner's daughter was playing with."
        },
        {
          id: "s_e14",
          question: "What is a perfect score in a single game of standard bowling?",
          options: ["100", "200", "300", "400"],
          correctAnswer: "300",
          funFact: "To achieve a perfect 300, a bowler has to bowl 12 consecutive strikes in a single game. It is incredibly rare for amateur players!"
        },
        {
          id: "s_e15",
          question: "The famous Wimbledon tournament is played in which sport?",
          options: ["Golf", "Cricket", "Tennis", "Rugby"],
          correctAnswer: "Tennis",
          funFact: "Wimbledon is the only major tennis tournament still played on real grass. They actually use a specialized hawk named Rufus to scare pigeons away from the courts."
        },
        {
          id: "s_e16",
          question: "In basketball, how many points is a standard free throw worth?",
          options: ["1", "2", "3", "0.5"],
          correctAnswer: "1",
          funFact: "Shaquille O'Neal is one of the most dominant basketball players ever, but he notoriously struggled with free throws, making only about half of them in his career."
        },
        {
          id: "s_e17",
          question: "How many holes are played in a standard, full round of golf?",
          options: ["9", "12", "18", "21"],
          correctAnswer: "18",
          funFact: "Legend has it that 18 holes was chosen because it takes exactly 18 shots to finish a standard bottle of Scotch whiskey on the course!"
        },
        {
          id: "s_e18",
          question: "In what Winter Olympic sport do players slide heavy stones down a sheet of ice while sweeping with brooms?",
          options: ["Bobsled", "Skeleton", "Curling", "Luge"],
          correctAnswer: "Curling",
          funFact: "The heavy granite stones used in Olympic curling are all sourced from one tiny, uninhabited island off the coast of Scotland."
        },
        {
          id: "s_e19",
          question: "The Tour de France is the most famous race in the world for which sport?",
          options: ["Marathon Running", "Auto Racing", "Cycling", "Swimming"],
          correctAnswer: "Cycling",
          funFact: "Riders in the Tour de France burn so many calories that they have to eat roughly 6,000 to 8,000 calories every single day of the race just to survive."
        },
        {
          id: "s_e20",
          question: "In bowling, what is it called when you knock down all ten pins on your first roll?",
          options: ["A Spare", "A Turkey", "A Strike", "A Split"],
          correctAnswer: "A Strike",
          funFact: "If you bowl three strikes in a row, it's traditionally called a 'Turkey'. Six in a row is a 'Wild Turkey', and nine is a 'Golden Turkey'."
        },
        {
          id: "s_e21",
          question: "Which country won the historic 2022 FIFA Men's World Cup in Qatar?",
          options: ["France", "Brazil", "Argentina", "England"],
          correctAnswer: "Argentina",
          funFact: "This victory finally gave Lionel Messi his first-ever World Cup trophy, cementing his legacy as one of the greatest soccer players in history."
        },
        {
          id: "s_e22",
          question: "Michael Phelps is the most decorated Olympian of all time. What is his sport?",
          options: ["Gymnastics", "Track and Field", "Swimming", "Diving"],
          correctAnswer: "Swimming",
          funFact: "Phelps has won 28 Olympic medals. If he were a country, he would have more gold medals than over 100 actual nations!"
        },
        {
          id: "s_e23",
          question: "In a standard soccer game, who is the only player allowed to intentionally touch the ball with their hands during open play?",
          options: ["The Striker", "The Referee", "The Captain", "The Goalkeeper"],
          correctAnswer: "The Goalkeeper",
          funFact: "Even the goalkeeper can't use their hands everywhere! They are only allowed to handle the ball inside their own designated penalty box."
        },
        {
          id: "s_e24",
          question: "In most traditional martial arts like Karate and Judo, what color belt represents the highest level of mastery?",
          options: ["Red", "Black", "White", "Gold"],
          correctAnswer: "Black",
          funFact: "In ancient times, students only had one white belt. It gradually turned black over years of training simply from accumulating sweat and dirt!"
        },
        {
          id: "s_e25",
          question: "In which sport can a player hit a 'home run'?",
          options: ["Cricket", "Baseball", "Tennis", "Golf"],
          correctAnswer: "Baseball",
          funFact: "The longest officially measured home run in Major League Baseball history was hit by Nomar Mazara in 2019, traveling an insane 505 feet."
        },
        {
          id: "s_e26",
          question: "How many quarters make up a standard American football game?",
          options: ["2", "3", "4", "5"],
          correctAnswer: "4",
          funFact: "Even though there are four 15-minute quarters, the average NFL broadcast lasts over 3 hours due to clock stoppages, commercials, and timeouts."
        },
        {
          id: "s_e27",
          question: "In track and field, what is the event where runners have to jump over a series of metal and plastic frames?",
          options: ["The Steeplechase", "The Hurdles", "The Long Jump", "The Pole Vault"],
          correctAnswer: "The Hurdles",
          funFact: "Unlike what you might think, knocking down a hurdle during a race doesn't actually disqualify you or result in a time penalty."
        },
        {
          id: "s_e28",
          question: "How long is a standard full marathon race?",
          options: ["13.1 miles", "20.0 miles", "26.2 miles", "30.5 miles"],
          correctAnswer: "26.2 miles",
          funFact: "The weird 0.2 miles was added during the 1908 London Olympics just so the race could finish exactly in front of the Royal Family's viewing box."
        },
        {
          id: "s_e29",
          question: "Serena Williams is widely considered one of the greatest athletes ever in which sport?",
          options: ["Track", "Tennis", "Gymnastics", "Basketball"],
          correctAnswer: "Tennis",
          funFact: "Serena won the 2017 Australian Open tournament without dropping a single set—while she was roughly eight weeks pregnant!"
        },
        {
          id: "s_e30",
          question: "What sport is also commonly known as 'Ping Pong'?",
          options: ["Badminton", "Squash", "Table Tennis", "Pickleball"],
          correctAnswer: "Table Tennis",
          funFact: "The name 'Ping Pong' was actually a trademarked brand name for the equipment. People had to start calling it 'Table Tennis' to avoid being sued."
        }
      ],
      medium: [
        {
          id: "s_m1",
          question: "Which country has won the most FIFA Men's World Cup titles?",
          options: ["Germany", "Italy", "Argentina", "Brazil"],
          correctAnswer: "Brazil",
          funFact: "Brazil has won the tournament 5 times and is the only country in the world to have played in every single World Cup tournament since it started in 1930."
        },
        {
          id: "s_m2",
          question: "As of 2023, who holds the record for being the NBA's all-time leading scorer?",
          options: ["Kobe Bryant", "Michael Jordan", "Kareem Abdul-Jabbar", "LeBron James"],
          correctAnswer: "LeBron James",
          funFact: "LeBron broke Kareem Abdul-Jabbar's record, which had stood for nearly 39 years—a record many sports analysts previously thought was completely unbreakable."
        },
        {
          id: "s_m3",
          question: "What color is the coveted jacket awarded to the winner of The Masters golf tournament?",
          options: ["Red", "Gold", "Green", "Blue"],
          correctAnswer: "Green",
          funFact: "You aren't allowed to keep the Green Jacket forever. Winners get to take it home for one year, but then they have to return it to the club, where they can only wear it on the grounds."
        },
        {
          id: "s_m4",
          question: "Which NFL team won the very first Super Bowl in 1967?",
          options: ["Kansas City Chiefs", "Green Bay Packers", "Chicago Bears", "New York Giants"],
          correctAnswer: "Green Bay Packers",
          funFact: "The first Super Bowl wasn't even called the Super Bowl. It was officially called the 'AFL-NFL World Championship Game', and tickets cost just $12!"
        },
        {
          id: "s_m5",
          question: "What is the color of the jersey worn by the overall time leader in the Tour de France?",
          options: ["Green", "Polka Dot", "White", "Yellow"],
          correctAnswer: "Yellow",
          funFact: "The yellow jersey ('maillot jaune') was chosen because the newspaper that originally sponsored the race back in 1919 was printed on yellow paper."
        },
        {
          id: "s_m6",
          question: "The famous sports team known as the 'All Blacks' represents which country in international rugby?",
          options: ["Australia", "South Africa", "New Zealand", "England"],
          correctAnswer: "New Zealand",
          funFact: "Before every match, the All Blacks perform the 'Haka', an intense, traditional Māori war dance designed to intimidate their opponents."
        },
        {
          id: "s_m7",
          question: "In what city were the first modern Olympic Games held in 1896?",
          options: ["Paris", "London", "Rome", "Athens"],
          correctAnswer: "Athens",
          funFact: "Winners at the very first modern Olympics didn't get gold medals. First place got a silver medal and an olive branch, and second place got a copper medal."
        },
        {
          id: "s_m8",
          question: "What is the name of the historic stadium where the Boston Red Sox play their home games?",
          options: ["Wrigley Field", "Yankee Stadium", "Fenway Park", "Dodger Stadium"],
          correctAnswer: "Fenway Park",
          funFact: "Fenway Park features a massive, 37-foot-tall left-field wall famously known as the 'Green Monster'. Inside the wall is a manual scoreboard where workers sit during the game."
        },
        {
          id: "s_m9",
          question: "Which Formula 1 team has won the most Constructors' Championships in the history of the sport?",
          options: ["McLaren", "Mercedes", "Red Bull Racing", "Ferrari"],
          correctAnswer: "Ferrari",
          funFact: "Enzo Ferrari originally started the team just to sponsor amateur drivers. He didn't even want to build road cars, but eventually had to sell them just to fund his racing team."
        },
        {
          id: "s_m10",
          question: "Which male tennis player holds the record for the most weeks ranked as World No. 1?",
          options: ["Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras"],
          correctAnswer: "Novak Djokovic",
          funFact: "Djokovic is known for his insane flexibility and diet. He completely cut out gluten after a doctor held a piece of bread against his stomach and measured his muscle weakness."
        },
        
        {
          id: "s_m11",
          question: "What is the maximum number of clubs a golfer is legally allowed to carry in their bag during a professional tournament?",
          options: ["10", "12", "14", "16"],
          correctAnswer: "14",
          funFact: "Carrying more than 14 clubs results in a massive penalty: two strokes for every single hole played with the extra clubs in the bag!"
        },
        {
          id: "s_m12",
          question: "What does the acronym 'NBA' stand for?",
          options: ["National Baseball Association", "National Basketball Association", "North American Basketball Alliance", "National Boxing Association"],
          correctAnswer: "National Basketball Association",
          funFact: "The NBA was originally founded in 1946 under a different name: the Basketball Association of America (BAA)."
        },
        {
          id: "s_m13",
          question: "Which NFL team is unique for having a completely blank orange helmet with no painted logo on the side?",
          options: ["Cincinnati Bengals", "Cleveland Browns", "Denver Broncos", "Chicago Bears"],
          correctAnswer: "Cleveland Browns",
          funFact: "The Browns are the only NFL team without a logo on their helmet. They actually tried to add a logo in the 1960s, but the fans hated it so much they immediately removed it."
        },
        {
          id: "s_m14",
          question: "Which city hosted the spectacular 2008 Summer Olympic Games?",
          options: ["London", "Beijing", "Tokyo", "Sydney"],
          correctAnswer: "Beijing",
          funFact: "The opening ceremony of the Beijing Olympics is considered one of the most expensive and perfectly synchronized live television events in human history."
        },
        {
          id: "s_m15",
          question: "In boxing and MMA, what does a 'TKO' stand for?",
          options: ["Total Knockout", "Technical Knockout", "Timed Knockout", "Tactical Knockout"],
          correctAnswer: "Technical Knockout",
          funFact: "A TKO happens when the referee, doctor, or a fighter's corner decides a fighter cannot safely continue, even if they aren't completely unconscious."
        },
        {
          id: "s_m16",
          question: "Legendary sprinter Usain Bolt competed internationally for which country?",
          options: ["United States", "Great Britain", "Jamaica", "Bahamas"],
          correctAnswer: "Jamaica",
          funFact: "During the 2008 Olympics where he broke the world record, Usain Bolt reportedly ate around 1,000 McDonald's Chicken McNuggets over 10 days because he didn't like the local food."
        },
        {
          id: "s_m17",
          question: "Which legendary golfer is famously known by the nickname 'The Golden Bear'?",
          options: ["Arnold Palmer", "Tiger Woods", "Jack Nicklaus", "Phil Mickelson"],
          correctAnswer: "Jack Nicklaus",
          funFact: "Nicklaus won a record-breaking 18 major championships during his career, a record that even Tiger Woods has not been able to beat."
        },
        {
          id: "s_m18",
          question: "How many standard periods are played in a professional ice hockey game?",
          options: ["2", "3", "4", "It's played in halves"],
          correctAnswer: "3",
          funFact: "Because hockey periods are exactly 20 minutes long, the ice gets extremely chewed up. They use two intermissions specifically so the Zamboni has time to resurface the ice twice."
        },
        {
          id: "s_m19",
          question: "What is the exact diameter of a regulation NBA basketball hoop?",
          options: ["16 inches", "18 inches", "20 inches", "22 inches"],
          correctAnswer: "18 inches",
          funFact: "An 18-inch hoop is actually nearly twice as wide as a standard basketball! This means you can theoretically fit two basketballs through the rim at the exact same time."
        },
        {
          id: "s_m20",
          question: "In horse racing, winning the Kentucky Derby, the Preakness Stakes, and the Belmont Stakes in the same year is known as winning what?",
          options: ["The Grand Slam", "The Triple Crown", "The King's Cup", "The Golden Derby"],
          correctAnswer: "The Triple Crown",
          funFact: "It is so difficult to win that there was a massive 37-year gap between Triple Crown winners until a horse named American Pharoah finally won it in 2015."
        },
        {
          id: "s_m21",
          question: "What sport features players swinging wooden bats at a heavy ball while running between two 'wickets'?",
          options: ["Polo", "Croquet", "Cricket", "Rounders"],
          correctAnswer: "Cricket",
          funFact: "Cricket matches can last a shockingly long time. Traditional 'Test' cricket matches actually last for up to five full days!"
        },
        {
          id: "s_m22",
          question: "Despite its cold climate, what sport is officially recognized as the national summer sport of Canada?",
          options: ["Ice Hockey", "Baseball", "Lacrosse", "Rowing"],
          correctAnswer: "Lacrosse",
          funFact: "Lacrosse was invented by Indigenous peoples of North America hundreds of years ago. Early games sometimes involved hundreds of players on a field miles long."
        },
        {
          id: "s_m23",
          question: "How many players are on the court for one team during a standard indoor volleyball match?",
          options: ["4", "5", "6", "7"],
          correctAnswer: "6",
          funFact: "Players constantly rotate positions clockwise every time their team wins the right to serve, meaning everyone eventually plays both the front and back row."
        },
        {
          id: "s_m24",
          question: "Including the two 10-yard end zones, how long is an entire American football field?",
          options: ["100 yards", "110 yards", "120 yards", "130 yards"],
          correctAnswer: "120 yards",
          funFact: "The field dimensions have never changed since 1912. However, the goalposts used to be located at the front of the endzone, which caused players to constantly crash into them."
        },
        {
          id: "s_m25",
          question: "What is the exact length of a standard Olympic-size swimming pool?",
          options: ["25 meters", "50 meters", "75 meters", "100 meters"],
          correctAnswer: "50 meters",
          funFact: "An Olympic pool holds roughly 660,000 gallons of water. It is so heavy that engineers have to account for the physical weight of the water when designing the building's foundation."
        },
        {
          id: "s_m26",
          question: "In a standard game of darts, how many points is a dead-center 'inner bullseye' worth?",
          options: ["25", "50", "100", "It instantly wins the game"],
          correctAnswer: "50",
          funFact: "The inner bullseye isn't actually the highest-scoring spot on the board! Hitting the 'triple 20' ring scores 60 points, which is what pros always aim for."
        },
        {
          id: "s_m27",
          question: "In Major League Baseball scorekeeping, what single letter is famously used to record a strikeout?",
          options: ["S", "O", "K", "X"],
          correctAnswer: "K",
          funFact: "The letter 'K' was chosen in the 1800s simply because it was the last letter of the word 'struck'. (And 'S' was already taken for 'Sacrifice')."
        },
        {
          id: "s_m28",
          question: "Legend says the sport of Rugby was invented when a player named William Webb Ellis picked up the ball and ran with it during a game of what?",
          options: ["Soccer (Football)", "Cricket", "Basketball", "Polo"],
          correctAnswer: "Soccer (Football)",
          funFact: "The Rugby World Cup trophy is still named the 'Webb Ellis Cup' to honor the schoolboy who supposedly broke the rules to invent the sport."
        },
        {
          id: "s_m29",
          question: "What bizarre beverage does the winner of the Indianapolis 500 motor race traditionally drink in victory lane?",
          options: ["Champagne", "Beer", "Milk", "Orange Juice"],
          correctAnswer: "Milk",
          funFact: "The tradition started in 1936 when a winning driver drank buttermilk because his mom told him it would refresh him on a hot day."
        },
        {
          id: "s_m30",
          question: "What does the 'PGA' in PGA Tour stand for?",
          options: ["Professional Golfers' Association", "Premier Golf Alliance", "Pro Golfing Authority", "Players Golf Association"],
          correctAnswer: "Professional Golfers' Association",
          funFact: "The PGA was officially formed way back in 1916. The winner of the very first PGA Championship took home a grand total of just $500."
        }
      ],
      hard: [
        {
          id: "s_h1",
          question: "Wilt Chamberlain holds the unbreakable record of scoring 100 points in a single NBA game in 1962. Which team was he playing against?",
          options: ["Boston Celtics", "Los Angeles Lakers", "New York Knicks", "Detroit Pistons"],
          correctAnswer: "New York Knicks",
          funFact: "There is no actual video footage of the 100-point game. The only audio is a radio broadcast, and the famous photo of him holding the '100' sign was scribbled by a PR guy in the locker room."
        },
        {
          id: "s_h2",
          question: "Who is the only soccer player in history to win three FIFA World Cup titles?",
          options: ["Diego Maradona", "Lionel Messi", "Cristiano Ronaldo", "Pelé"],
          correctAnswer: "Pelé",
          funFact: "Pelé won his first World Cup in 1958 when he was just 17 years old. To this day, he remains the youngest player to ever score in a World Cup final."
        },
        {
          id: "s_h3",
          question: "Who was the last Major League Baseball player to finish a season with a batting average over .400?",
          options: ["Babe Ruth", "Joe DiMaggio", "Ted Williams", "Tony Gwynn"],
          correctAnswer: "Ted Williams",
          funFact: "Going into the last day of the 1941 season, Williams was batting exactly .39955 (which rounds up to .400). His manager offered to bench him to protect the record, but Williams insisted on playing and went 6-for-8 to finish at .406."
        },
        {
          id: "s_h4",
          question: "The longest tennis match in history took place at Wimbledon in 2010 between John Isner and Nicolas Mahut. How long did it last?",
          options: ["7 hours, 12 minutes", "9 hours, 20 minutes", "11 hours, 5 minutes", "13 hours, 10 minutes"],
          correctAnswer: "11 hours, 5 minutes",
          funFact: "The match took so long that it had to be suspended due to darkness and played across three different days. The final set alone lasted over 8 hours."
        },
        {
          id: "s_h5",
          question: "Who was the very first professional boxer to defeat Muhammad Ali in the ring?",
          options: ["George Foreman", "Sonny Liston", "Ken Norton", "Joe Frazier"],
          correctAnswer: "Joe Frazier",
          funFact: "The fight, known as the 'Fight of the Century', took place in 1971. Both fighters were undefeated, and Frank Sinatra was ringside—not as a VIP, but working as a photographer for Life magazine so he could get a good seat."
        },
        {
          id: "s_h6",
          question: "Who was the first gymnast to ever score a perfect 10 at the Olympic Games?",
          options: ["Mary Lou Retton", "Olga Korbut", "Simone Biles", "Nadia Comăneci"],
          correctAnswer: "Nadia Comăneci",
          funFact: "When 14-year-old Nadia scored her perfect 10 in 1976, the electronic scoreboard wasn't programmed to display a '10.00'. It flashed '1.00' instead, causing massive confusion in the arena."
        },
        {
          id: "s_h7",
          question: "Wayne Gretzky holds the NHL record for most career points (goals + assists). Even if you took away all 894 of his goals, where would he rank in all-time points?",
          options: ["1st", "2nd", "5th", "10th"],
          correctAnswer: "1st",
          funFact: "Gretzky's assist numbers alone are so astronomically high that he would still be the all-time leading point scorer in NHL history without ever putting the puck in the net himself."
        },
        {
          id: "s_h8",
          question: "Who is the only player in NFL history to win the Super Bowl MVP award despite being on the losing team?",
          options: ["Dan Marino", "Jim Kelly", "Chuck Howley", "Fran Tarkenton"],
          correctAnswer: "Chuck Howley",
          funFact: "Howley won the award in Super Bowl V in 1971. He intercepted two passes and forced a fumble, but he actually refused to accept the award because his team lost the game."
        },
        {
          id: "s_h9",
          question: "Who holds the record for the highest individual score in a single Test cricket match, scoring 400 not out?",
          options: ["Sachin Tendulkar", "Don Bradman", "Brian Lara", "Ricky Ponting"],
          correctAnswer: "Brian Lara",
          funFact: "Brian Lara achieved this incredible milestone in 2004 against England. He also holds the record for the highest individual score in first-class cricket, hitting 501 not out in 1994."
        },
        {
          id: "s_h10",
          question: "Who was the very first golfer to ever shoot a sub-60 round (a 59) in an official PGA Tour event?",
          options: ["Tiger Woods", "Jack Nicklaus", "Arnold Palmer", "Al Geiberger"],
          correctAnswer: "Al Geiberger",
          funFact: "Geiberger shot his historic 59 in 1977. He earned the nickname 'Mr. 59' and was famous for eating peanut butter and jelly sandwiches during his rounds for energy."
        },
          
        {
          id: "s_h11",
          question: "Who stunned the world by winning Wimbledon in 1985 at age 17, becoming the youngest male singles champion ever and the first unseeded player to win?",
          options: ["Andre Agassi", "Pete Sampras", "Boris Becker", "John McEnroe"],
          correctAnswer: "Boris Becker",
          funFact: "Because he was unseeded and practically unknown, Becker didn't even have an official clothing sponsor and wore cheap, off-the-rack tennis gear during his historic run."
        },
        {
          id: "s_h12",
          question: "Who is the only athlete in history to hit a Major League Baseball home run and score an NFL touchdown in the exact same week?",
          options: ["Bo Jackson", "Deion Sanders", "Jim Thorpe", "Brian Jordan"],
          correctAnswer: "Deion Sanders",
          funFact: "Deion Sanders 'Prime Time' once played an NFL game for the Falcons and an MLB game for the Braves on the exact same day, taking a helicopter between stadiums."
        },
        {
          id: "s_h13",
          question: "Despite its relatively small population, which country has won the most total medals in the history of the Winter Olympics?",
          options: ["United States", "Russia", "Canada", "Norway"],
          correctAnswer: "Norway",
          funFact: "Norway is an absolute powerhouse in cross-country skiing, which accounts for a massive percentage of their record-breaking medal haul."
        },
        {
          id: "s_h14",
          question: "As of recent years, who holds the all-time record for the most goals scored in men's international soccer history?",
          options: ["Lionel Messi", "Cristiano Ronaldo", "Pelé", "Ali Daei"],
          correctAnswer: "Cristiano Ronaldo",
          funFact: "Ronaldo broke the long-standing record previously held by Iranian striker Ali Daei. Ronaldo is known for his insane jumping ability, once leaping 8.5 feet in the air for a header."
        },
        {
          id: "s_h15",
          question: "Who holds the NFL record for the longest successfully kicked field goal at a massive 66 yards?",
          options: ["Matt Prater", "Justin Tucker", "Adam Vinatieri", "Sebastian Janikowski"],
          correctAnswer: "Justin Tucker",
          funFact: "Tucker's 66-yard kick didn't just break the record; it won the game as the clock expired, and the ball famously bounced directly off the crossbar and through the uprights."
        },
        {
          id: "s_h16",
          question: "Which MLB pitcher threw a mind-blowing 7 career no-hitters, holding a record that many consider completely unbreakable?",
          options: ["Sandy Koufax", "Randy Johnson", "Cy Young", "Nolan Ryan"],
          correctAnswer: "Nolan Ryan",
          funFact: "Nolan Ryan pitched in the major leagues across four different decades. He threw his final no-hitter in 1991 when he was 44 years old!"
        },
        {
          id: "s_h17",
          question: "NBA legend Kareem Abdul-Jabbar was known by what name before he converted to Islam and changed it in 1971?",
          options: ["Cassius Clay", "Lew Alcindor", "Chris Jackson", "Ron Artest"],
          correctAnswer: "Lew Alcindor",
          funFact: "During his college career as Lew Alcindor at UCLA, he was so utterly dominant that the NCAA actually banned dunking the basketball for 10 years just to make it fair for other teams."
        },
        {
          id: "s_h18",
          question: "When the legendary horse Secretariat won the 1973 Belmont Stakes to capture the Triple Crown, by how many lengths did he win?",
          options: ["10 lengths", "15 lengths", "21 lengths", "31 lengths"],
          correctAnswer: "31 lengths",
          funFact: "Secretariat's victory is considered one of the greatest athletic performances by an animal in history. After he died, an autopsy revealed his heart was two-and-a-half times larger than a normal horse's."
        },
        {
          id: "s_h19",
          question: "Which Boston Celtics legend holds the record for the most NBA Championships won as a player, with an incredible 11 rings?",
          options: ["Larry Bird", "Bill Russell", "Bob Cousy", "John Havlicek"],
          correctAnswer: "Bill Russell",
          funFact: "Bill Russell has so many championship rings that he literally doesn't have enough fingers to wear them all. The NBA Finals MVP trophy is officially named in his honor."
        },
        {
          id: "s_h20",
          question: "Who holds the unbreakable MLB record for the most career pitching wins at 511?",
          options: ["Walter Johnson", "Greg Maddux", "Cy Young", "Christy Mathewson"],
          correctAnswer: "Cy Young",
          funFact: "To put 511 wins in perspective, a modern pitcher would have to win 20 games a season (which is very rare) for 25 consecutive years just to tie him!"
        }
      ]
  },

  smart: {
      easy: [
        {
          id: "es_e1",
          question: "What is the absolute worst thing you can pour onto a grease fire in your kitchen?",
          options: ["Baking soda", "Salt", "Water", "Sand"],
          correctAnswer: "Water",
          funFact: "Pouring water on a grease fire causes the water to instantly vaporize into steam, which explodes outward and carries the burning oil everywhere!"
        },
        {
          id: "es_e2",
          question: "When turning a standard screw, bolt, or valve, which phrase helps you remember the correct direction to tighten it?",
          options: ["Righty-tighty, lefty-loosey", "Lefty-tighty, righty-loosey", "Up to lock, down to drop", "Clockwise to drop, counter to lock"],
          correctAnswer: "Righty-tighty, lefty-loosey",
          funFact: "This rule applies to almost everything except for propane gas tanks and some bicycle pedals, which use 'reverse threads' specifically so they don't accidentally unscrew during use."
        },
        {
          id: "es_e3",
          question: "What does the 'CC' field stand for when sending an email?",
          options: ["Computer Copy", "Carbon Copy", "Contact Copy", "Current Copy"],
          correctAnswer: "Carbon Copy",
          funFact: "The term comes from the days of physical typewriters, where people used actual sheets of carbon paper between pages to make a physical duplicate of a letter."
        },
        {
          id: "es_e4",
          question: "If you want to quickly check if a raw egg has gone bad, what happens when you drop it in a glass of cold water?",
          options: ["It turns white", "It floats to the top", "It sinks flat to the bottom", "It immediately cracks"],
          correctAnswer: "It floats to the top",
          funFact: "As an egg ages, the shell becomes porous and allows air inside. If it floats, the air pocket is huge, meaning it's old and likely spoiled!"
        },
        {
          id: "es_e5",
          question: "Which of the following household cleaning products should you NEVER mix together because they create a toxic gas?",
          options: ["Vinegar and Baking Soda", "Bleach and Ammonia", "Soap and Lemon Juice", "Hydrogen Peroxide and Water"],
          correctAnswer: "Bleach and Ammonia",
          funFact: "Mixing them creates chloramine gas, which can cause severe respiratory damage. This is why you should never mix different brands of toilet bowl cleaners!"
        },
        {
          id: "es_e6",
          question: "What is the universally accepted standard percentage for a good tip at a sit-down restaurant in the United States?",
          options: ["5% to 10%", "10% to 12%", "15% to 20%", "25% to 30%"],
          correctAnswer: "15% to 20%",
          funFact: "The word 'TIP' is often falsely said to be an acronym for 'To Insure Promptness', but it actually comes from 17th-century criminal slang meaning 'to give or share'."
        },
        {
          id: "es_e7",
          question: "Which common household item is the best immediate treatment to soothe a minor, first-degree heat burn?",
          options: ["Butter", "Ice cubes", "Cool running water", "Toothpaste"],
          correctAnswer: "Cool running water",
          funFact: "Never put butter or ice on a burn! Butter traps the heat inside the skin, and direct ice can actually cause frostbite and further damage to the already compromised skin."
        },
        {
          id: "es_e8",
          question: "When reading the sidewall of a car tire, what does 'PSI' stand for?",
          options: ["Pounds per Square Inch", "Pressure Standard Index", "Pump System Indicator", "Pneumatic Surface Inflation"],
          correctAnswer: "Pounds per Square Inch",
          funFact: "You should always check your tire pressure when the tires are 'cold' (haven't been driven for a few hours). Driving heats up the air inside, increasing the pressure and giving a false reading."
        },
        {
          id: "es_e9",
          question: "What does the SPF number on a bottle of sunscreen indicate?",
          options: ["Skin Protection Factor", "Sun Protection Factor", "Solar Power Filtration", "Sunburn Prevention Formula"],
          correctAnswer: "Sun Protection Factor",
          funFact: "SPF only measures protection against UVB rays (which cause sunburns), not UVA rays (which cause aging). Always look for 'Broad Spectrum' to block both!"
        },
        {
          id: "es_e10",
          question: "If you are facing the rising sun in the early morning, which compass direction is directly to your left?",
          options: ["North", "South", "East", "West"],
          correctAnswer: "North",
          funFact: "The sun always rises in the East and sets in the West. Before modern GPS, early navigators used this absolute rule to orient their maps."
        },
        {
          id: "es_e11",
          question: "What does the abbreviation 'USB' stand for on your computer cables?",
          options: ["Universal Serial Bus", "United System Board", "User Software Bridge", "Utility Service Block"],
          correctAnswer: "Universal Serial Bus",
          funFact: "The USB was co-invented by Ajay Bhatt at Intel in 1994 to replace the chaotic mess of different, incompatible plugs that early computers used."
        },
        {
          id: "es_e12",
          question: "When jump-starting a dead car battery, which color jumper cable attaches to the positive (+) terminal?",
          options: ["Black", "Yellow", "Green", "Red"],
          correctAnswer: "Red",
          funFact: "Always connect the red (positive) cables first! If you connect the black (negative) first and the red clamp touches metal, it can create a massive spark and potentially explode the battery."
        },
        {
          id: "es_e13",
          question: "According to food safety standards, what is the safe internal temperature for cooked chicken to ensure all bacteria is killed?",
          options: ["130°F (54°C)", "145°F (62°C)", "165°F (74°C)", "180°F (82°C)"],
          correctAnswer: "165°F (74°C)",
          funFact: "Unlike beef, which is dense and only has bacteria on the surface, chicken is porous, meaning dangerous salmonella bacteria can live deep inside the center of the meat."
        },
        {
          id: "es_e14",
          question: "What does the acronym 'Wi-Fi' actually stand for?",
          options: ["Wireless Fidelity", "Wireless Fiber", "Wide Frequency", "It doesn't stand for anything"],
          correctAnswer: "It doesn't stand for anything",
          funFact: "It's a massive misconception that it means 'Wireless Fidelity'. The creators just hired a marketing firm to invent a catchy, friendly-sounding name because the actual tech name was 'IEEE 802.11b Direct Sequence'."
        },
        {
          id: "es_e15",
          question: "How long does the CDC recommend you scrub your hands with soap to effectively remove germs?",
          options: ["5 seconds", "10 seconds", "20 seconds", "45 seconds"],
          correctAnswer: "20 seconds",
          funFact: "If you don't want to count, 20 seconds is exactly how long it takes to sing the 'Happy Birthday' song from beginning to end, twice in a row."
        },
        {
          id: "es_e16",
          question: "When using a fire extinguisher, what does the acronym PASS stand for?",
          options: ["Pull, Aim, Squeeze, Sweep", "Push, Activate, Spray, Secure", "Point, Assess, Shoot, Stop", "Pull, Attack, Smother, Sweep"],
          correctAnswer: "Pull, Aim, Squeeze, Sweep",
          funFact: "Most people instinctively aim at the top of the flames, but you have to aim at the base of the fire to actually cut off the fuel source!"
        },
        {
          id: "es_e17",
          question: "What does the 'ZIP' in ZIP code stand for?",
          options: ["Zonal Index Protocol", "Zone Improvement Plan", "Zero Interval Placement", "Zoned Inland Post"],
          correctAnswer: "Zone Improvement Plan",
          funFact: "The US Postal Service introduced the ZIP code in 1963 and created a cartoon character named 'Mr. Zip' to convince the public to start using it on their letters."
        },
        {
          id: "es_e18",
          question: "Which of these is the correct way to treat a person who is experiencing a severe nosebleed?",
          options: ["Tilt the head far back", "Lie down flat on the floor", "Lean forward and pinch the soft part of the nose", "Blow the nose aggressively"],
          correctAnswer: "Lean forward and pinch the soft part of the nose",
          funFact: "Tilting your head back is actually a terrible idea! It causes the blood to drain down your throat, which can upset your stomach and cause vomiting."
        },
        {
          id: "es_e19",
          question: "What is the primary purpose of the 'ground' wire (usually the third prong) on an electrical plug?",
          options: ["To make the device run faster", "To save electricity", "To safely direct rogue electricity into the earth if there's a short circuit", "To hold the plug firmly in the wall"],
          correctAnswer: "To safely direct rogue electricity into the earth if there's a short circuit",
          funFact: "Without a ground wire, if a wire comes loose inside a metal appliance (like a toaster), the entire metal casing becomes electrified and will shock whoever touches it."
        },
        {
          id: "es_e20",
          question: "If a recipe calls for 'folding' in the ingredients, what exactly should you do?",
          options: ["Beat them furiously with a mixer", "Gently lift and turn the mixture from the bottom over the top", "Knead the dough with your hands", "Sift the dry ingredients twice"],
          correctAnswer: "Gently lift and turn the mixture from the bottom over the top",
          funFact: "Folding is crucial when working with whipped cream or egg whites. If you stir too fast, you'll pop all the tiny air bubbles and your cake will end up completely flat!"
        },
        {
          id: "es_e21",
          question: "What is the standard emergency number you should dial in the United Kingdom?",
          options: ["911", "000", "999", "112"],
          correctAnswer: "999",
          funFact: "Introduced in 1937, the UK's 999 was actually the very first dedicated emergency telephone number in the world."
        },
        {
          id: "es_e22",
          question: "Which type of plunger—the one with the flat bottom or the one with the extra rubber flange pulling out of the bottom—is specifically designed for toilets?",
          options: ["The flat bottom plunger", "The plunger with the flange", "Both work equally well", "Neither, they are for sinks only"],
          correctAnswer: "The plunger with the flange",
          funFact: "The standard flat-bottom plunger that most people buy is actually a 'cup plunger' meant strictly for flat surfaces like sinks and bathtubs. The flange plunger creates the seal needed for a toilet drain."
        },
        {
          id: "es_e23",
          question: "What does 'RSVP' stand for on a wedding invitation?",
          options: ["Reserve Seats Very Promptly", "Respond So We Visualise People", "Répondez s'il vous plaît", "Require Signature Verifying Presence"],
          correctAnswer: "Répondez s'il vous plaît",
          funFact: "It's a French phrase that translates directly to 'Respond, if it pleases you.' Even though it's polite, it's a strict requirement for the hosts to get a headcount!"
        },
        {
          id: "es_e24",
          question: "What does the Heimlich maneuver primarily treat?",
          options: ["Heart attacks", "Choking", "Asthma attacks", "Drowning"],
          correctAnswer: "Choking",
          funFact: "Dr. Henry Heimlich, the man who invented the maneuver in 1974, actually never had to use it in a real-life emergency himself until he was 96 years old, saving a woman at his retirement home."
        },
        {
          id: "es_e25",
          question: "How many fluid ounces are in one standard US cup?",
          options: ["4", "6", "8", "16"],
          correctAnswer: "8",
          funFact: "Bakers often prefer measuring by weight (grams) instead of volume (cups) because a 'cup' of loosely packed flour contains way less flour than a tightly packed cup."
        },
        {
          id: "es_e26",
          question: "What does an ATM actually stand for?",
          options: ["Automatic Teller Machine", "Automated Transaction Module", "Any Time Money", "Access To Money"],
          correctAnswer: "Automatic Teller Machine",
          funFact: "The man who invented the ATM, John Shepherd-Barron, came up with the idea while sitting in the bathtub. He originally wanted a 6-digit PIN, but his wife could only remember 4 digits, so 4 became the world standard."
        },
        {
          id: "es_e27",
          question: "Decaffeinated coffee is 100% completely free of caffeine. True or False?",
          options: ["True", "False"],
          correctAnswer: "False",
          funFact: "Decaf coffee still contains anywhere from 2 to 7 milligrams of caffeine per cup. It's impossible to completely strip every single trace of the chemical from the bean."
        },
        {
          id: "es_e28",
          question: "What causes the loud 'crack' of a thunderclap during a storm?",
          options: ["Clouds crashing into each other", "Lightning breaking the sound barrier", "Lightning superheating the air, causing it to violently expand", "Rain hitting the ground at terminal velocity"],
          correctAnswer: "Lightning superheating the air, causing it to violently expand",
          funFact: "A bolt of lightning can heat the air around it to 50,000 degrees Fahrenheit—that's five times hotter than the surface of the sun!"
        },
        {
          id: "es_e29",
          question: "In the United States, what is the legal minimum age to rent a car without paying a massive 'young driver' surcharge at most major rental companies?",
          options: ["18", "21", "25", "27"],
          correctAnswer: "25",
          funFact: "Car rental companies use strict actuarial data that shows drivers under 25 are statistically significantly more likely to get into costly accidents."
        },
        {
          id: "es_e30",
          question: "What does the abbreviation 'DIY' stand for?",
          options: ["Design It Yourself", "Do It Yourself", "Done In Years", "Decorate It Yourself"],
          correctAnswer: "Do It Yourself",
          funFact: "The DIY movement exploded in the 1970s as people began pushing back against mass-produced commercial products and started valuing self-sufficiency."
        }
      ],
      medium: [
        {
          id: "es_m1",
          question: "When applying for a credit card or loan, what does APR stand for?",
          options: ["Annual Payment Ratio", "Average Percentage Rate", "Annual Percentage Rate", "Accrued Principal Return"],
          correctAnswer: "Annual Percentage Rate",
          funFact: "APR is actually more important than the basic interest rate because it includes the interest PLUS all the hidden fees and costs associated with the loan."
        },
        {
          id: "es_m2",
          question: "What is the crucial difference between 'Gross Pay' and 'Net Pay' on your paycheck?",
          options: ["Gross is after taxes, Net is before taxes", "Gross is before taxes, Net is what you actually take home", "Gross includes bonuses, Net is just base salary", "There is no difference"],
          correctAnswer: "Gross is before taxes, Net is what you actually take home",
          funFact: "The word 'Gross' comes from the Old French word 'gros', which meant 'large' or 'entire', referring to the whole amount before the government takes its slice."
        },
        {
          id: "es_m3",
          question: "In cybersecurity, what is 'Phishing'?",
          options: ["Downloading illegal movies", "A fraudulent attempt to trick you into revealing passwords by pretending to be a trustworthy source", "When your internet connection is throttled by your provider", "A type of virus that deletes all your files"],
          correctAnswer: "A fraudulent attempt to trick you into revealing passwords by pretending to be a trustworthy source",
          funFact: "The term 'phishing' was coined in the 1990s by hackers stealing AOL accounts. They used 'ph' instead of 'f' as a nod to 'phreaking', the original term for hacking telephone lines."
        },
        {
          id: "es_m4",
          question: "If your car starts hydroplaning (skimming on top of a puddle of water) on the highway, what should you do?",
          options: ["Slam on the brakes immediately", "Jerk the steering wheel left and right", "Take your foot off the gas and steer straight until you regain traction", "Accelerate to push through the water"],
          correctAnswer: "Take your foot off the gas and steer straight until you regain traction",
          funFact: "Hydroplaning can happen at speeds as low as 35 mph! Slamming on the brakes will lock your wheels and cause you to spin completely out of control."
        },
        {
          id: "es_m5",
          question: "What is the primary difference between baking soda and baking powder in cooking?",
          options: ["Baking soda needs an acidic ingredient to activate; baking powder already has the acid mixed in", "Baking powder is just baking soda mixed with flour", "They are the exact same thing", "Baking powder is used for savory dishes, soda is for sweets"],
          correctAnswer: "Baking soda needs an acidic ingredient to activate; baking powder already has the acid mixed in",
          funFact: "If a recipe calls for baking soda and you only have baking powder, you'll need to use 3 times as much baking powder to get the same rising effect!"
        },
        {
          id: "es_m6",
          question: "When dealing with health or car insurance, what is a 'deductible'?",
          options: ["The monthly fee you pay to keep the insurance active", "The maximum amount the insurance company will pay out", "The amount of money you have to pay out of your own pocket before the insurance kicks in", "A discount given for safe driving or good health"],
          correctAnswer: "The amount of money you have to pay out of your own pocket before the insurance kicks in",
          funFact: "Generally, plans with lower monthly premiums have higher deductibles, meaning they are cheaper month-to-month but cost way more if you actually get injured."
        },
        {
          id: "es_m7",
          question: "What is the purpose of the 'breaker box' (electrical panel) in a home?",
          options: ["To distribute internet signals", "To prevent electrical fires by shutting off power if a circuit overloads", "To measure how much electricity the house uses", "To convert AC power to DC power"],
          correctAnswer: "To prevent electrical fires by shutting off power if a circuit overloads",
          funFact: "Before modern resettable breaker switches, homes used tiny glass fuses. When a circuit overloaded, the metal inside the fuse literally melted, and you had to physically replace it."
        },
        {
          id: "es_m8",
          question: "What does 'BCC' do differently than 'CC' when sending an email?",
          options: ["It sends the email faster", "It hides the recipient's email address from everyone else on the email thread", "It adds an encrypted signature to the email", "It blocks the recipient from replying"],
          correctAnswer: "It hides the recipient's email address from everyone else on the email thread",
          funFact: "'BCC' stands for Blind Carbon Copy. It's the ultimate tool for corporate office politics, allowing you to secretly loop your boss into a conversation without the other person knowing."
        },
        {
          id: "es_m9",
          question: "Natural gas used in home stoves is naturally completely odorless. How do you know if there is a gas leak?",
          options: ["The air turns slightly green", "The gas makes a loud whistling sound", "Gas companies add a chemical called mercaptan that smells like rotten eggs", "Your lights will flicker"],
          correctAnswer: "Gas companies add a chemical called mercaptan that smells like rotten eggs",
          funFact: "This life-saving safety measure was implemented in 1937 after a massive, undetected natural gas leak caused an explosion at a school in Texas."
        },
        {
          id: "es_m10",
          question: "In real estate, what does the term 'Escrow' mean?",
          options: ["A legal agreement where a neutral third party holds the money until all conditions of the sale are met", "A tax penalty for selling a house too quickly", "The physical deed to the property", "A type of mortgage with a changing interest rate"],
          correctAnswer: "A legal agreement where a neutral third party holds the money until all conditions of the sale are met",
          funFact: "The word comes from the Old French word 'escroue', which meant a scrap of paper or a scroll that served as a deed."
        },
        {
          id: "es_m11",
          question: "What is the safest and most recommended way to thaw frozen meat?",
          options: ["Leave it on the counter at room temperature", "Run it under hot water", "Leave it in the refrigerator overnight", "Put it in a bowl of warm water"],
          correctAnswer: "Leave it in the refrigerator overnight",
          funFact: "Leaving meat on the counter is incredibly dangerous! The outside of the meat thaws and reaches room temperature—creating a massive breeding ground for bacteria—while the inside remains frozen."
        },
        {
          id: "es_m12",
          question: "In personal finance, what does a 'credit utilization ratio' measure?",
          options: ["How many credit cards you own", "How much of your available credit limit you are currently using", "How often you use your card per month", "The ratio of cash to credit you spend"],
          correctAnswer: "How much of your available credit limit you are currently using",
          funFact: "Financial experts recommend keeping your utilization below 30%. If you have a $10,000 limit and a $9,000 balance, your credit score will tank because you look financially desperate."
        },
        {
          id: "es_m13",
          question: "When buying a new car, what does MSRP stand for?",
          options: ["Minimum Standard Retail Purchase", "Manufacturer's Suggested Retail Price", "Motor Sales Revenue Percentage", "Maximum Security Rate Protection"],
          correctAnswer: "Manufacturer's Suggested Retail Price",
          funFact: "Also known as the 'sticker price', the MSRP is literally just a suggestion. Dealerships buy the cars for less (the invoice price) and you can almost always negotiate the MSRP down."
        },
        {
          id: "es_m14",
          question: "What is the difference between a viral infection (like the flu) and a bacterial infection (like strep throat)?",
          options: ["Viral infections can be cured with antibiotics; bacterial infections cannot", "Bacterial infections can be cured with antibiotics; viral infections cannot", "Viruses only affect humans; bacteria only affect animals", "There is no difference"],
          correctAnswer: "Bacterial infections can be cured with antibiotics; viral infections cannot",
          funFact: "Taking antibiotics for a viral cold is not only useless, but it also actively helps create dangerous 'superbugs' by allowing surviving bacteria in your body to build resistance!"
        },
        {
          id: "es_m15",
          question: "What is the core difference between a checking account and a savings account?",
          options: ["Checking is for daily transactions; savings earns interest but limits how often you can withdraw money", "Savings accounts come with a debit card; checking accounts do not", "Checking accounts are only for businesses", "Savings accounts cannot be accessed online"],
          correctAnswer: "Checking is for daily transactions; savings earns interest but limits how often you can withdraw money",
          funFact: "Under a federal law called Regulation D, banks used to legally restrict you to exactly six withdrawals per month from a savings account before hitting you with heavy penalty fees."
        },
        {
          id: "es_m16",
          question: "What does it mean to 'sublet' an apartment?",
          options: ["To rent a basement apartment", "When a tenant rents out their rented apartment to a third party", "To share rent with a roommate", "To pay rent directly to the government"],
          correctAnswer: "When a tenant rents out their rented apartment to a third party",
          funFact: "Subletting without your landlord's written permission is illegal in most leases and is a universally fast way to get evicted!"
        },
        {
          id: "es_m17",
          question: "In the United States, what is the primary purpose of a W-2 form?",
          options: ["To apply for a mortgage", "A document your employer gives you detailing how much money you made and how much taxes were withheld", "A form to register your car", "A form to declare bankruptcy"],
          correctAnswer: "A document your employer gives you detailing how much money you made and how much taxes were withheld",
          funFact: "Employers are legally required by the IRS to send out all W-2 forms to their employees by January 31st every year so people can file their taxes."
        },
        {
          id: "es_m18",
          question: "What is a 401(k)?",
          options: ["A type of life insurance", "An employer-sponsored retirement savings plan where you invest a piece of your paycheck before taxes are taken out", "A high-yield savings account", "A government penalty tax"],
          correctAnswer: "An employer-sponsored retirement savings plan where you invest a piece of your paycheck before taxes are taken out",
          funFact: "It gets its weird name directly from subsection 401(k) of the Internal Revenue Code. It was actually created by accident in 1978 as a loophole by a benefits consultant."
        },
        {
          id: "es_m19",
          question: "When people talk about storing files in 'The Cloud', where are those files actually located?",
          options: ["In an atmospheric satellite", "On physical servers housed in massive data centers owned by tech companies", "Temporarily floating in the internet's bandwidth", "On the local hard drive"],
          correctAnswer: "On physical servers housed in massive data centers owned by tech companies",
          funFact: "There is no 'cloud'. It's just someone else's computer! These massive data centers use so much electricity that they are often built next to massive rivers for hydroelectric power and cooling."
        },
        {
          id: "es_m20",
          question: "What is the difference between a modem and a router?",
          options: ["A modem connects your home to the internet provider; a router splits that connection so multiple devices can use it", "They are the exact same thing", "A router brings the internet in; a modem speeds it up", "A modem provides Wi-Fi; a router connects via cables only"],
          correctAnswer: "A modem connects your home to the internet provider; a router splits that connection so multiple devices can use it",
          funFact: "Modem is actually a portmanteau! It stands for 'modulator-demodulator', referring to how it translates digital signals into analog waves and back again."
        },
        {
          id: "es_m21",
          question: "In the stock market, what does the term 'Bear Market' mean?",
          options: ["A market where prices are rapidly rising", "A market where prices are falling or expected to fall", "A market that is completely stagnant", "A market heavily invested in agriculture"],
          correctAnswer: "A market where prices are falling or expected to fall",
          funFact: "The terms are based on how the animals attack! A bear swipes its paws downward (falling prices), while a bull thrusts its horns upward (rising prices)."
        },
        {
          id: "es_m22",
          question: "How is a person's BMI (Body Mass Index) calculated?",
          options: ["By measuring waist circumference", "By dividing blood pressure by age", "By using a ratio of a person's weight to their height", "By measuring body fat percentage using calipers"],
          correctAnswer: "By using a ratio of a person's weight to their height",
          funFact: "BMI is highly controversial because it doesn't account for muscle mass. A professional bodybuilder with zero body fat is often classified as 'obese' on a BMI chart!"
        },
        {
          id: "es_m23",
          question: "When dealing with insurance, what is a 'premium'?",
          options: ["The highest tier of coverage", "The amount you pay out of pocket for an accident", "The monthly or annual amount you pay to keep the policy active", "The bonus paid to you if you don't get into an accident"],
          correctAnswer: "The monthly or annual amount you pay to keep the policy active",
          funFact: "If you fail to pay your premium, your insurance company can legally cancel your policy, leaving you completely unprotected if disaster strikes the very next day."
        },
        {
          id: "es_m24",
          question: "What does the abbreviation 'URL' stand for when browsing the internet?",
          options: ["Universal Routing Link", "Uniform Resource Locator", "Unified Reference Logic", "User Response Locator"],
          correctAnswer: "Uniform Resource Locator",
          funFact: "Sir Tim Berners-Lee, the inventor of the World Wide Web, has publicly apologized for adding the '://' to URLs, saying it was a totally unnecessary waste of time and typing."
        },
        {
          id: "es_m25",
          question: "What does it mean to build 'equity' in your home?",
          options: ["Making the home more eco-friendly", "The difference between what your home is worth and how much you still owe on the mortgage", "Adding an extension to the house", "Paying the property taxes on time"],
          correctAnswer: "The difference between what your home is worth and how much you still owe on the mortgage",
          funFact: "Equity is basically the portion of the house you actually 'own'. You can even take out a 'Home Equity Loan' and use your house like a giant credit card to pay for renovations!"
        },
        {
          id: "es_m26",
          question: "What is the job of a Notary Public?",
          options: ["To represent you in traffic court", "To write legally binding contracts", "To serve as an impartial witness to verify identities and prevent fraud when signing important documents", "To auction off foreclosed homes"],
          correctAnswer: "To serve as an impartial witness to verify identities and prevent fraud when signing important documents",
          funFact: "Notaries have to use a special, registered stamp or physical embosser. If you buy a house or create a will, it isn't legally binding until the Notary stamps it!"
        },
        {
          id: "es_m27",
          question: "What does a VPN (Virtual Private Network) actually do?",
          options: ["It removes viruses from your computer", "It encrypts your internet connection and masks your IP address to make your browsing private", "It increases your internet speed by bypassing your ISP", "It gives you free access to paid websites"],
          correctAnswer: "It encrypts your internet connection and masks your IP address to make your browsing private",
          funFact: "VPNs essentially create a secure 'tunnel' through the internet. They are heavily used by people in countries with internet censorship to bypass government firewalls."
        },
        {
          id: "es_m28",
          question: "What is an 'Allen wrench' (or hex key)?",
          options: ["A wrench used by plumbers for curved pipes", "An L-shaped tool used to drive bolts and screws with hexagonal sockets", "A power tool used to break concrete", "A tool used exclusively for tuning pianos"],
          correctAnswer: "An L-shaped tool used to drive bolts and screws with hexagonal sockets",
          funFact: "If you have ever bought flat-pack furniture from IKEA, you have used an Allen wrench. They include millions of them in their packaging every single year!"
        },
        {
          id: "es_m29",
          question: "If your check engine light comes on, what is the easiest way to figure out what is wrong without going to a mechanic?",
          options: ["Listen to the exhaust pipe", "Use an OBD-II (On-Board Diagnostics) scanner to read the error code", "Reset the battery to see if it goes away", "Check the oil dipstick"],
          correctAnswer: "Use an OBD-II (On-Board Diagnostics) scanner to read the error code",
          funFact: "You can buy a cheap OBD-II scanner online for $20, plug it into the port under your steering wheel, and it will tell you exactly what broken sensor triggered the light!"
        },
        {
          id: "es_m30",
          question: "What is the primary difference between a Traditional IRA and a Roth IRA?",
          options: ["Roth IRAs are only for businesses", "Traditional IRAs give you a tax break now but you pay taxes when you retire; Roth IRAs are taxed now, but withdrawal in retirement is totally tax-free", "Traditional IRAs invest in stocks; Roth IRAs invest in real estate", "There is no difference"],
          correctAnswer: "Traditional IRAs give you a tax break now but you pay taxes when you retire; Roth IRAs are taxed now, but withdrawal in retirement is totally tax-free",
          funFact: "The Roth IRA is named after Senator William Roth, who championed the legislation in 1997. It is widely considered the ultimate wealth-building tool for young people."
        }
      ],
      hard: [
        {
          id: "es_h1",
          question: "In culinary science, what is the 'Maillard Reaction'?",
          options: ["The process of yeast creating carbon dioxide to make bread rise", "The chemical reaction between amino acids and reducing sugars that gives browned food its distinctive flavor", "The process of egg yolks and oil combining to make mayonnaise", "The point where sugar turns into pure caramel"],
          correctAnswer: "The chemical reaction between amino acids and reducing sugars that gives browned food its distinctive flavor",
          funFact: "The Maillard reaction is the exact reason why a seared steak, toasted bread, and roasted coffee taste a million times better than their raw or boiled counterparts!"
        },
        {
          id: "es_h2",
          question: "In finance, what does the 'Rule of 72' help you easily calculate?",
          options: ["Your monthly mortgage payment", "How many years it will take for your invested money to double given a fixed annual rate of interest", "Your total tax bracket penalty", "The depreciation rate of a new car"],
          correctAnswer: "How many years it will take for your invested money to double given a fixed annual rate of interest",
          funFact: "It's a magical math shortcut! If you invest in an index fund returning 8% a year, just divide 72 by 8. It will take exactly 9 years for your money to double."
        },
        {
          id: "es_h3",
          question: "What happens during the legal process of 'Probate'?",
          options: ["A person is put on trial for a felony", "A court legally reviews and authenticates a deceased person's will and oversees the distribution of their assets", "A company files for bankruptcy protection", "A tenant is legally evicted from a property"],
          correctAnswer: "A court legally reviews and authenticates a deceased person's will and oversees the distribution of their assets",
          funFact: "Probate can take months or even years, and the court fees take a massive chunk of the inheritance. Many people set up 'Living Trusts' specifically to bypass the probate process entirely."
        },
        {
          id: "es_h4",
          question: "What is the crucial difference between Chapter 7 and Chapter 11 bankruptcy in the US?",
          options: ["Chapter 7 is for individuals, Chapter 11 is for farmers", "Chapter 7 wipes out most debts by liquidating assets; Chapter 11 allows a business to stay open while reorganizing its debt", "Chapter 7 takes 7 years; Chapter 11 takes 11 years", "Chapter 11 wipes out student loans; Chapter 7 does not"],
          correctAnswer: "Chapter 7 wipes out most debts by liquidating assets; Chapter 11 allows a business to stay open while reorganizing its debt",
          funFact: "Many massive companies, including Marvel Entertainment, General Motors, and countless airlines, have successfully used Chapter 11 to survive financial ruin and come back stronger."
        },
        {
          id: "es_h5",
          question: "When hiring a financial advisor, why is it absolutely critical to ensure they are a 'Fiduciary'?",
          options: ["It means they charge lower fees", "It means they are legally obligated to put your financial interests above their own and cannot sell you bad products just to earn a commission", "It means they are employed by the government", "It means they guarantee a return on your investment"],
          correctAnswer: "It means they are legally obligated to put your financial interests above their own and cannot sell you bad products just to earn a commission",
          funFact: "If an advisor is NOT a fiduciary, they can legally sell you an expensive, terrible investment plan simply because they get a massive kickback from the company offering it."
        },
        {
          id: "es_h6",
          question: "How does a 'Reverse Mortgage' function for senior citizens?",
          options: ["The senior pays double the mortgage rate to pay off the house early", "The bank pays the senior a monthly sum, taking a piece of the home's equity in return, and the loan is repaid when the senior dies or sells the home", "The senior swaps their home with another property", "The government forgives the remaining mortgage debt"],
          correctAnswer: "The bank pays the senior a monthly sum, taking a piece of the home's equity in return, and the loan is repaid when the senior dies or sells the home",
          funFact: "While it provides great cash flow for retirees who are 'house rich but cash poor', it often means their children will inherit zero equity when the parents pass away."
        },
        {
          id: "es_h7",
          question: "In the context of a 30-year home loan, what is 'Amortization'?",
          options: ["The penalty for paying the loan off early", "The process of spreading out a loan into a series of fixed payments, where early payments mostly cover interest and later payments cover the principal", "The appraisal value of the home", "The down payment requirement"],
          correctAnswer: "The process of spreading out a loan into a series of fixed payments, where early payments mostly cover interest and later payments cover the principal",
          funFact: "Because of how amortization works, if you look at your mortgage statement during year 1, almost 80% of your massive monthly payment goes straight to the bank's interest, not to paying off the house!"
        },
        {
          id: "es_h8",
          question: "What is the fundamental difference between buying a Stock and buying a Bond?",
          options: ["Stocks are short-term, bonds are long-term", "Stocks represent partial ownership in a company; bonds are a loan you make to a company or government that pays you interest", "Bonds are riskier than stocks", "Stocks pay dividends, bonds do not"],
          correctAnswer: "Stocks represent partial ownership in a company; bonds are a loan you make to a company or government that pays you interest",
          funFact: "If a company goes completely bankrupt, bondholders (the lenders) get paid back first during the liquidation. Stockholders (the owners) are at the very bottom of the list and usually lose everything."
        },
        {
          id: "es_h9",
          question: "What does the government power of 'Eminent Domain' allow them to do?",
          options: ["Draft citizens into the military during peacetime", "Seize private property for public use (like building a highway), provided they pay the owner fair market compensation", "Freeze citizens' bank accounts without a warrant", "Override state laws during an emergency"],
          correctAnswer: "Seize private property for public use (like building a highway), provided they pay the owner fair market compensation",
          funFact: "The Fifth Amendment of the US Constitution explicitly grants this power, but the definition of 'public use' has caused thousands of brutal legal battles between homeowners and the government."
        },
        {
          id: "es_h10",
          question: "What is the primary difference between the US healthcare programs Medicare and Medicaid?",
          options: ["Medicare is only for prescription drugs; Medicaid is for hospital visits", "Medicare is a federal program primarily for people over 65; Medicaid is a state and federal program for people with low income", "They are the exact same thing, just different names in different states", "Medicare is run by private companies; Medicaid is run by the military"],
          correctAnswer: "Medicare is a federal program primarily for people over 65; Medicaid is a state and federal program for people with low income",
          funFact: "A common memory trick is: You 'care' for the elderly (Medicare), and you provide 'aid' to those in financial need (Medicaid)."
        },
        {
          id: "es_h11",
          question: "What is an 'Index Fund' in investing?",
          options: ["A fund that only invests in tech companies", "A mutual fund designed to strictly follow and match the performance of a specific financial market index, like the S&P 500", "A fund managed by an elite stock-picker trying to beat the market", "A fund backed by physical gold"],
          correctAnswer: "A mutual fund designed to strictly follow and match the performance of a specific financial market index, like the S&P 500",
          funFact: "Legendary investor Warren Buffett famously won a million-dollar bet proving that a basic, low-fee index fund would outperform elite, expensive hedge fund managers over a 10-year period."
        },
        {
          id: "es_h12",
          question: "What does the legal writ of 'Habeas Corpus' protect citizens against?",
          options: ["Self-incrimination", "Illegal search and seizure", "Unlawful and indefinite imprisonment without being brought before a judge", "Cruel and unusual punishment"],
          correctAnswer: "Unlawful and indefinite imprisonment without being brought before a judge",
          funFact: "Translated from Latin, it literally means 'You shall have the body'. It is considered one of the most fundamental pillars of a free, democratic legal system."
        },
        {
          id: "es_h13",
          question: "When financial news anchors talk about how the 'S&P 500' performed today, what does that index actually track?",
          options: ["The 500 oldest companies in America", "The stock performance of 500 of the largest companies listed on stock exchanges in the United States", "The top 500 tech companies globally", "The 500 companies with the highest dividend payouts"],
          correctAnswer: "The stock performance of 500 of the largest companies listed on stock exchanges in the United States",
          funFact: "The S&P 500 makes up about 80% of the entire value of the US stock market! If the S&P 500 is having a bad day, your 401(k) is almost certainly having a bad day too."
        },
        {
          id: "es_h14",
          question: "In high-risk investing, what terrifying event is a 'Margin Call'?",
          options: ["When a stock's price drops to zero", "When a broker demands that an investor deposit more money into their account to cover massive losses on money they borrowed to buy stock", "When the stock market closes early due to a crash", "When a company calls back its shares"],
          correctAnswer: "When a broker demands that an investor deposit more money into their account to cover massive losses on money they borrowed to buy stock",
          funFact: "If you get a margin call and don't have the cash to deposit immediately, the broker has the legal right to forcefully sell off everything in your portfolio without your permission to cover the debt."
        },
        {
          id: "es_h15",
          question: "What does it mean if a contractor puts a 'Lien' on your house?",
          options: ["They installed a load-bearing wall", "They filed a legal claim against your property because you failed to pay them for their work, making it impossible to sell the house until they are paid", "They upgraded your property tax bracket", "They certified the house is up to code"],
          correctAnswer: "They filed a legal claim against your property because you failed to pay them for their work, making it impossible to sell the house until they are paid",
          funFact: "Mechanic's Liens are brutal. If you hire a general contractor, and *they* fail to pay the plumbers they hired, the plumbers can legally put a lien on *your* house, even though you already paid the general contractor!"
        },
        {
          id: "es_h16",
          question: "If a person dies 'Intestate', what does that mean?",
          options: ["They died in a different state than their primary residence", "They died without leaving a valid will, leaving the state laws to decide who gets their assets", "They died owing massive debts to the IRS", "They died leaving their entire estate to charity"],
          correctAnswer: "They died without leaving a valid will, leaving the state laws to decide who gets their assets",
          funFact: "If you die intestate, the state follows a rigid hierarchy. Usually, it goes to the spouse, then kids. If you have no living relatives, your entire estate legally defaults to the state government!"
        },
        {
          id: "es_h17",
          question: "When buying a house, what is a 'Contingency' in the contract?",
          options: ["The fee paid to the real estate agent", "A condition that must be met before the sale becomes final, such as passing a home inspection or securing financing", "The boundary lines of the property", "A clause that prevents the buyer from renting the house out"],
          correctAnswer: "A condition that must be met before the sale becomes final, such as passing a home inspection or securing financing",
          funFact: "In insanely hot real estate markets, desperate buyers will often 'waive contingencies'. This is incredibly risky, as they can lose their entire deposit if they can't get a loan, or end up stuck buying a house with a cracked foundation."
        },
        {
          id: "es_h18",
          question: "What triggers a 'Capital Gains Tax'?",
          options: ["Earning a higher salary than the previous year", "The profit you make from selling an asset (like stocks or real estate) for more than you originally paid for it", "Inheriting money from a relative", "Buying luxury goods"],
          correctAnswer: "The profit you make from selling an asset (like stocks or real estate) for more than you originally paid for it",
          funFact: "The tax code heavily favors patience! If you hold a stock for less than a year before selling, you pay a massive 'short-term' tax rate. If you hold it for over a year, you pay the much lower 'long-term' rate."
        },
        {
          id: "es_h19",
          question: "What makes 'Compound Interest' so much more powerful than 'Simple Interest'?",
          options: ["Compound interest guarantees a higher percentage rate", "With compound interest, you earn interest on your initial investment PLUS the interest you've already earned previously", "Compound interest is tax-free", "Compound interest is paid out monthly instead of yearly"],
          correctAnswer: "With compound interest, you earn interest on your initial investment PLUS the interest you've already earned previously",
          funFact: "Albert Einstein famously allegedly called compound interest the 'eighth wonder of the world', stating: 'He who understands it, earns it... he who doesn't... pays it.'"
        },
        {
          id: "es_h20",
          question: "What legal power does a 'Power of Attorney' document grant?",
          options: ["The right to practice law without passing the bar exam", "The authorization to represent or act on another person's behalf in private affairs, business, or legal matters", "The power to pardon a criminal", "The ability to legally change your name"],
          correctAnswer: "The authorization to represent or act on another person's behalf in private affairs, business, or legal matters",
          funFact: "A 'Medical Power of Attorney' specifically allows someone to make life-or-death healthcare decisions for you if you end up in a coma or are otherwise incapacitated."
        }
      ]
    }

    
}

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleOptions(question){
  const options = [...question.options];
  return options.sort(() => Math.random() - 0.5);
}

const pool = quizData[category][diff];

shuffleArray(pool);

const selectedQuestions = pool.slice(0, 8);


function loadQuestion(){
    answered = false;
    startTimer();  // ← start fresh timer for each question

    document.getElementById("categoryTitle").innerText = `${category.toUpperCase()} — ${diff.toUpperCase()}`;

    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("progressText").innerText = `Question ${currentQ + 1} of 8`;

    const progressPercent = ((currentQ + 1) / 8) * 100;
    document.getElementById("progressFill").style.width = progressPercent + "%";

    const q = selectedQuestions[currentQ];

    document.getElementById("question").innerText = q.question;

    const options = document.getElementById("options");
    options.innerHTML = "";

    
    shuffleOptions(q).forEach(option => {

    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => {

      if(answered){
        return;
      }
      answered = true;
      stopTimer(); // ← stop countdown once answered

      const buttons = document.querySelectorAll("#options button");

      if(option === q.correctAnswer){
        score++;
        btn.classList.add("correct");
      } 
      else {
        btn.classList.add("wrong");
      }

      buttons.forEach(b => {
        b.disabled = true;
        if(b.innerText === q.correctAnswer){
          b.classList.add("correct");
        }
      });

      const funfact = q.funFact;
      funDiv.innerText = funfact;
      funDiv.classList.remove("show"); 

      setTimeout(() => {
        funDiv.classList.add("show");
      }, 230);

      document.getElementById("score").innerText = `Score: ${score}`;
      };
        options.appendChild(btn);
    });
  
};

function nextQuestion(){
    currentQ++;
    if(currentQ >= 8){
      stopTimer();
      location.href = `result.html?score=${score}&category=${category}&difficulty=${diff}`;
    } else {
      loadQuestion();
      funDiv.innerText = "";
      funDiv.classList.remove("show");
    }

}

loadQuestion();