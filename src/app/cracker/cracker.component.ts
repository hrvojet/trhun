import {Component, OnInit} from '@angular/core';
import {TuiInputModule, TuiInputNumberModule, TuiTabsModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {CrackerInputComponent} from "./cracker-input/cracker-input.component";

@Component({
  selector: 'app-cracker',
  standalone: true,
  imports: [
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiTabsModule,
    TuiSvgModule,
    TuiInputNumberModule,
    CrackerInputComponent
  ],
  templateUrl: './cracker.component.html',
  styleUrl: './cracker.component.scss'
})
export class CrackerComponent implements OnInit {

  activeItemIndex = 0;

  readonly inputForm = new FormGroup({
    textValue: new FormControl('')
  });


  ngOnInit(): void {
    this.inputForm.valueChanges.subscribe((value) => console.log(value));
  }

}
