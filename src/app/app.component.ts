import {
  TuiRootModule,
  TuiDialogModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiBrightness,
  TuiNightThemeService,
  TuiPrimitiveTextfieldModule
} from "@taiga-ui/core";
import {Component, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from "rxjs";
import {TuiLetModule} from "@taiga-ui/cdk";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiThemeNightModule, TuiModeModule, TuiLetModule, AsyncPipe, NgIf, TuiPrimitiveTextfieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trhun';


  constructor(@Inject(TuiNightThemeService) readonly night$: Observable<boolean>) {}

  /*get mode(): TuiBrightness | null {
    return this.night. ? 'onDark' : null;
  }*/
}
