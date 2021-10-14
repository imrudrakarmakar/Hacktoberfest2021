var name1=prompt("Hey What's your name???");
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice,botChoice;
    humanChoice=yourChoice.id;

    botChoice=numberToChoice(randToRpsInt());
    console.log('Computer Choice: ',botChoice);

    results=decideWinner(humanChoice,botChoice);//[0,1]humanlost| bot won
    console.log(results);

    message=finalMessage(results);//{'message':'You won!','color':'green'}
    console.log(message);

    rpsFrontEnd(yourChoice.id,botChoice,message);
}
function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return['rock','paper','scissors'][number];
}

function decideWinner(yourChoice,computerChoice){
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissors':0},
        'scissors':{'paper':1,'scissors':0.5,'rock':0}
    };

    var yourScore=rpsDatabase[yourChoice][computerChoice];
    var computerScore=rpsDatabase[computerChoice][yourChoice];

    return [yourScore,computerScore];
}
function finalMessage([yourScore,computerScore]){
    if (yourScore===0){
        return {'message':'Sorry you lost! '+" 😩",'color':'red'};
    }
    else if (yourScore===0.5){
        return {'message':'Match tied! '+"😓" ,'color':'blueviolet'};
    }
    else{
        return {'message':'You won! '+ name1 +" 🤩 " ,'color':'green'};
    }
}
function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imagesDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+imagesDatabase[humanImageChoice]+"'height=200 width=200 style='box-shadow:0px 10px 58px rgba(37,50,233,1);'>"
    messageDiv.innerHTML="<h3 style='color: "+finalMessage['color']+";font-size:60px;padding:30px;'>"+finalMessage['message']+"</h3>";
    botDiv.innerHTML="<img src='"+imagesDatabase[botImageChoice]+"'height=200 width=200 style='box-shadow:0px 10px 58px rgba(243,38,24,1);'>"

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
}