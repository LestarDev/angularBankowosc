import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [],
  templateUrl: './input-login.component.html',
  styleUrl: './input-login.component.css'
})
export class InputLoginComponent {
  @Input() data: string = "";

  dataID: string = this.data.split('.')[-1];
}
