'use strict';

{
  const quiz = document.getElementById('quiz');
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('score');
  const scoreLabel = document.querySelector('#score > p');

  console.log(scoreLabel);

  const quizList = [
    {q: 'acceptの意味は？', a: ['受託する', 'アクセス', '可能にする']},
    {q: 'blankの意味は？', a: ['ブランク', '消す', '回避する']},
    {q: 'capacity意味は？', a: ['容量', 'キャッシュ', 'チェックボックス ']}
  ];

  let currentNum = 0;

  let isAnswered;

  let score = 0;

  
  
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * ( i + 1 ));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function checkedAnswer(li) {
    if(isAnswered === true) {
      return;
    }
    isAnswered = true;

    if(li.textContent === quizList[currentNum].a[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function quizSet() {
    isAnswered = false;

    question.textContent = quizList[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices =  shuffle([...quizList[currentNum].a]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkedAnswer(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizList.length - 1) {
      btn.textContent = 'Show Score';
      scoreLabel.classList.remove('hidden');
    }
  }

  quizSet();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizList.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizList.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      quizSet();
    }
  });

  scoreLabel.textContent = `Score: ${score} / ${quizList.length}`;
}
