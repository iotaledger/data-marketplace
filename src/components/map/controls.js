import { MapController } from 'react-map-gl';

export default class MyMapControls extends MapController {
  constructor() {
    super();
    // subscribe to additional events
    this.events = ['click'];
  }

  // override the default handler in MapControls
  handle(event) {
    if (event.type === 'wheel') {
      return false;
    }
    return super.handle(event);
  }
}
