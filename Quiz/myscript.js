var questions = [{
	question: "What is the baby of a Moth known as?",
	choices:["baby", "infant", "kit", "larva"],
	correctAnswer: 3
},

{
	question: "What is the adult of a kid called?",
	choices:["calf", "doe", "goat", "chick"],
	correctAnswer: 2
},

{
	question: "What is the young of Bufallo called?",
	choices:["calf", "baby", "pup", "cow"],
	correctAnswer: 0
},

{
	question: "What a baby Alligator called?",
	choices:["baby", "gator", "hatchling", "calf"],
	correctAnswer: 2
},

{
	question: "What is a baby Goose called?",
	choices:["gooser", "gosling", "gup", "pup"],
	correctAnswer: 1
},

{
	question: "What is a baby Hamster called?",
	choices:["pup", "infant", "chick", "billy"],
	correctAnswer: 0
},

{
	question: "What is a baby Hawk called?",
	choices:["hawklett", "pup", "larva", "eyas"],
	correctAnswer: 3
},

{
	question: "What is a baby Grasshopper called?",
	choices:["hopper", "nymph", "stick", "pup"],
	correctAnswer: 1
},

{
	question: "What is a baby Kangaroo called?",
	choices:["kinga", "joey", "calf", "baby"],
	correctAnswer: 1
},

{
	question: "What is a baby Whale called?",
	choices:["whala", "cub", "grub", "infant"],
	correctAnswer: 1
},

{
	question: "What is a baby Monkey called?",
	choices:["infant", "baby", "calf", "pup"],
	correctAnswer: 0
},

{
	question: "What is a baby Bear called?",
	choices:["cub", "baby", "young bear", "bearlet"],
	correctAnswer: 0
}];

var currentQuestion =0;
var correctAnswers =0;
var quizOver = false;

$(document).ready(function (){
	displayCurrentQuestion();
	$(this).find(".quizmessage").hide();
	$(this).find(".nextButton").on("click", function (){
		if(!quizOver){
			value=$("input[type='radio']:checked").val();
			if(value == undefined){
				$(document).find(".quizmessage").text("Please select an answer");
				$(document).find(".quizmessage").show();
			}
			else{
				$(document).find(".quizmessage").hide();
				if(value == questions[currentQuestion].correctAnswer){
					correctAnswers++;
				}
				currentQuestion++;
				if(currentQuestion < questions.length){
					displayCurrentQuestion();
				}
				else{
					displayScore();
					$(document).find(".nextButton").text("Want To Play Again?");
					quizOver =true;
				}
			}
		}
		else{
			quizOver= false;
			$(document).find(".nextButton").text("Next Question");
			resetQuiz();
			displayCurrentQuestion();
			hideScore();
		}
	});
});

function displayCurrentQuestion(){
	console.log("In display current question");
	var question =questions[currentQuestion].question;
	var questionClass = $(document).find(".quizcontainer > .question");
	var choiceList = $(document).find(".quizcontainer > .choiceList");
	var numChoices = questions[currentQuestion].choices.length;
	
	$(questionClass).text(question);
	

	$(choiceList).find("li").remove();
	$(choiceList).find("baby").remove();
	var choice;
	
	for(i=0; i<numChoices; i++){
		choice = questions[currentQuestion].choices[i];
		$(choiceList).append( '<li><input type="radio" name="dynradio" /></li>&nbsp;&nbsp;&nbsp;&nbsp;'+choice);

	}
}

function resetQuiz(){
	currentQuestion =0;
	correctAnswer=0;
	hideScore();
}

function displayScore(){
	if(correctAnswers>7){
		$(document).find(".quizcontainer > .result").text("You scored : " + correctAnswers + " out of : "+ questions.length + "........ You Already got your reward by playing the game...because the game increased your knowledge.....and the most precious thing is the world is knowledge....lol");
		$(document).find(".quizcontainer > .result").show();
	}
	else if(correctAnswers>=5 && correctAnswers<=7){
		$(document).find(".quizcontainer > .result").text("You scored : " + correctAnswers + " out of : "+ questions.length + " ....... Well tried but missed the gift by one point....");
		$(document).find(".quizcontainer > .result").show();
	}
	else{
		$(document).find(".quizcontainer > .result").text("You scored : " + correctAnswers + " out of : "+ questions.length + " ....... Please study hard otherwise you will get nice suprise gifts from your teachers and parents......lol");
		$(document).find(".quizcontainer > .result").show();
	}
}

function hideScore(){
	$(document).find(".result").hide();
}
				
