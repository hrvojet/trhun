import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Output,
	SimpleChanges,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';

import { LockStatus } from '../enum/lock-status';
import { Raa } from '../model/raa';

@Component({
	selector: 'app-cracker-input',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		TuiInputModule,
		TuiInputPasswordModule,
		TuiTextfieldControllerModule,
		TuiButtonModule,
		NgClass,
	],
	templateUrl: './cracker-input.component.html',
	styleUrl: './cracker-input.component.scss',
})
export class CrackerInputComponent implements OnInit, OnChanges, OnDestroy {
	public LOCKSTATUS = LockStatus;
	@Input() incomingRaa!: Raa;
	@Output() rAAEmitter: EventEmitter<Raa> = new EventEmitter();

	isWrongError: boolean = false;

	obs$: Subscription | undefined;

	readonly textValue = new FormControl('');

	constructor(private cdr: ChangeDetectorRef) {}

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
			if (this.incomingRaa.id === 2) {
				console.log('child FINAL!');
			}
		} else {
			this.isWrongError = true;
			setTimeout(() => (this.isWrongError = false), 350);
		}
	}
}
