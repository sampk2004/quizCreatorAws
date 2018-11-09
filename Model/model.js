var questions = [];
var choices = [];
var answers = [];
var html = [];
var maximumChoices = 4;
var questionLength = 1;
var answerData;
var questionData;
var template;
var answerArray = [];
var userAnswers = [];
var dataResult;
var jsonObj = {};
var testd = [];
var mode = "";

function setQuestionslength(){
      questionLength = document.getElementsByName("qheading").length;
}
// Sets questionlength
function setQuestionslength2(data){

     let main = document.getElementById("quizMain");

     answers = JSON.parse(data)['answers'];

     if (answers.length == 0){
       error();
     }
     questionlength = JSON.parse(data)['length']

     for(var x = 0; x < questionlength; x++){

          if ( x == 0){
               answerArray = JSON.parse(data)['answers'];
               console.log(answerArray);
          }
        let div = document.createElement("div");
          info = JSON.parse(data)['question' + (x + 1)]
             div.innerHTML = info;
             main.parentNode.insertBefore(div, main);
     }

     remakeView();
}
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

// initalizes template variable
function setHTML(){
  template = document.getElementById('questionTemplate').innerHTML;
}

//initalizes answer array
function parseAnswer(){

  let data = answerData[0];
  for(var x = 0; x < Object.keys(answerData[0]).length; x++){
      answerArray.push(data["answer" + x]);
  }
}

// Stores quiz data in local storage
function storeQuiz(){

  html = [];

  let test = document.getElementsByClassName("questionheading");
  jsonObj['quizID'] = "1";
  for(var x = 0; x < test.length; x++){
      jsonObj["question" + (x + 1)] = test[x].innerHTML;
  }
  setAnswerChoiceText();
  html.push(jsonObj)

}

function setAnswerChoiceText(){
  let index = 0;
  let temparray = []
  for(var x = 0 ; x < questionLength; x++){
    let answerlist = document.getElementsByName("choice" + (x+1));
    for(var y = 0; y < maximumChoices; y++){
      if(answerlist[y].checked){
          temparray.push(y);
      }
    }
  }
  jsonObj["length"] = questionLength;
  jsonObj["answers"] = temparray
}

// initalizes user's models
function initModel(){
     getData();
  // parseAnswer();
}

// submits quiz
function submitQuiz(){
  storeQuiz();
  success();
}

// Posts items
function postItems(){

    let apigClient = apigClientFactory.newClient();
		let params = {
			//This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
			'quizID' : "1"
		};

          console.log(html);

		let body = html[0];

		let additionalParams = {
			//If there are any unmodeled query parameters or headers that need to be sent with the request you can add them here
			headers: {

			},
			queryParams: {
				'quizID' : "1"
			}
		};

		apigClient.quizPost(params, body, additionalParams)
			.then(function(result){
				console.log(result.data);
			}).catch( function(result){
				console.log("error");
			});
		return false;
}

function setModels(data){
     setQuestionslength2(data);

}
function getData(){

    let apigClient = apigClientFactory.newClient();

		let params = {
			//This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
			'quizID' : "1"
		};
		let body = {};
    let additionalParams = {};

		apigClient.quizGet(params, body, additionalParams)
			.then(function(result){
				let testd = JSON.stringify(result.data.Item);
                    setModels(testd);
			}).catch( function(result){
				  error();
			});

     return false;
}
