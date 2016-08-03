'use strict';

var FindWords = {
	board: 9,//размер поля
	//total: 0, //общее число кликов за игру
	intPairClicks: 0, //число парных кликов за игру
	intClicks: 0, //количество показываемых одновременно слов
	first: ['be', 'do', 'see', 'begin', 'bit', 'speak', 'understand', 'sit', 'blow', 'say'],
	second: ['was', 'did', 'saw', 'began', 'beat', 'spoke', 'understood', 'sat', 'blew', 'sad'],
	arrayWords: function(){
		var pairs = this.board/2; //количество пар слов 
		var indexArray = []; //здесь будут храниться индексы выбранных слов
		var randomNumber; //случайное число в дипазоне от 0 до длины массива со словами
		var maxNumber = this.first.length; //получаем длину массива со словами

		while (indexArray.length < pairs){ //в цикле получаем индексы случайных слов
			var rundomNumber = Math.floor(Math.random() * maxNumber); //создадим случайное число

			if (indexArray.indexOf(rundomNumber) == -1) { //проверяем есть ли у нас такой индекс
				indexArray.push(rundomNumber); //записываем в массив с индексами
			}
		}

		var boardWords = []; //сюда будут попадать случайные пары слов для игрового поля
		
		for (var val of indexArray) { //перебираем значения массива со сгенерированными индексами
		    boardWords.push(this.first[val],this.second[val]); //добавляем на поле пары слов из массивов first и second
		}
		for (var i=0; i<boardWords.length; i++){ //перемешиваем значения массива случайным образом
			boardWords.push(boardWords.splice((Math.random() * boardWords.length), 1));
		}
		document.getElementById('total').innerHTML = '<b>'+this.intPairClicks+'</b>';
		return boardWords;
	}
	
};

FindWords.fillBoard = function(){
		var boardWords = this.arrayWords();
		console.log(boardWords);
		function newBoard(){
			for(var i=0; i<boardWords.length; i++){
				var squareWord = document.getElementById('word'+i);
				squareWord.innerHTML = boardWords[i];// записали слова в квадраты
				squareWord.setAttribute("class", "close"); //сразу скрыли все квадраты
			}
			
		}
		
		window.onload = newBoard;

	};
	

FindWords.compare = function(){

	var step = 0;
	var words = [];
	var id =[];
	
	document.getElementById('words-board').onclick = function(eventObj){

		var word = eventObj.target;

		var compare = 0;
		var wordID = word.id;
		if(step<2){
			if(word.className == 'close'){//на случай, если пользователь продолжает нажимать на первый квадрат
				step = step+1;
			}
			
			word.removeAttribute('class');

			function getID(){ //получаем индексы для дальнейщего сравнения парах
				var inner = word.innerHTML;
				var index1 = FindWords.first;
				var index2 = FindWords.second;
				var compareIndex1 = index1.indexOf(inner);
				var compareIndex2 = index2.indexOf(inner);
				if(compareIndex1 != -1){
					compare = compareIndex1;
				}
				else if(compareIndex2 != -1){
					compare =compareIndex2;
				}
				return compare;
			}
			
			
			if(step<=1){
				var word1 = getID();
				words.push(word1);
				id.push(wordID);
			}
			else{
				var word2 = getID();
				words.push(word2);
				id.push(wordID);
			}
			console.log(id);

			
			//console.log(wordID);
			//console.log(compare);
			//console.log(step);
		}
		if(words[0] == words[1]){
				window.setTimeout(document.getElementById(id[0]).setAttribute("class", "gray"), 3500);
				window.setTimeout(document.getElementById(id[1]).setAttribute("class", "gray"), 3500);
			}
			else{
				//window.setTimeout(document.getElementById(id[0]).setAttribute("class", "close"), 3500);
				//window.setTimeout(document.getElementById(id[1]).setAttribute("class", "close"), 3500);
				//word.setAttribute('class', 'close');
			}
	
	}


};
		

/*FindWords.guess(){

};

FindWords.notGuess(){
	
};	*/

	
FindWords.fillBoard();

FindWords.compare();



