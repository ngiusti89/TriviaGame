$(document).ready(function () {

    // trivia objects
    var triviaQuestions = [{
        question: "What network is The Good Place on?",
        choice: ["CBS", "NBC", "ABC", "FOX"],
        answer: 1,
        photo: "/assets/images/NBC.gif"
    },
    {
        question: "What actress plays Eleanor?",
        choice: ["Kristen Bell", "Kristen Stewart", "Kirsten Dunst", "Kristen Wiig"],
        answer: 0,
        photo: "/assets/images/EleanorNoice.gif"
    },
    {
        question: "Chidi was a professor of...",
        choice: ["Philosophy", "Business", "Ethics", "Psychology"],
        answer: 2,
        photo: "/assets/images/ChidiYes.gif"
    },
    {
        question: "Where does Janet live?",
        choice: ["Space", "A Computer", "The Void", "Earth"],
        answer: 2,
        photo: "/assets/images/JanetYes.gif"
    },
    {
        question: "Who does Tahani's have an intense rivalry with?",
        choice: ["Her cousin", "Her sister", "Her Mother", "Her neice"],
        answer: 1,
        photo: "/assets/images/TahaniYes.gif"
    },
    {
        question: "What type of food is most prevalent in The Good Place?",
        choice: ["Pizza", "Ice Cream", "Frozen Yogurt", "Italian"],
        answer: 2,
        photo: "/assets/images/frozenYogurt.gif"
    },
    {
        question: "What form of transportation is used in The Good Place?",
        choice: ["Hyperwarp", "Spaceship", "Bicycle", "Train"],
        answer: 3,
        photo: "/assets/images/trains.gif"
    },
    {
        question: "Who gets married in Season 1?",
        choice: ["Janet and Jason", "Tahani and Jason", "Eleanor and Chidi", "Michael and Janet"],
        answer: 0,
        photo: "/assets/images/wedding.gif"
    }];

    // variables
    var rightCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var timer = 20;
    var running = false;
    var intervalId;
    var userGuess = "";
    var questionsCount = triviaQuestions.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    // hides "play again"
    $("#reset").hide();

    //click start button to start game (hides start button, displays question, starts timer)
    $("#start").click( function(){
        $("#start").hide();
        showQuestion();
        runTimer();
        for (var i = 0; i < triviaQuestions.length; i++) {
            holder.push(triviaQuestions[i]);
        }
    })

    //start timer
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time left: " + timer + "</h3>");
        timer--;
        //if timer reaches zero
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#result").html("<p>Time's up! The correct answer is:<br>" + pick.choice[pick.answer] + "!</p>");
            hidepicture();
        }
    }
    //stop timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    //pick question at random
    //displays question and possible answers
    function showQuestion() {
        
        index = Math.floor(Math.random() * triviaQuestions.length);
        pick = triviaQuestions[index];

        
        $("#choices").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            
            userChoice.attr("data-guessvalue", i);
            $("#result").append(userChoice);
            //		}
        }

        //click function to select answer and outcomes
        $(".answerchoice").click( function(){
            
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                rightCount++;
                userGuess = "";
                $("#result").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#result").html("<p>Wrong! The correct answer is:<br>" + pick.choice[pick.answer] + "!</p>");
                hidepicture();
            }
        })
    }

    function hidepicture() {
        $("#result").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        triviaQuestions.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#result").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongCount + rightCount + unansweredCount) === questionsCount) {
                $("#choices").empty();
                $("#choices").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#result").append("<h4> Correct: " + rightCount + "</h4>");
                $("#result").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#result").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#reset").show();
                rightCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

            } else {
                runTimer();
                showQuestion();

            }
        }, 3000);


    }

    $("#reset").click( function(){
        $("#reset").hide();
        $("#result").empty();
        $("#choices").empty();
        for (var i = 0; i < holder.length; i++) {
            triviaQuestions.push(holder[i]);
        }
        runTimer();
        showQuestion();
    })
})