import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Result from '@/components/Result.vue'
import Vuex from 'vuex'
import store from '../../src/store.mock'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Result Component', () => {

  it('Content', async () => {
    store.dispatch('selectCategory', {
      category: {
        id: 0,
        name: 'Category'
      },
      fetchQuestion: true
    })
    store.dispatch('selectProfile', {
      name: 'Profile',
      result: {
        0: [
          {difficulty: 'easy', correct: true},
          {difficulty: 'easy', correct: false},
          {difficulty: 'easy', correct: false},
          {difficulty: 'medium', correct: true},
          {difficulty: 'medium', correct: true},
          {difficulty: 'hard', correct: true},
          {difficulty: 'hard', correct: true},
          {difficulty: 'hard', correct: false},
          {difficulty: 'hard', correct: false},
          {difficulty: 'hard', correct: false},
        ]
      }
    })
    await flushPromises()
    const wrapper = shallowMount(Result, {
      store
    })

    expect(wrapper.find('.result-numbers-rights .result-numbers-general-value').text()).toEqual('5')
    expect(wrapper.find('.result-numbers-wrongs .result-numbers-general-value').text()).toEqual('5')
    
    expect(wrapper.find('.result-numbers-detail-set:nth-child(1) div:nth-child(2)').text()).toEqual('Right: 1')
    expect(wrapper.find('.result-numbers-detail-set:nth-child(1) div:nth-child(3)').text()).toEqual('Wrong: 2')
    expect(wrapper.find('.result-numbers-detail-set:nth-child(2) div:nth-child(2)').text()).toEqual('Right: 2')
    expect(wrapper.find('.result-numbers-detail-set:nth-child(2) div:nth-child(3)').text()).toEqual('Wrong: 0')
    expect(wrapper.find('.result-numbers-detail-set:nth-child(3) div:nth-child(2)').text()).toEqual('Right: 2')
    expect(wrapper.find('.result-numbers-detail-set:nth-child(3) div:nth-child(3)').text()).toEqual('Wrong: 3')
  })
})