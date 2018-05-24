import { experimental } from 'react-map-gl'

export default class MyMapControls extends experimental.MapControls {
  constructor() {
    super()
    // subscribe to additional events
    this.events = ['click']
  }

  // override the default handler in MapControls
  handle(event) {
    console.log(event)
    if (event.type === 'wheel') {
      return false
    }
    return super.handle(event)
  }
}
