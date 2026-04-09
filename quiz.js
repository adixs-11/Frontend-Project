let currentQ = 0;
let score = 0;
let answered = false;

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category"); 

const quizData = {
  pop: [
    {
      text: "Who is known as the Queen of Pop?",
      options: ["Madonna", "Beyoncé", "Taylor Swift", "Adele"],
      correctAnswer: "Madonna",
      funFact: "Madonna has dominated pop music since the 1980s."
    },
    {
      text: "Who played Jack in Titanic?",
      options: ["Brad Pitt", "Leonardo DiCaprio", "Tom Cruise", "Johnny Depp"],
      correctAnswer: "Leonardo DiCaprio",
      funFact: "He was only 22 during filming."
    },
    {
      text: "Which band sang 'Bohemian Rhapsody'?",
      options: ["Queen", "Beatles", "Coldplay", "Nirvana"],
      correctAnswer: "Queen",
      funFact: "It has no chorus!"
    },
    {
      text: "Which movie features 'Let It Go'?",
      options: ["Frozen", "Moana", "Tangled", "Encanto"],
      correctAnswer: "Frozen",
      funFact: "It won an Oscar."
    },
    {
      text: "Who created Harry Potter?",
      options: ["J.K. Rowling", "George R.R. Martin", "Tolkien", "Rick Riordan"],
      correctAnswer: "J.K. Rowling",
      funFact: "She wrote it in cafes."
    },
    {
      text: "What is Harry Potter’s owl called?",
      options: ["Hedwig", "Crookshanks", "Scabbers", "Fawkes"],
      correctAnswer: "Hedwig",
      funFact: "A snowy owl."
    },
    {
      text: "Which Marvel movie started MCU?",
      options: ["Iron Man", "Thor", "Avengers", "Hulk"],
      correctAnswer: "Iron Man",
      funFact: "Released in 2008."
    },
    {
      text: "Who played Iron Man?",
      options: ["Chris Evans", "RDJ", "Chris Hemsworth", "Mark Ruffalo"],
      correctAnswer: "RDJ",
      funFact: "Revived his career."
    },
    {
      text: "Which show has 'Central Perk'?",
      options: ["Friends", "HIMYM", "Office", "Brooklyn 99"],
      correctAnswer: "Friends",
      funFact: "Iconic orange couch!"
    },
    {
      text: "Which artist sang 'Shape of You'?",
      options: ["Ed Sheeran", "Drake", "Justin Bieber", "Shawn Mendes"],
      correctAnswer: "Ed Sheeran",
      funFact: "One of most streamed songs ever."
    },

    {
      text: "Which game has Mario?",
      options: ["Zelda", "Mario", "Sonic", "Minecraft"],
      correctAnswer: "Mario",
      funFact: "First appeared in 1981."
    },
    {
      text: "Who is Batman?",
      options: ["Bruce Wayne", "Tony Stark", "Clark Kent", "Barry Allen"],
      correctAnswer: "Bruce Wayne",
      funFact: "A billionaire vigilante."
    },
    {
      text: "Which movie has Joker?",
      options: ["Batman", "Avengers", "Spiderman", "Deadpool"],
      correctAnswer: "Batman",
      funFact: "One of most iconic villains."
    },
    {
      text: "Who sang 'Blinding Lights'?",
      options: ["Weeknd", "Drake", "Post Malone", "Bruno Mars"],
      correctAnswer: "Weeknd",
      funFact: "Billboard record breaker."
    },
    {
      text: "Which series has Eleven?",
      options: ["Stranger Things", "Dark", "Breaking Bad", "Lost"],
      correctAnswer: "Stranger Things",
      funFact: "Set in Hawkins."
    },
    {
      text: "Who directed Titanic?",
      options: ["James Cameron", "Nolan", "Spielberg", "Scorsese"],
      correctAnswer: "James Cameron",
      funFact: "Also made Avatar."
    },
    {
      text: "Which movie has Pandora?",
      options: ["Avatar", "Interstellar", "Matrix", "Dune"],
      correctAnswer: "Avatar",
      funFact: "Highest grossing movie."
    },
    {
      text: "Who played Spider-Man (MCU)?",
      options: ["Tom Holland", "Tobey", "Andrew", "Ryan"],
      correctAnswer: "Tom Holland",
      funFact: "Youngest Spider-Man."
    },
    {
      text: "Which movie has Thanos?",
      options: ["Avengers", "Batman", "Justice League", "X-Men"],
      correctAnswer: "Avengers",
      funFact: "Snap = iconic."
    },
    {
      text: "Who sings 'Bad Guy'?",
      options: ["Billie Eilish", "Ariana", "Taylor", "Dua Lipa"],
      correctAnswer: "Billie Eilish",
      funFact: "Grammy sweep."
    },

    {
      text: "Which app is for short videos?",
      options: ["TikTok", "Facebook", "Twitter", "LinkedIn"],
      correctAnswer: "TikTok",
      funFact: "Billions of users."
    },
    {
      text: "Which movie has Elsa?",
      options: ["Frozen", "Brave", "Moana", "Tangled"],
      correctAnswer: "Frozen",
      funFact: "Ice powers!"
    },
    {
      text: "Which superhero has shield?",
      options: ["Captain America", "Thor", "Iron Man", "Hulk"],
      correctAnswer: "Captain America",
      funFact: "Vibranium shield."
    },
    {
      text: "Which platform streams shows?",
      options: ["Netflix", "Excel", "Word", "Chrome"],
      correctAnswer: "Netflix",
      funFact: "Global streaming giant."
    },
    {
      text: "Who is Superman?",
      options: ["Clark Kent", "Bruce Wayne", "Tony Stark", "Peter Parker"],
      correctAnswer: "Clark Kent",
      funFact: "From Krypton."
    },
    {
      text: "Which band is BTS?",
      options: ["K-pop", "Rock", "Jazz", "Hip-hop"],
      correctAnswer: "K-pop",
      funFact: "Global sensation."
    },
    {
      text: "Which movie has dinosaurs?",
      options: ["Jurassic Park", "Avatar", "Dune", "Titanic"],
      correctAnswer: "Jurassic Park",
      funFact: "Iconic theme music."
    },
    {
      text: "Who is Hulk?",
      options: ["Bruce Banner", "Tony Stark", "Thor", "Loki"],
      correctAnswer: "Bruce Banner",
      funFact: "Gets stronger when angry."
    },
    {
      text: "Which song is by PSY?",
      options: ["Gangnam Style", "Despacito", "Shape of You", "Believer"],
      correctAnswer: "Gangnam Style",
      funFact: "First 1B YouTube views."
    },
    {
      text: "Which hero uses hammer?",
      options: ["Thor", "Iron Man", "Hulk", "Spiderman"],
      correctAnswer: "Thor",
      funFact: "Mjolnir!"
    },

    {
      text: "Which movie has Matrix?",
      options: ["Matrix", "Inception", "Tenet", "Avatar"],
      correctAnswer: "Matrix",
      funFact: "Red pill vs blue pill."
    },
    {
      text: "Who is Deadpool?",
      options: ["Ryan Reynolds", "Hugh Jackman", "Chris Pratt", "Tom Hardy"],
      correctAnswer: "Ryan Reynolds",
      funFact: "Breaks 4th wall."
    },
    {
      text: "Which singer is 'King of Pop'?",
      options: ["Michael Jackson", "Elvis", "Prince", "Drake"],
      correctAnswer: "Michael Jackson",
      funFact: "Moonwalk legend."
    },
    {
      text: "Which show has dragons?",
      options: ["Game of Thrones", "Vikings", "Rome", "Spartacus"],
      correctAnswer: "Game of Thrones",
      funFact: "Based on books."
    },
    {
      text: "Which hero is fastest?",
      options: ["Flash", "Superman", "Thor", "Hulk"],
      correctAnswer: "Flash",
      funFact: "Speed force."
    },
    {
      text: "Which movie has Joker?",
      options: ["Dark Knight", "Avengers", "X-Men", "Deadpool"],
      correctAnswer: "Dark Knight",
      funFact: "Heath Ledger performance."
    },
    {
      text: "Which platform is for photos?",
      options: ["Instagram", "LinkedIn", "Reddit", "Quora"],
      correctAnswer: "Instagram",
      funFact: "Owned by Meta."
    },
    {
      text: "Which hero climbs walls?",
      options: ["Spider-Man", "Batman", "Iron Man", "Thor"],
      correctAnswer: "Spider-Man",
      funFact: "Bitten by spider."
    },
    {
      text: "Which movie has Pandora planet?",
      options: ["Avatar", "Dune", "Star Wars", "Interstellar"],
      correctAnswer: "Avatar",
      funFact: "Blue aliens."
    },
    {
      text: "Which movie has Wakanda?",
      options: ["Black Panther", "Avengers", "Thor", "Doctor Strange"],
      correctAnswer: "Black Panther",
      funFact: "Vibranium nation."
    }
  ],
  smart: [
  {
    text: "What does CPU stand for?",
    options: ["Central Processing Unit","Computer Personal Unit","Central Power Unit","Core Processing Unit"],
    correctAnswer: "Central Processing Unit",
    funFact: "CPU is called the brain of the computer."
  },
  {
    text: "What is the capital of India?",
    options: ["Mumbai","Delhi","Chennai","Kolkata"],
    correctAnswer: "Delhi",
    funFact: "New Delhi is the official capital."
  },
  {
    text: "What is H2O?",
    options: ["Oxygen","Hydrogen","Water","Salt"],
    correctAnswer: "Water",
    funFact: "It is made of 2 hydrogen and 1 oxygen atom."
  },
  {
    text: "Which planet is called Red Planet?",
    options: ["Mars","Venus","Jupiter","Saturn"],
    correctAnswer: "Mars",
    funFact: "Its red color comes from iron oxide."
  },
  {
    text: "Largest ocean on Earth?",
    options: ["Atlantic","Indian","Pacific","Arctic"],
    correctAnswer: "Pacific",
    funFact: "It covers one-third of Earth."
  },
  {
    text: "Currency of Japan?",
    options: ["Yen","Dollar","Won","Euro"],
    correctAnswer: "Yen",
    funFact: "It’s one of the most traded currencies."
  },
  {
    text: "Which gas do plants use?",
    options: ["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"],
    correctAnswer: "Carbon dioxide",
    funFact: "Plants release oxygen after photosynthesis."
  },
  {
    text: "UN headquarters is in?",
    options: ["Paris","New York","London","Geneva"],
    correctAnswer: "New York",
    funFact: "It was founded in 1945."
  },
  {
    text: "Voting age in India?",
    options: ["16","18","21","25"],
    correctAnswer: "18",
    funFact: "Changed from 21 in 1989."
  },
  {
    text: "National bird of India?",
    options: ["Peacock","Eagle","Parrot","Swan"],
    correctAnswer: "Peacock",
    funFact: "Declared in 1963."
  },

  {
    text: "Chemical symbol of gold?",
    options: ["Au","Ag","Go","Gd"],
    correctAnswer: "Au",
    funFact: "Derived from Latin ‘Aurum’."
  },
  {
    text: "Boiling point of water?",
    options: ["50°C","100°C","150°C","0°C"],
    correctAnswer: "100°C",
    funFact: "At sea level pressure."
  },
  {
    text: "Closest planet to Sun?",
    options: ["Mercury","Venus","Earth","Mars"],
    correctAnswer: "Mercury",
    funFact: "It has extreme temperatures."
  },
  {
    text: "Missile Man of India?",
    options: ["APJ Abdul Kalam","Sarabhai","Bhabha","Raman"],
    correctAnswer: "APJ Abdul Kalam",
    funFact: "He was also India’s President."
  },
  {
    text: "National flower of India?",
    options: ["Lotus","Rose","Sunflower","Lily"],
    correctAnswer: "Lotus",
    funFact: "Symbol of purity."
  },
  {
    text: "Largest continent?",
    options: ["Asia","Africa","Europe","America"],
    correctAnswer: "Asia",
    funFact: "Home to over 60% population."
  },
  {
    text: "Rainbow has how many colors?",
    options: ["5","6","7","8"],
    correctAnswer: "7",
    funFact: "VIBGYOR."
  },
  {
    text: "Earth is called?",
    options: ["Blue Planet","Red Planet","Gas Giant","Ice Planet"],
    correctAnswer: "Blue Planet",
    funFact: "70% surface is water."
  },
  {
    text: "Who discovered zero?",
    options: ["Aryabhata","Newton","Einstein","Galileo"],
    correctAnswer: "Aryabhata",
    funFact: "Indian mathematician."
  },
  {
    text: "Capital of USA?",
    options: ["Washington DC","NYC","LA","Chicago"],
    correctAnswer: "Washington DC",
    funFact: "It’s not a state."
  }
],
 sport: [
  {
    text: "Who is called God of Cricket?",
    options: ["Sachin Tendulkar","MS Dhoni","Virat Kohli","Rohit Sharma"],
    correctAnswer: "Sachin Tendulkar",
    funFact: "He scored 100 international centuries."
  },
  {
    text: "FIFA 2022 winner?",
    options: ["Argentina","France","Brazil","Germany"],
    correctAnswer: "Argentina",
    funFact: "Messi won his first World Cup."
  },
  {
    text: "Players in football team?",
    options: ["11","10","9","12"],
    correctAnswer: "11",
    funFact: "Includes one goalkeeper."
  },
  {
    text: "Sport using shuttlecock?",
    options: ["Badminton","Tennis","Squash","TT"],
    correctAnswer: "Badminton",
    funFact: "Fastest racket sport."
  },
  {
    text: "Black Mamba?",
    options: ["Kobe Bryant","LeBron","Jordan","Curry"],
    correctAnswer: "Kobe Bryant",
    funFact: "Played 20 years with Lakers."
  },
  {
    text: "Olympic rings?",
    options: ["5","4","6","7"],
    correctAnswer: "5",
    funFact: "Represents continents."
  },
  {
    text: "Love = 0 in?",
    options: ["Tennis","Cricket","Football","Hockey"],
    correctAnswer: "Tennis",
    funFact: "From French ‘l’oeuf’."
  },
  {
    text: "First Olympic gold India?",
    options: ["Abhinav Bindra","Milkha Singh","Dhyan Chand","Sindhu"],
    correctAnswer: "Abhinav Bindra",
    funFact: "2008 Beijing Olympics."
  },
  {
    text: "100m world record?",
    options: ["Usain Bolt","Gatlin","Blake","Powell"],
    correctAnswer: "Usain Bolt",
    funFact: "9.58 seconds."
  },
  {
    text: "King of Clay?",
    options: ["Rafael Nadal","Federer","Djokovic","Murray"],
    correctAnswer: "Rafael Nadal",
    funFact: "Dominates French Open."
  },

  {
    text: "Cricket pitch length?",
    options: ["22 yards","20","24","21"],
    correctAnswer: "22 yards",
    funFact: "Standard for centuries."
  },
  {
    text: "Captain Cool?",
    options: ["MS Dhoni","Kohli","Rohit","Dravid"],
    correctAnswer: "MS Dhoni",
    funFact: "Won all ICC trophies."
  },
  {
    text: "Mecca of Cricket?",
    options: ["Lords","MCG","Eden","Wankhede"],
    correctAnswer: "Lords",
    funFact: "Located in London."
  },
  {
    text: "Hat-trick means?",
    options: ["3 goals","2","4","1"],
    correctAnswer: "3 goals",
    funFact: "Also used in cricket."
  },
  {
    text: "Football match duration?",
    options: ["90","80","60","100"],
    correctAnswer: "90",
    funFact: "Two halves."
  },
  {
    text: "Cricket birthplace?",
    options: ["England","India","Australia","SA"],
    correctAnswer: "England",
    funFact: "Oldest format origin."
  },
  {
    text: "Olympics 2024 host?",
    options: ["Paris","Tokyo","LA","London"],
    correctAnswer: "Paris",
    funFact: "Third time hosting."
  },
  {
    text: "Flying Sikh?",
    options: ["Milkha Singh","Dhoni","Kapil","Bindra"],
    correctAnswer: "Milkha Singh",
    funFact: "Legendary sprinter."
  },
  {
    text: "Kabaddi players?",
    options: ["7","5","9","11"],
    correctAnswer: "7",
    funFact: "Each side."
  },
  {
    text: "FIFA first winner?",
    options: ["Uruguay","Brazil","Germany","Italy"],
    correctAnswer: "Uruguay",
    funFact: "1930 World Cup."
  }
],
    personality: [
        
    ]

};

function shuffleArray(array){
    for(let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(quizData[category]);

const selectedQuestions = quizData[category].slice(0, 8);

function loadQuestion(){
    answered = false;

    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("progressText").innerText = `Question ${currentQ + 1} of 8`;

    const progressPercent = ((currentQ + 1) / 8) * 100;
    document.getElementById("progressFill").style.width = progressPercent + "%";

    const q = selectedQuestions[currentQ];

    document.getElementById("question").innerText = q.text;

    const options = document.getElementById("options");
    options.innerHTML = "";

    q.options.forEach(option => {

    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = () => {

      if(answered) return;
      answered = true;

      const buttons = document.querySelectorAll("#options button");

      if(option === q.correctAnswer){
          score++;
          btn.style.backgroundColor = "#22c55e";   
      } else {
          btn.style.backgroundColor = "#ef4444";   
      }

      buttons.forEach(b => {
          if(b.innerText === q.correctAnswer){
              b.style.backgroundColor = "#22c55e"; 
          }
      });

      document.getElementById("score").innerText = `Score: ${score}`;
      };
        options.appendChild(btn);
    });
};

function nextQuestion(){
    currentQ++;
    if(currentQ >= 8){
        location.href = `result.html?score=${score}&category=${category}`;
    } else {
        loadQuestion();
    }
}

loadQuestion();