import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Torneo, createTorneoForm, addEquipo, removeEquipo } from './forms-torneo';

@Component({
  selector: 'app-forms-torneo',
  templateUrl: './forms-torneo.html',
  styleUrls: ['./forms-torneo.css']
})
export class FormsTorneoComponent {
  torneoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.torneoForm = createTorneoForm(fb);
    // ensure equipos FormArray exists
    if (!this.torneoForm.get('equipos')) {
      this.torneoForm.addControl('equipos', this.fb.array([]));
    }
  }

  get equipos() {
    return this.torneoForm.get('equipos') as FormArray;
  }

  addEquipo(nombre: string) {
    addEquipo(this.torneoForm, nombre);
  }

  removeEquipo(index: number) {
    removeEquipo(this.torneoForm, index);
  }

  onSubmit() {
    if (this.torneoForm.valid) {
      console.log('Torneo submitted:', this.torneoForm.value);
      // Optionally reset form
    }
  }
}