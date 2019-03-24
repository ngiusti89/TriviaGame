$(document).ready(function () {

    // trivia objects
    var triviaQuestions = [{
        question: "What network is The Good Place on?",
        choices: ["CBS", "NBC", "ABC", "FOX"],
        answer: 1,
        photo: "/assets/images/NBC.gif"
    },
    {
        question: "What actress plays Eleanor?",
        choices: ["Kristen Bell", "Kristen Stewart", "Kirsten Dunst", "Kristen Wiig"],
        answer: 0,
        photo: "/assets/images/EleanorNoice.gif"
    },
    {
        question: "Chidi was a professor of...",
        choices: ["Philosophy", "Business", "Ethics", "Psychology"],
        answer: 2,
        photo: "/assets/images/ChidiYes.gif"
    },
    {
        question: "Where does Janet live?",
        choices: ["Space", "A Computer", "The Void", "Earth"],
        answer: 2,
        photo: "/assets/images/JanetYes.gif"
    },
    {
        question: "Who does Tahani's have an intense rivalry with?",
        choices: ["Her cousin", "Her sister", "Her Mother", "Her neice"],
        answer: 1,
        photo: "/assets/images/TahaniYes.gif"
    },
    {
        question: "What type of food is most prevalent in The Good Place?",
        choices: ["Pizza", "Ice Cream", "Frozen Yogurt", "Italian"],
        answer: 2,
        photo: "/assets/images/frozenYogurt.gif"
    },
    {
        question: "What form of transportation is used in The Good Place?",
        choices: ["Hyperwarp", "Spaceship", "Bicycle", "Train"],
        answer: 3,
        photo: "/assets/images/trains.gif"
    },
    {
        question: "Who gets married in Season 1?",
        choices: ["Janet & Jason", "Tahani & Jason", "Eleanor & \ Chidi", "Michael & Janet"],
        answer: 0,
        photo: "/assets/images/wedding.gif"
    }];

    // variables
    var rightCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var timer = 10;
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

    // click start button to start game (hides start button, displays question, starts timer)
    $("#start").click(function () {
        $("#start").hide();
        showQuestion();
        runTimer();

        for (var i = 0; i < triviaQuestions.length; i++) {
            holder.push(triviaQuestions[i]);
        }
    })

    // start timer, countdown by second
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    // timer countdown
    function decrement() {
        // display countdown in div
        $("#timeleft").html("<h3>Time left: " + timer + "</h3>");
        timer--;
        // if timer reaches zero
        if (timer === 0) {
            // adds to tally of unanswered questions
            unansweredCount++;
            // stops timer
            stop();
            // displays correct answer
            $("#answerDiv").html("<p>Time's up!<br><small>The correct answer is:</small> " + pick.choices[pick.answer] + "!</p>");
            // 
            hidepicture();
        }
    }
    // stop timer
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    // pick question at random and displays question and possible answers
    function showQuestion() {
        // generate random index in array
        index = Math.floor(Math.random() * triviaQuestions.length);
        pick = triviaQuestions[index];
        // console log displayed object properties
        console.log(pick.question, pick.choices, pick.answer, index)

        // display question in div
        $("#questionDiv").html("<h2>" + pick.question + "</h2>");
        // iterate through answer array and display in div
        for (var i = 0; i < pick.choices.length; i++) {
            var userchoices = $("<div>");
            userchoices.addClass("selections");
            userchoices.html(pick.choices[i]);
            userchoices.attr("data-guessvalue", i);
            $("#answerDiv").append(userchoices);
            // answer position in array
        }

        // click guess answer
        $(".selections").click(function () {
            // grab answer position in array
            userGuess = parseInt($(this).attr("data-guessvalue"));

            // if user guess right or wrong
            // if right: stop timer, add to right answer tally, display correct! text and picture
            if (userGuess === pick.answer) {
                stop();
                rightCount++;
                userGuess = "";
                $("#answerDiv").html("<p>Correct!</p>");
                hidepicture();

                // if wrong: stop timer, add to wrong answer tally, display oh no! text and picture
            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerDiv").html("<p>Oh no!<br><small>The correct answer is:</small> " + pick.choices[pick.answer] + "!</p>");
                hidepicture();
            }
        })
    }
    // show and hide photo when needed
    function hidepicture() {
        $("#answerDiv").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        triviaQuestions.splice(index, 1);

        // hides end of game content until needed
        var hidepic = setTimeout(function () {
            $("#answerDiv").empty();
            timer = 10;

            // show score tally after all questions have been asked
            if ((wrongCount + rightCount + unansweredCount) === questionsCount) {
                // removes question from div
                $("#questionDiv").empty();
                // shows end of game text
                $("#questionDiv").html("<h2>Game Over!<br><small>Here's how you did: </small></h2>");
                $("#answerDiv").append("<h4> Correct: " + rightCount + "</h4>");
                $("#answerDiv").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerDiv").append("<h4> Unanswered: " + unansweredCount + "</h4>");
                $("#reset").show();
                rightCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

            // if questions remain, run timer and ask remaining questions
            } else {
                runTimer();
                showQuestion();

            }
        // wait three seconds until next question
        }, 3000);
    }

    // resets game when click Play again
    $("#reset").click(function () {
        $("#reset").hide();
        $("#answerDiv").empty();
        $("#questionDiv").empty();
        for (var i = 0; i < holder.length; i++) {
            triviaQuestions.push(holder[i]);
        }
        runTimer();
        showQuestion();
    })
})