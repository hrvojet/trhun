import {Component, OnInit} from '@angular/core';
import {TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-cracker',
  standalone: true,
  imports: [
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cracker.component.html',
  styleUrl: './cracker.component.scss'
})
export class CrackerComponent implements OnInit {

  readonly inputForm = new FormGroup({
    textValue: new FormControl('')
  });


  ngOnInit(): void {
    this.inputForm.valueChanges.subscribe((value) => console.log(value));
  }


}
