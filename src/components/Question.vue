<template>
  <div class="question">
    <header>
      <span class="question-category">{{question.category}}</span>
      <span class="close" @click="$emit('goto', 'categories')"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39759 14.6023 1.66663 9.99996 1.66663C5.39759 1.66663 1.66663 5.39759 1.66663 9.99996C1.66663 14.6023 5.39759 18.3333 9.99996 18.3333Z" stroke="#53595F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.5 7.5L7.5 12.5" stroke="#53595F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.5 7.5L12.5 12.5" stroke="#53595F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>Close</span>
    </header>
    <div class="question-box box">
      <header>
        <h2>Question {{questionNumber}}</h2>
        <span :class="difficultyClass">
          <svg class="star" width="10" height="9" viewBox="0 0 10 9" fill="none"><path d="M4.71468 0.878115C4.80449 0.601722 5.19551 0.601722 5.28532 0.878115L6.05522 3.24762C6.09538 3.37123 6.21057 3.45492 6.34053 3.45492H8.83198C9.12259 3.45492 9.24343 3.8268 9.00831 3.99762L6.99269 5.46205C6.88755 5.53845 6.84355 5.67386 6.88371 5.79746L7.65361 8.16697C7.74341 8.44336 7.42707 8.6732 7.19196 8.50238L5.17634 7.03795C5.07119 6.96155 4.92881 6.96155 4.82366 7.03795L2.80804 8.50238C2.57293 8.6732 2.25659 8.44336 2.34639 8.16697L3.11629 5.79746C3.15645 5.67386 3.11245 5.53845 3.00731 5.46205L0.991687 3.99762C0.756573 3.8268 0.877406 3.45492 1.16802 3.45492H3.65947C3.78944 3.45492 3.90462 3.37123 3.94478 3.24762L4.71468 0.878115Z" fill="#343C58"/></svg>
          <svg class="star" width="10" height="9" viewBox="0 0 10 9" fill="none"><path d="M4.71468 0.878115C4.80449 0.601722 5.19551 0.601722 5.28532 0.878115L6.05522 3.24762C6.09538 3.37123 6.21057 3.45492 6.34053 3.45492H8.83198C9.12259 3.45492 9.24343 3.8268 9.00831 3.99762L6.99269 5.46205C6.88755 5.53845 6.84355 5.67386 6.88371 5.79746L7.65361 8.16697C7.74341 8.44336 7.42707 8.6732 7.19196 8.50238L5.17634 7.03795C5.07119 6.96155 4.92881 6.96155 4.82366 7.03795L2.80804 8.50238C2.57293 8.6732 2.25659 8.44336 2.34639 8.16697L3.11629 5.79746C3.15645 5.67386 3.11245 5.53845 3.00731 5.46205L0.991687 3.99762C0.756573 3.8268 0.877406 3.45492 1.16802 3.45492H3.65947C3.78944 3.45492 3.90462 3.37123 3.94478 3.24762L4.71468 0.878115Z" fill="#343C58"/></svg>
          <svg class="star" width="10" height="9" viewBox="0 0 10 9" fill="none"><path d="M4.71468 0.878115C4.80449 0.601722 5.19551 0.601722 5.28532 0.878115L6.05522 3.24762C6.09538 3.37123 6.21057 3.45492 6.34053 3.45492H8.83198C9.12259 3.45492 9.24343 3.8268 9.00831 3.99762L6.99269 5.46205C6.88755 5.53845 6.84355 5.67386 6.88371 5.79746L7.65361 8.16697C7.74341 8.44336 7.42707 8.6732 7.19196 8.50238L5.17634 7.03795C5.07119 6.96155 4.92881 6.96155 4.82366 7.03795L2.80804 8.50238C2.57293 8.6732 2.25659 8.44336 2.34639 8.16697L3.11629 5.79746C3.15645 5.67386 3.11245 5.53845 3.00731 5.46205L0.991687 3.99762C0.756573 3.8268 0.877406 3.45492 1.16802 3.45492H3.65947C3.78944 3.45492 3.90462 3.37123 3.94478 3.24762L4.71468 0.878115Z" fill="#343C58"/></svg>
          {{difficultyText}}
        </span>
      </header>
      <div class="question-options">
        <p class="question-text" v-html="question.question"></p>
        <div v-for="option in shuffledOptions" 
        :key="option.i"
        @click="selectedOption = option.i" 
        class="question-answer"
        :class="{'selected': option.i === selectedOption}"
        v-html="option.text"></div>
      </div>
      <div class="question-send">
        <button @click="checkAnswer" :disabled="selectedOption === -1">Answer</button>
      </div>
    </div>
    <transition>
      <lightbox v-show="result.chosen" :classes="'question-sent question-' + (result.correct ? 'right' : 'wrong')">
        <svg v-if="result.correct" width="47" height="47" viewBox="0 0 47 47" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5 47C36.4787 47 47 36.4787 47 23.5C47 10.5213 36.4787 0 23.5 0C10.5213 0 0 10.5213 0 23.5C0 36.4787 10.5213 47 23.5 47Z" fill="#32CB82"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5563 23.8933C12.1299 23.3197 13.0599 23.3197 13.6334 23.8933L19.8648 30.1246L33.3661 16.6233C33.9397 16.0497 34.8697 16.0497 35.4433 16.6233C36.0169 17.1969 36.0169 18.1269 35.4433 18.7004L21.942 32.2018C20.7948 33.3489 18.9349 33.3489 17.7877 32.2018L11.5563 25.9704C10.9827 25.3968 10.9827 24.4668 11.5563 23.8933Z" fill="white"/>
        </svg>
        <svg v-if="!result.correct" width="47" height="47" viewBox="0 0 47 47" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5 47C36.4787 47 47 36.4787 47 23.5C47 10.5213 36.4787 0 23.5 0C10.5213 0 0 10.5213 0 23.5C0 36.4787 10.5213 47 23.5 47Z" fill="#FF6660"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.1963 31.7358C16.6227 32.3094 15.6927 32.3094 15.1192 31.7358C14.5456 31.1622 14.5456 30.2323 15.1192 29.6587L21.3505 23.4273L15.1192 17.1959C14.5456 16.6223 14.5456 15.6924 15.1192 15.1188C15.6927 14.5452 16.6227 14.5452 17.1963 15.1188L23.4277 21.3502L29.659 15.1188C30.2326 14.5452 31.1626 14.5452 31.7362 15.1188C32.3097 15.6924 32.3097 16.6223 31.7362 17.1959L25.5048 23.4273L31.7362 29.6587C32.3097 30.2323 32.3097 31.1622 31.7362 31.7358C31.1626 32.3094 30.2326 32.3094 29.659 31.7358L23.4277 25.5044L17.1963 31.7358Z" fill="white"/>
        </svg>
        <div v-if="result.correct" class="question-sent-message">You're right!</div>
        <div v-if="!result.correct" class="question-sent-message">You missed!</div>
        <button @click="sendAnswer">Advance<svg class="button-icon button-icon-right" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 5L19 12L12 19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></button>
      </lightbox>
    </transition>
  </div>
</template>

<script>
import Lightbox from "@/components/Lightbox"
import { mapState } from 'vuex'
const N = 2, T = 10

export default {
  components: {
    Lightbox
  },
  data () {
    return {
      selectedOption: -1,
      result: {
        chosen: false,
        correct: false
      },
      answer: {},
      nextDifficulty: '',
      sending: false
    }
  },
  computed: {
    ...mapState({
      profile: 'activeProfile',
      category: 'activeCategory',
      question: 'activeQuestion'
    }),
    questionNumber () {
      return this.profile.result.hasOwnProperty(this.category.id) ? this.profile.result[this.category.id].length + 1 : 1
    },
    difficultyText () {
      return this.question.difficulty.slice(0,1).toUpperCase() + this.question.difficulty.slice(1)
    },
    difficultyClass () {
      return 'question-difficulty-' + this.question.difficulty
    },
    shuffledOptions () {
      var answers = [this.question.correct_answer, ...this.question.incorrect_answers]
      var shuffled = []
      var i = 0
      while (answers.length) {
        if (Math.random() >= 0.5) {
          shuffled.push({i: i, text: answers.pop()})
        } else {
          shuffled.push({i: i, text: answers.shift()})
        }
        i++
      }
      return shuffled
    }
  },
  methods: {
    checkAnswer () {
      this.result.correct = this.question.correct_answer == this.shuffledOptions[this.selectedOption].text
      this.answer = {
        question: this.question.question,
        difficulty: this.question.difficulty,
        answer: this.shuffledOptions[this.selectedOption].text,
        correct: this.result.correct
      }
      if (!this.result.correct) {
        this.answer.correctAnswer = this.question.correct_answer
      }

      this.nextDifficulty = this.question.difficulty

      if (this.profile.result.hasOwnProperty(this.category.id) && this.profile.result[this.category.id].length > 0) {
        var testDiff = [...this.profile.result[this.category.id].slice(-(N-1)), this.answer] // last N questions (including the one being sent)
        if (testDiff.every(q => q.difficulty === this.question.difficulty && q.correct)) { // UP
          switch (this.question.difficulty) {
            case 'easy':
              this.nextDifficulty = 'medium'
              break
            case 'medium':
              this.nextDifficulty = 'hard'
              break
            default:
              break
          }
        } else if (testDiff.every(q => q.difficulty === this.question.difficulty && !q.correct)) { // DOWN
          switch (this.question.difficulty) {
            case 'medium':
              this.nextDifficulty = 'easy'
              break
            case 'hard':
              this.nextDifficulty = 'medium'
              break
            default:
              break
          }
        }
      }

      this.result.chosen = true
    },
    sendAnswer () {
      if (!this.sending) {
        this.sending = true
        this.$store.dispatch('sendAnswer', this.answer).then(() => {
          if (this.profile.result[this.category.id].length < T) {
            this.$store.dispatch('loadQuestion', this.nextDifficulty).then(() => {
              this.selectedOption = -1
              this.result.chosen = false
              this.sending = false
            })
          } else {
            this.$emit('goto', 'result')
          }
        })
      }
    }
  }
}
</script>
