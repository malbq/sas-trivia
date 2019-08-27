import {
  mount,
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Profiles from '@/components/Profiles.vue'
import Vuex from 'vuex'
import store from '../../src/store.mock'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Profiles Component', () => {

  it('Content', () => {
    const wrapper = shallowMount(Profiles, {
      store
    })
    expect(wrapper.find('h2').text()).toEqual('Who are you?')
    const pnew = wrapper.findAll('.profile')
    expect(pnew.length).toEqual(1)
    expect(pnew.at(0).classes()).toContain('profile-new')
    store.dispatch('loadProfiles')
    expect(wrapper.findAll('.profile').length).toBeGreaterThan(1)
  })

  it('Interaction', async () => {
    store.dispatch('loadProfiles')
    await flushPromises()
    const wrapper = mount(Profiles, {
      store
    })
    
    wrapper.find('.profile-new').trigger('click')
    expect(wrapper.vm.createNewProfile).toEqual(true)
    const formBox = wrapper.find('.profiles-new-form')
    formBox.find('input').setValue('Name')
    formBox.find('form').trigger('submit')
    await flushPromises()
    expect(wrapper.vm.createNewProfile).toEqual(false)

    const pfls = wrapper.findAll('.profile')
    pfls.at(0).trigger('click')
    await flushPromises()
    expect(wrapper.emitted().goto[0]).toEqual(['categories'])
  })
})