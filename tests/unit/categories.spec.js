import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Categories from '@/components/Categories.vue'
import Vuex from 'vuex'
import store from '../../src/store.mock'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Categories Component', () => {

  it('Content', () => {
    const wrapper = shallowMount(Categories, {
      store
    })
    expect(wrapper.find('h2').text()).toEqual('Categories')
    expect(wrapper.findAll('.category').length).toEqual(0)
    store.dispatch('loadCategories')
    expect(wrapper.findAll('.category').length).toBeGreaterThan(0)
  })

  it('Interaction', async () => {
    store.dispatch('loadCategories')
    store.dispatch('selectProfile', {
      name: 'Profile',
      result: {}
    })
    const wrapper = shallowMount(Categories, {
      store
    })
    const cats = wrapper.findAll('.category')

    // if user hasn't answered any questions
    cats.at(0).trigger('click')
    await flushPromises()
    expect(wrapper.emitted().goto[0]).toEqual(['question'])

    // if user has completed category
    for (let i = 0; i < 10; i++) {
      store.dispatch('sendAnswer', {})
    }
    cats.at(0).trigger('click')
    await flushPromises()
    expect(wrapper.emitted().goto[1]).toEqual(['result'])
  })
})