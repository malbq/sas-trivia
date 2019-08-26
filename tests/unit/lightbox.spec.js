import { shallowMount } from '@vue/test-utils'
import Lightbox from '@/components/Lightbox.vue'

describe('Lightbox Component', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Lightbox, {
      propsData: {
        classes: 'class-name'
      }
    })
    expect(wrapper.find('.lightbox-content').classes('class-name')).toBe(true)
  })
})
