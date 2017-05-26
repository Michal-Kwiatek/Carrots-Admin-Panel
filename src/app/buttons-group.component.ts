import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'buttons-group',
  template: `
    <div *ngFor="let buttonsRow of buttons">
      <button *ngFor="let value of buttonsRow"
      (click)="clicked(value)" >{{ value }}</button>
    </div>
  `,
  styles: [`
    button {
      margin: 3px;
    }
  `]
})
export class ButtonsGroupComponent {

  @Input() buttons;   /// BUTTONS SETUP
  @Output() buttonClicked: EventEmitter<number> = new EventEmitter();

  constructor() { }
  
  clicked(value) {
    this.buttonClicked.emit( parseInt(value) )
  }

}
