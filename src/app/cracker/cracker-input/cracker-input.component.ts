import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
  selector: 'app-cracker-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './cracker-input.component.html',
  styleUrl: './cracker-input.component.scss'
})
export class CrackerInputComponent implements OnInit {
  @Input() data: number | undefined;

  readonly inputForm = new FormGroup({
    textValue: new FormControl('')
  });

  ngOnInit(): void {
    this.inputForm.valueChanges.subscribe((value) => console.log(value));
  }



}
