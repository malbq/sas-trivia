import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Question from '@/components/Question.vue'
import Vuex from 'vuex'
import store from '../../src/store.mock'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Question Component', () => {

  it('Content', async () => {
    store.dispatch('selectCategory', {
      category: {
        id: 0,
        name: 'Category 1'
      },
      fetchQuestion: true
    })
    store.dispatch('selectProfile', {
      name: 'Profile',
      result: {}
    })
    await flushPromises()
    const wrapper = shallowMount(Question, {
      store
    })

    expect(wrapper.find('h2').text()).toEqual('Question 1')
    expect(wrapper.find('.question-category').text()).toEqual('Category 1')
    expect(wrapper.find('[class^=question-difficulty-]').classes()).toContain('question-difficulty-medium')
    expect(wrapper.findAll('.question-answer').length).toEqual(4)
  })

  it('Interaction', async () => {
    store.dispatch('selectCategory', {
      category: {
        id: 0,
        name: 'Category 1'
      },
      fetchQuestion: true
    })
    store.dispatch('selectProfile', {
      name: 'Profile',
      result: {}
    })
    await flushPromises()
    const wrapper = mount(Question, {
      store
    })

    for (let i = 0; i < 10; i++) {
      expect(wrapper.find('h2').text()).toEqual('Question ' + (i + 1))
      let answers = wrapper.findAll('.question-answer')
      let sel = Math.floor(Math.random() * answers.length)
      answers.at(sel).trigger('click')
      wrapper.find('.question-send button').trigger('click')
      if (answers.at(sel).text() === 'Correct') {
        expect(wrapper.find('.question-sent').classes()).toContain('question-right')
      } else {
        expect(wrapper.find('.question-sent').classes()).toContain('question-wrong')
      }
      wrapper.find('.question-sent button').trigger('click')
      await flushPromises()
    }
    expect(wrapper.emitted().goto[0]).toEqual(['result'])
  })
})