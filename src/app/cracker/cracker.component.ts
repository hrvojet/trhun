import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule, TuiTabsModule } from '@taiga-ui/kit';

import { CrackerInputComponent } from './cracker-input/cracker-input.component';
import { LockStatus } from './enum/lock-status';
import { Raa } from './model/raa';
import { divovi, grad, hvala, prijatelji, zgrade, zrak } from './model/RiddleText';

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
		{ id: 0, riddle: zrak, answer: 'loud Benton', icon: LockStatus.LOCKED, disabled: false },
		{ id: 1, riddle: prijatelji, answer: 'mtiahsfkhm', icon: LockStatus.LOCKED, disabled: true },
		{ id: 2, riddle: hvala, answer: 'Angelica Humpback', icon: LockStatus.LOCKED, disabled: true },
		{ id: 3, riddle: divovi, answer: 'thrashed', icon: LockStatus.LOCKED, disabled: true },
		{ id: 4, riddle: grad, answer: 'portugal', icon: LockStatus.LOCKED, disabled: true },
		{ id: 5, riddle: zgrade, answer: 'bed users', icon: LockStatus.LOCKED, disabled: true },
	];
	currentRAA = this.riddlesAndAnswers[0];

	revealCryptexAnswerButton: boolean = false; // TODO false
	showCryptexAnswer: boolean = false;

	readonly inputForm = new FormGroup({
		textValue: new FormControl(''),
	});

	ngOnInit(): void {
		//this.inputForm.valueChanges.subscribe((value) => console.log(value));
	}

	sendToChild(rAndA: Raa) {
		this.currentRAA = rAndA;
	}

	showAnswer() {
		this.showCryptexAnswer = true;
	}

	receiveData($event: Raa) {
		this.riddlesAndAnswers[$event.id].icon = LockStatus.UNLOCKED;
		if ($event.id + 1 < this.riddlesAndAnswers.length) {
			this.riddlesAndAnswers[$event.id + 1].disabled = false;
			this.currentRAA = this.riddlesAndAnswers[$event.id + 1];
		} else {
			this.revealCryptexAnswerButton = true;
		}

		// TODO update here
		// TODO save to storage here?
	}
}
