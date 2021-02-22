import { Component, Input } from '@angular/core';

import { TealiumClickEvent } from 'src/app/shared/tealium/models/tealium-click-event.model';
import { JoinTeamBar } from '../../models/join-team-bar.model';

@Component({
  selector: 'app-join-team-bar',
  templateUrl: './join-team-bar.component.html',
  styleUrls: ['./join-team-bar.component.scss']
})

export class JoinTeamBarComponent {
  @Input() jointeambar: JoinTeamBar;

  get tealiumClickEventSend(): TealiumClickEvent {
    return new TealiumClickEvent('customerhub-aboutus', 'explorepositions');
  }

}
