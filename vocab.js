<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Sprint: S4 Vocabulary Challenge</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
        
        body { 
            font-family: 'Plus Jakarta Sans', sans-serif; 
            background: radial-gradient(circle at top left, #4f46e5, #1e1b4b);
            color: #f8fafc;
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .timer-bar { 
            transition: width 1s linear, background-color 0.3s ease; 
        }

        .option-btn {
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .option-btn:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-3px);
            border-color: #818cf8;
            box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
        }

        .option-btn:active {
            transform: translateY(0);
        }

        .score-badge {
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center p-4 md:p-8">

    <!-- Main App Container -->
    <div id="game-container" class="w-full max-w-3xl glass-panel rounded-[2rem] p-8 md:p-12 relative overflow-hidden">
        
        <!-- Decoration Circles -->
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 opacity-20 blur-[80px] rounded-full"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500 opacity-20 blur-[80px] rounded-full"></div>

        <!-- Start Screen -->
        <div id="start-screen" class="relative z-10 text-center py-10">
            <div class="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm mb-6 uppercase tracking-widest border border-indigo-500/30">
                S4 English Department
            </div>
            <h1 class="text-6xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">
                Word Sprint
            </h1>
            <p class="text-indigo-100/70 mb-10 text-xl max-w-md mx-auto">Master high-frequency health and sports vocabulary in this timed challenge.</p>
            
            <div class="grid grid-cols-3 gap-4 mb-10 text-center">
                <div class="bg-white/5 rounded-2xl p-4">
                    <p class="text-indigo-300 text-xs font-bold uppercase mb-1">Reward</p>
                    <p class="text-xl font-bold">+10</p>
                </div>
                <div class="bg-white/5 rounded-2xl p-4">
                    <p class="text-red-400 text-xs font-bold uppercase mb-1">Penalty</p>
                    <p class="text-xl font-bold">-5</p>
                </div>
                <div class="bg-white/5 rounded-2xl p-4">
                    <p class="text-indigo-300 text-xs font-bold uppercase mb-1">Timer</p>
                    <p class="text-xl font-bold">15s</p>
                </div>
            </div>

            <button onclick="startGame()" class="group relative bg-white text-indigo-900 font-extrabold py-5 px-16 rounded-2xl text-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                START CHALLENGE
            </button>
        </div>

        <!-- Question Screen -->
        <div id="question-screen" class="hidden relative z-10">
            <div class="flex justify-between items-end mb-8">
                <div>
                    <p class="text-indigo-300/60 font-bold text-sm uppercase tracking-widest mb-1">Progress</p>
                    <h3 class="text-3xl font-black"><span id="q-count">1</span><span class="text-indigo-300/40 text-xl"> / 49</span></h3>
                </div>
                <div class="text-right">
                    <p class="text-indigo-300/60 font-bold text-sm uppercase tracking-widest mb-1">Total Score</p>
                    <div class="score-badge px-6 py-2 rounded-xl text-2xl font-black shadow-lg" id="score-display">0</div>
                </div>
            </div>

            <!-- Timer Bar -->
            <div class="w-full bg-white/10 h-2 rounded-full mb-10 overflow-hidden">
                <div id="timer-bar" class="timer-bar h-full bg-indigo-400 w-full shadow-[0_0_15px_rgba(129,140,248,0.5)]"></div>
            </div>

            <div class="bg-white/5 p-8 rounded-[2rem] border border-white/10 mb-8">
                <p id="question-text" class="text-2xl md:text-3xl font-bold text-white leading-snug">
                    Loading question...
                </p>
            </div>

            <div id="options-grid" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Options injected here -->
            </div>
        </div>

        <!-- Feedback Screen -->
        <div id="feedback-screen" class="hidden relative z-10 py-4">
            <div id="feedback-header" class="text-center mb-8">
                <div id="feedback-icon" class="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-4 border border-red-500/30">❌</div>
                <h2 class="text-4xl font-black text-white" id="feedback-title">Incorrect!</h2>
            </div>
            
            <div class="bg-white/5 rounded-3xl p-8 border border-white/10 mb-8">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
                    <div>
                        <p class="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">The Word</p>
                        <h4 class="text-4xl font-black text-white" id="target-word"></h4>
                    </div>
                    <div class="bg-white/10 px-4 py-2 rounded-lg text-indigo-200 font-bold italic" id="target-pos"></div>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <p class="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">Translation (中文)</p>
                        <p id="target-chinese" class="text-2xl font-bold text-white mb-4"></p>
                        
                        <p class="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">Meaning</p>
                        <p id="target-meaning" class="text-lg text-white/80 leading-relaxed"></p>
                    </div>
                    <div>
                        <p class="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-2">In a Sentence</p>
                        <p id="target-example" class="text-lg text-indigo-100 italic font-medium"></p>
                    </div>
                </div>
            </div>

            <button onclick="nextQuestion()" class="w-full bg-white text-indigo-900 font-black py-5 rounded-2xl text-xl hover:bg-indigo-50 transition-colors shadow-xl">
                CONTINUE SPRINT
            </button>
        </div>

        <!-- Result Screen -->
        <div id="result-screen" class="hidden relative z-10 py-6">
            <div class="text-center mb-10">
                <div class="w-24 h-24 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto text-5xl mb-6 border border-yellow-400/30">🏆</div>
                <h2 class="text-2xl font-bold text-indigo-200 mb-2">Challenge Complete!</h2>
                <h3 class="text-6xl font-black text-white mb-2" id="final-score">0</h3>
                <p class="text-indigo-300/60 font-bold uppercase tracking-widest">Total Marks Earned</p>
            </div>

            <div class="bg-white/5 rounded-[2rem] p-6 border border-white/10">
                <div class="flex items-center justify-between mb-6 px-2">
                    <h3 class="font-bold text-xl text-white">Revision Gallery</h3>
                    <span id="mistake-count" class="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">0 Errors</span>
                </div>
                <div id="review-list" class="space-y-3 max-h-[300px] overflow-y-auto pr-4">
                    <!-- Mistakes list injected here -->
                </div>
            </div>

            <div class="flex gap-4 mt-8">
                <button onclick="location.reload()" class="flex-1 bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10">Try Again</button>
                <button onclick="window.print()" class="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/30">Print Results</button>
            </div>
        </div>

    </div>

    <script>
        const vocabData = [
            { word: "aerobics", pos: "noun", chi: "有氧運動", meaning: "Energetic physical exercises, often performed to music.", example: "She goes to an aerobics class twice a week to stay fit.", sentence: "I joined a local _____ class to improve my heart health." },
            { word: "jogging", pos: "noun", chi: "慢跑", meaning: "The activity of running at a slow, regular speed.", example: "Jogging in the park is a great way to start the morning.", sentence: "He goes _____ every morning before work to stay active." },
            { word: "vitamin", pos: "noun", chi: "維他命", meaning: "A natural substance found in food that keeps the body healthy.", example: "Orange juice is a great source of vitamin C.", sentence: "The doctor suggested taking a daily _____ supplement to boost my health." },
            { word: "calories", pos: "noun", chi: "卡路里", meaning: "Units of energy found in food.", example: "Running burns a lot of calories.", sentence: "If you want to lose weight, you should track how many _____ you eat." },
            { word: "nutrition", pos: "noun", chi: "營養", meaning: "The process of getting the right food for health and growth.", example: "Good nutrition is vital for growing children.", sentence: "A balanced diet provides the _____ your body needs." },
            { word: "weight training", pos: "noun", chi: "重量訓練", meaning: "Exercise using heavy objects to build muscle strength.", example: "Weight training helped him build bigger muscles.", sentence: "She spends three days a week on _____ at the gym." },
            { word: "carbohydrates", pos: "noun", chi: "碳水化合物", meaning: "Substances like sugar or starch that provide the body with energy.", example: "Pasta and bread are high in carbohydrates.", sentence: "Athletes eat plenty of _____ before a long race for energy." },
            { word: "protein", pos: "noun", chi: "蛋白質", meaning: "Substance in food like meat and eggs needed for muscle growth.", example: "Protein is essential for repairing muscles.", sentence: "Chicken, fish, and beans are excellent sources of _____." },
            { word: "yoga", pos: "noun", chi: "瑜伽", meaning: "A set of physical and mental exercises for flexibility and calm.", example: "Yoga helps me relax after a long day.", sentence: "I practice _____ every morning to improve my balance and focus." },
            { word: "boot camp", pos: "noun", chi: "訓練營", meaning: "A short, intensive training program.", example: "The fitness boot camp was very difficult but effective.", sentence: "The summer _____ helped the team get into top physical shape." },
            { word: "cardio", pos: "noun", chi: "心肺運動", meaning: "Exercise that increases the heart rate.", example: "Swimming is a great form of cardio.", sentence: "I do thirty minutes of _____ on the treadmill every day." },
            { word: "vegetarian", pos: "noun/adj", chi: "素食者", meaning: "A person who does not eat meat.", example: "Being a vegetarian is better for the environment.", sentence: "Since he became a _____, he has eaten much more salad and tofu." },
            { word: "extreme sports", pos: "noun", chi: "極限運動", meaning: "Sports that are dangerous and exciting.", example: "Bungee jumping is one of the most popular extreme sports.", sentence: "Young people who love adrenaline often enjoy _____." },
            { word: "enquiries", pos: "noun", chi: "查詢", meaning: "The act of asking for information.", example: "The school office handles all student enquiries.", sentence: "Please call the front desk if you have any _____ about the course." },
            { word: "additional charge", pos: "noun phrase", chi: "額外費用", meaning: "An extra amount of money you have to pay.", example: "There is an additional charge for using the hotel gym.", sentence: "If you want a larger room, you must pay an _____." },
            { word: "healthcare system", pos: "noun", chi: "醫療系統", meaning: "The service of providing medical care to a population.", example: "The government is trying to improve the healthcare system.", sentence: "A strong _____ ensures that everyone can see a doctor when sick." },
            { word: "survival skills", pos: "noun", chi: "生存技能", meaning: "Skills that help you stay alive in dangerous situations.", example: "Learning how to start a fire is an important survival skill.", sentence: "Scouts are taught _____ like building shelters in the woods." },
            { word: "mountainboarding", pos: "noun", chi: "山地滑板", meaning: "A sport similar to snowboarding but on dirt or grass.", example: "Mountainboarding requires a lot of balance.", sentence: "We went _____ down the grassy hills last weekend." },
            { word: "skydiving", pos: "noun", chi: "跳傘", meaning: "The sport of jumping out of an airplane with a parachute.", example: "Skydiving was the most thrilling experience of my life.", sentence: "He celebrated his 21st birthday by going _____." },
            { word: "stress", pos: "noun", chi: "壓力", meaning: "Mental or emotional strain caused by difficult situations.", example: "Exercise is a great way to relieve stress.", sentence: "Too much _____ from schoolwork can make students feel ill." },
            { word: "thrilling experiences", pos: "noun phrase", chi: "刺激的經歷", meaning: "Events that cause a sudden feeling of excitement.", example: "Riding the roller coaster was one of my most thrilling experiences.", sentence: "Traveling to Africa provided many _____ for the family." },
            { word: "skateboarding", pos: "noun", chi: "滑板運動", meaning: "The sport of riding on a short board with wheels.", example: "Skateboarding is popular in many urban areas.", sentence: "The park has a special area dedicated to _____ and ramps." },
            { word: "anxiety", pos: "noun", chi: "焦慮", meaning: "A feeling of worry, nervousness, or unease.", example: "She felt great anxiety before her final exam.", sentence: "Regular exercise can help reduce feelings of _____." },
            { word: "pressure", pos: "noun", chi: "壓力", meaning: "The feeling of being forced to do something or do it well.", example: "Peer pressure can lead teenagers to make bad choices.", sentence: "There is a lot of _____ on students to get into university." },
            { word: "take risks", pos: "verb phrase", chi: "冒險", meaning: "To do something although something bad might happen.", example: "Successful entrepreneurs are often willing to take risks.", sentence: "If you want to win, sometimes you have to _____." },
            { word: "strength", pos: "noun", chi: "力量", meaning: "The quality of being physically strong.", example: "Lifting weights increases your physical strength.", sentence: "It takes a lot of _____ to lift those heavy boxes." },
            { word: "urban environment", pos: "noun", chi: "城市環境", meaning: "The surroundings of a city or town.", example: "Pollution is a major problem in an urban environment.", sentence: "Living in an _____ means being close to shops and transport." },
            { word: "gymnastics", pos: "noun", chi: "體操", meaning: "Physical exercises that develop strength and flexibility.", example: "Gymnastics requires incredible balance and skill.", sentence: "The young athlete practiced _____ on the bars every day." },
            { word: "federation", pos: "noun", chi: "聯盟", meaning: "An organization made up of smaller groups.", example: "The International Football Federation manages world soccer.", sentence: "The sports _____ set new rules for the upcoming season." },
            { word: "competitive sport", pos: "noun", chi: "競技運動", meaning: "A sport where people play against each other to win.", example: "Basketball is a very popular competitive sport.", sentence: "Playing a _____ helps children learn about teamwork." },
            { word: "flexibility", pos: "noun", chi: "柔軟度", meaning: "The ability to bend easily without breaking.", example: "Yoga is excellent for improving your flexibility.", sentence: "Dancers need great _____ in their legs and back." },
            { word: "audience", pos: "noun", chi: "觀眾", meaning: "The group of people gathered to watch or listen.", example: "The audience clapped loudly at the end of the play.", sentence: "The singer performed in front of a huge _____." },
            { word: "demonstration", pos: "noun", chi: "示範", meaning: "An act of showing how something works.", example: "The chef gave a cooking demonstration.", sentence: "Wait for the coach's _____ before you try the move yourself." },
            { word: "games console", pos: "noun", chi: "遊戲機", meaning: "A device used for playing video games.", example: "He spends his weekends playing on his games console.", sentence: "The new _____ has better graphics and faster loading times." },
            { word: "champion", pos: "noun", chi: "冠軍", meaning: "Someone who has won a competition.", example: "He is the world heavyweight boxing champion.", sentence: "After years of practice, she finally became the state _____." },
            { word: "professional", pos: "noun/adj", chi: "專業人士/專業的", meaning: "Doing something as a job rather than a hobby.", example: "She is a professional tennis player.", sentence: "It takes a high level of skill to be a _____ athlete." },
            { word: "amateur", pos: "noun/adj", chi: "業餘人士/業餘的", meaning: "Taking part in an activity for pleasure, not as a job.", example: "He is an amateur photographer.", sentence: "The tournament is open to both _____ and professional golfers." },
            { word: "tournament", pos: "noun", chi: "錦標賽", meaning: "A competition involving many players or teams.", example: "The school basketball tournament starts next week.", sentence: "Our team won every match in the summer _____." },
            { word: "achievements", pos: "noun", chi: "成就", meaning: "Things that are finished successfully, especially with effort.", example: "Winning the Nobel Prize is one of his greatest achievements.", sentence: "We should celebrate the academic _____ of all our students." },
            { word: "book title", pos: "noun", chi: "書名", meaning: "The name given to a book.", example: "The book title is printed on the front cover.", sentence: "I forgot the _____ but I remember the author's name." },
            { word: "arrange", pos: "verb", chi: "安排", meaning: "To plan or organize something in advance.", example: "We need to arrange a meeting to discuss the project.", sentence: "Can you _____ for a taxi to pick us up at 8 PM?" },
            { word: "poll", pos: "noun", chi: "民意調查", meaning: "A process of voting or asking for opinions.", example: "The recent poll shows that most people want change.", sentence: "We conducted a school _____ to choose the theme of the party." },
            { word: "theme", pos: "noun", chi: "主題", meaning: "The main subject or idea of something.", example: "The theme of the story is friendship.", sentence: "The _____ of the annual sports day is 'Health for All'." },
            { word: "registration", pos: "noun", chi: "註冊", meaning: "The act of recording a name on an official list.", example: "Registration for the course closes tomorrow.", sentence: "Please complete your _____ at the main hall before starting." },
            { word: "transcript", pos: "noun", chi: "成績單/抄本", meaning: "An official record of a student's grades.", example: "You need to submit your high school transcript to the university.", sentence: "The university requested a copy of my final academic _____." },
            { word: "spectator", pos: "noun", chi: "旁觀者", meaning: "A person who watches an event, especially a sports match.", example: "One lucky spectator won a free jersey.", sentence: "A _____ ran onto the field during the middle of the game." },
            { word: "planning and scheming", pos: "phrase", chi: "計劃與籌謀", meaning: "The act of making plans, often in a clever or secret way.", example: "There was a lot of planning and scheming behind the surprise party.", sentence: "The coach spent all night _____ for the championship match." },
            { word: "afford", pos: "verb", chi: "負擔得起", meaning: "To have enough money to pay for something.", example: "I can't afford a new car right now.", sentence: "Many students cannot _____ to study abroad without a scholarship." },
            { word: "scholarship", pos: "noun", chi: "獎學金", meaning: "Money given to a student to help pay for their education.", example: "She won a full scholarship to Harvard.", sentence: "The _____ covered his tuition fees and housing for four years." }
        ];

        let currentQuestion = 0;
        let score = 0;
        let timer;
        let timeLeft = 15;
        let mistakes = [];
        let gameActive = false;

        function startGame() {
            document.getElementById('start-screen').classList.add('hidden');
            document.getElementById('question-screen').classList.remove('hidden');
            score = 0;
            currentQuestion = 0;
            mistakes = [];
            gameActive = true;
            loadQuestion();
        }

        function loadQuestion() {
            if (currentQuestion >= vocabData.length) {
                endGame();
                return;
            }

            const data = vocabData[currentQuestion];
            document.getElementById('q-count').innerText = currentQuestion + 1;
            document.getElementById('score-display').innerText = score;
            document.getElementById('question-text').innerText = data.sentence.replace('_____', '_______');
            
            let options = [data.word];
            while (options.length < 4) {
                let randomWord = vocabData[Math.floor(Math.random() * vocabData.length)].word;
                if (!options.includes(randomWord)) options.push(randomWord);
            }
            options.sort(() => Math.random() - 0.5);

            const grid = document.getElementById('options-grid');
            grid.innerHTML = '';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "option-btn p-5 rounded-2xl font-bold text-white transition-all text-lg";
                btn.innerText = opt;
                btn.onclick = () => checkAnswer(opt);
                grid.appendChild(btn);
            });

            startTimer();
        }

        function startTimer() {
            timeLeft = 15;
            updateTimerBar();
            clearInterval(timer);
            timer = setInterval(() => {
                timeLeft--;
                updateTimerBar();
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    checkAnswer(null);
                }
            }, 1000);
        }

        function updateTimerBar() {
            const bar = document.getElementById('timer-bar');
            const percentage = (timeLeft / 15) * 100;
            bar.style.width = percentage + "%";
            if (timeLeft <= 5) bar.className = "timer-bar h-full bg-red-400 w-full shadow-[0_0_15px_rgba(248,113,113,0.5)]";
            else bar.className = "timer-bar h-full bg-indigo-400 w-full shadow-[0_0_15px_rgba(129,140,248,0.5)]";
        }

        function checkAnswer(selected) {
            clearInterval(timer);
            const correct = vocabData[currentQuestion].word;
            
            if (selected === correct) {
                score += 10;
                currentQuestion++;
                loadQuestion();
            } else {
                score = Math.max(0, score - 5);
                mistakes.push(vocabData[currentQuestion]);
                showFeedback();
            }
        }

        function showFeedback() {
            document.getElementById('question-screen').classList.add('hidden');
            document.getElementById('feedback-screen').classList.remove('hidden');
            
            const data = vocabData[currentQuestion];
            document.getElementById('target-word').innerText = data.word;
            document.getElementById('target-pos').innerText = data.pos;
            document.getElementById('target-chinese').innerText = data.chi;
            document.getElementById('target-meaning').innerText = data.meaning;
            document.getElementById('target-example').innerText = `"${data.example}"`;
        }

        function nextQuestion() {
            document.getElementById('feedback-screen').classList.add('hidden');
            document.getElementById('question-screen').classList.remove('hidden');
            currentQuestion++;
            loadQuestion();
        }

        function endGame() {
            gameActive = false;
            document.getElementById('question-screen').classList.add('hidden');
            document.getElementById('result-screen').classList.remove('hidden');
            document.getElementById('final-score').innerText = score;
            document.getElementById('mistake-count').innerText = mistakes.length + (mistakes.length === 1 ? " Error" : " Errors");

            const reviewContainer = document.getElementById('review-list');
            reviewContainer.innerHTML = '';
            
            if (mistakes.length === 0) {
                reviewContainer.innerHTML = `
                    <div class="text-center py-10">
                        <p class="text-green-400 font-bold text-xl">Perfect Performance! 🌟</p>
                        <p class="text-indigo-300/60 mt-2">You didn't miss a single word.</p>
                    </div>
                `;
            } else {
                mistakes.forEach(m => {
                    const div = document.createElement('div');
                    div.className = "bg-white/5 p-4 rounded-2xl flex justify-between items-center border border-white/5";
                    div.innerHTML = `
                        <div>
                            <span class="font-bold text-white">${m.word}</span>
                            <span class="text-xs text-indigo-400 ml-2 italic">(${m.pos})</span>
                        </div>
                        <div class="text-indigo-200 font-medium">${m.chi}</div>
                    `;
                    reviewContainer.appendChild(div);
                });
            }
        }
    </script>
</body>
</html>
