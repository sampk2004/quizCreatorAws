// entry point for Admin interace add button
function init(){

  createQuestion();
  setQuestionslength();
  setNames(1);
  setAnswerNames();
  setButtonClass();
}

// Entrypoint for userview
function initUserView(){
  parseHtml();
  lockQuestions();
  setNames(0);
  hideDelete();
  decodeHTML();
}

// Admin crestes function when add is pressed
function createQuestion(){

  let mainContainer = document.getElementById('buttoncontainer');
  let question = document.createElement("div");
  question.className = "questionheading";
  question.innerHTML = template;
  mainContainer.parentNode.insertBefore(question, mainContainer);

}

// gives proper name to each question
function setNames(mode){

  let setting = parseInt(mode);
  let qhead = document.getElementsByName("qheading");
  let ahead = document.getElementsByName("aheading");

  for(var names = 0; names < qhead.length; names++){
    if(setting === 1){
      qhead[names].innerHTML = "Question " + (names + 1) + " Text *";
      ahead[names].innerHTML = "Answers " + (names + 1) + " *";
    } else {
      qhead[names].innerHTML = "Question " + (names + 1);
      ahead[names].style.display = "none";
    }
  }
}

// Makes content uneditable and removes borders
function lockQuestions(){
  let qtext = document.getElementsByClassName("questionText");
  let choicemade = document.getElementsByClassName("choice");
  let toggle = document.getElementsByClassName("tag");

  for(var x = 0; x< toggle.length; x++){
       toggle[x].disabled = "true";
  }
  for(var x = 0; x< choicemade.length; x++){
    choicemade[x].setAttribute("contenteditable", "false")
    choicemade[x].style.border = "none";
  }
  for(var y = 0; y< qtext.length; y++){
    qtext[y].setAttribute("contenteditable", "false")
  }
}

// error message when localstorage is empty
function error(){

  let mainContainer = document.getElementById('quizMain');
  let error = document.createElement("h1");
  let button = document.getElementById("submit");

  error.innerHTML = "Error: 123123123123 No Quiz Data Found";
  mainContainer.appendChild(error);
  button.style.display = "none";

}

// changes color of choices
function markAnswer(answer, color){
  answer.style.border = "solid 1px " + color
}

// display scores on submit
function displayScore(){
  let score = document.getElementById('score');
  let right = 0;
  for(var x = 0; x < answerArray.length; x++){
    if(userAnswers[x])
        right++;
  }
  percent = (right/answerArray.length).toPrecision(2) * 100;
  score.innerHTML = "Score: " + right + "/" + answerArray.length + " Percent: " + percent + "%";
  score.style.display = "block";
}

// disables submit button
function disableAll(){
  let button = document.getElementById("submit");
  let answers = document.getElementsByClassName("answer");
  let toggle = document.getElementsByClassName("tag");
  button.disabled = "true";

  for(var x = 0 ; x < answers.length; x++){
    answers[x].disabled = "true";
  }
}

// puts unicode code into html code
function decodeHTML(){
  let qHeading = document.getElementsByClassName("questionText");
  for(var x = 0 ; x < qHeading.length; x++){
      qHeading[x].innerHTML = qHeading[x].innerText;
      let choices = document.getElementsByName("choicetext" + (x+1));
      for(var y = 0; y < maximumChoices; y++){
        choices[y].innerHTML = choices[y].innerText;
        }
      }
  }
  function erase(index){
     let selectedDiv = document.getElementsByClassName("questionheading");
     selectedDiv[index].remove();

     setQuestionslength();
     setAnswerNames();
     setNames(1);
     setButtonClass();
  }

  // creates view base on localstorage data
  function parseHtml(){

    let main = document.getElementById("quizMain");
    for(var x = 0; x < Object.keys(questionData[0]).length; x++){
      let div = document.createElement("div");
      selected = questionData[0];
      info = selected["question" + (x + 1)];
      div.innerHTML = info;
      main.parentNode.insertBefore(div, main);
    }
  }

function hideDelete(){
  let selectedDelete = document.getElementsByClassName("delete");
  for (var x = 0; x < selectedDelete.length; x++){
    selectedDelete[x].style.display = "none";
  }
}
function success(){

  document.getElementById("alert").style.display = "block";

  setTimeout(function() {
      $('#alert').fadeOut('slow');
  }, 1000);
}

function toggle(test){

     if(test.getAttribute("data-state") === "easy"){
          test.setAttribute("class", "tag btn btn-danger");
          test.setAttribute("data-state", "hard");
          test.innerHTML = "Hard";
     } else {
          test.setAttribute("class", "tag btn btn-success");
          test.setAttribute("data-state", "easy");
          test.innerHTML = "Easy";
     }
}

// function hide(){
//      let test = document.getElementsByClassName("tag");
//      let question = document.getElementsByClassName("questionBox");
//      let qHeading = document.getElementsByName("qheading");
//      let count = 0;
//      console.log(mode);
//
//      for(var x = 0; x < test.length; x++){
//           if(mode !== test[x].getAttribute("data-state")){
//                question[x].style.display = "none";
//           } else {
//                qHeading[x].innerHTML = "Question " + (count+1);
//                count ++;
//           }
//      }
//      if (count === test.length){
//           error();
//      }
// }

window.onbeforeunload = function(){
  return 'Are you sure you want to leave?';
};
function remakeView(){
     hideDelete();
     lockQuestions();
     setNames(0);
     decodeHTML();
}
