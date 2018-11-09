
// Gives html elements proper names
function setAnswerNames(){
  let answerLists = document.getElementsByClassName("answer");
  let choiceLists = document.getElementsByClassName("choice");
  let index = 0;
  let questionNum = 1;
  for(var x = 0; x < answerLists.length; x++){
    answerLists[x].setAttribute("name", "choice" + questionNum);
    choiceLists[x].setAttribute("name", "choicetext" + questionNum);
    if(index == 3){
      index = -1;
      questionNum++;
    }
      index++;
  }
}

// submits quiz
function submitQuiz(){
  storeQuiz();
  postItems();
  success();
}

// Checks Answers
function checkAnswers(){
  userAnswers = createBoolArray();
  for(var x = 0; x < answerArray.length; x++){
    let currentQuestion = document.getElementsByName("choice" + (x+1));
    let currentText = document.getElementsByName("choicetext" + (x+1));
    for(var y = 0; y < maximumChoices; y++){

        if(y == answerArray[x]){
          markAnswer(currentText[y], "green");
        }

        if(currentQuestion[y].checked && y == answerArray[x]){
            markAnswer(currentText[y], "green");
            userAnswers[x] = true;
        }
        if(currentQuestion[y].checked && y != answerArray[x]){
            markAnswer(currentText[y], "red");
        }

  }

}
  displayScore();
  disableAll();
}

// helper function creates an array of booleans false
function createBoolArray(){
  let boolArray = [];
  for(var x = 0; x < answerArray.length; x++){
      boolArray.push(false)
    }
    return boolArray
}

function setButtonClass(){
  let deleteButtons = document.getElementsByClassName("delete");
  for (var x= 0; x < deleteButtons.length; x++){
    deleteButtons[x].setAttribute("onclick", "erase(" + x + ");");
  }
}

function starttest(){
     getData();
}
