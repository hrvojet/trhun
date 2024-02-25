import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule, TuiTabsModule } from '@taiga-ui/kit';

import { CrackerInputComponent } from './cracker-input/cracker-input.component';
import { LockStatus } from './enum/lock-status';
import { Raa } from './model/raa';

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
		CrackerInputComponent,
		TuiButtonModule,
		NgIf,
		NgClass,
	],
	templateUrl: './cracker.component.html',
	styleUrl: './cracker.component.scss',
})
export class CrackerComponent implements OnInit {
	public LOCKSTATUS = LockStatus;
	readonly unlocked = 'tuiIconUnlockLarge';
	readonly locked = 'tuiIconLockLarge';

	riddlesAndAnswers: Raa[] = [
		{ id: 0, riddle: 'Who am I?', answer: 'yes', icon: LockStatus.LOCKED, disabled: false },
		{ id: 1, riddle: 'What am I?', answer: 'de', icon: LockStatus.LOCKED, disabled: true },
		{ id: 2, riddle: 'Where am I?', answer: 'rr', icon: LockStatus.LOCKED, disabled: true },
	];
	currentRAA = this.riddlesAndAnswers[0];

	revealCryptexAnswer: boolean = false;

	readonly inputForm = new FormGroup({
		textValue: new FormControl(''),
	});

	ngOnInit(): void {
		this.inputForm.valueChanges.subscribe((value) => console.log(value));
	}

	sendToChild(rAndA: Raa) {
		this.currentRAA = rAndA;
	}

	receiveData($event: Raa) {
		console.log('### IN PARENT');
		console.log($event);
		this.riddlesAndAnswers[$event.id].icon = LockStatus.UNLOCKED;
		if ($event.id + 1 < this.riddlesAndAnswers.length) {
			console.log('updating next');
			this.riddlesAndAnswers[$event.id + 1].disabled = false;
			this.currentRAA = this.riddlesAndAnswers[$event.id + 1];
		} else {
			console.log('winner!');
			this.revealCryptexAnswer = true;
		}

		// TODO update here
		// TODO save to storage here?
		console.log('### IN PARENT');
	}
}
