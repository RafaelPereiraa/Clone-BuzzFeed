import { Component, OnInit } from '@angular/core';
import questionsData from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  title: string = "Teste titulo component ts";

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = "";

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished:boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (questionsData){
      this.finished = false;
      this.title = questionsData.title;
      this.questions = questionsData.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
    }
  }

  chosenAnswer(value:string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;

    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer:string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = questionsData.results[finalAnswer as keyof typeof questionsData.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous, current, i, arr) => {
      if(arr.filter(item => item === previous).length > arr.filter(item => item === current).length){
        return previous
      } else {
        return current
      }
    })
    return result;
  }
}
