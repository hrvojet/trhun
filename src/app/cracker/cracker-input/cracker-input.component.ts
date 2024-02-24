import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges
} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {TuiButtonModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {environment} from "../../../environments/environment";
import {Observable, Subscription} from "rxjs";
import {Raa} from "../model/raa";
import {LockStatus} from "../enum/lock-status";

@Component({
  selector: 'app-cracker-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiButtonModule
  ],
  templateUrl: './cracker-input.component.html',
  styleUrl: './cracker-input.component.scss'
})
export class CrackerInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() incomingRaa!: Raa;
  @Output() rAAEmitter: EventEmitter<Raa> = new EventEmitter();

  obs$: Subscription | undefined;

  readonly textValue = new FormControl('');

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    //this.obs$ = this.textValue.valueChanges.subscribe((value) => console.log(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log(environment.test + this.incomingRaa);
    //console.log(changes);
    if (this.incomingRaa.icon == LockStatus.UNLOCKED) {
      this.textValue.setValue(this.incomingRaa.answer);
    } else {
      this.textValue.reset();
    }
  }

  ngOnDestroy() {
    if (this.obs$) {
      this.obs$.unsubscribe();
    }
  }

  submitAnswer() {
    if (this.textValue.value === this.incomingRaa.answer) {
      this.rAAEmitter.emit(this.incomingRaa);
      this.cdr.detectChanges();
    }
  }


}
