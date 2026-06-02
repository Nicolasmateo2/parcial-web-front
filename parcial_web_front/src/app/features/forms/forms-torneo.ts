import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

export interface Torneo {
  nombre: string;
  fechaInicio: string; 
  fechaFin?: string; 
  ubicacion?: string;
  maxEquipos: number;
  tipo: 'liga' | 'eliminacion' | 'amistoso';
  reglas?: string;
  equipos?: string[];
}

export function createTorneoForm(fb: FormBuilder, initial?: Partial<Torneo>): FormGroup {
  const group = fb.group({
    nombre: [initial?.nombre || '', [Validators.required, Validators.minLength(3)]],
    fechaInicio: [initial?.fechaInicio || '', [Validators.required]],
    fechaFin: [initial?.fechaFin || ''],
    ubicacion: [initial?.ubicacion || ''],
    maxEquipos: [initial?.maxEquipos ?? 8, [Validators.required, Validators.min(2)]],
    tipo: [initial?.tipo || 'liga', [Validators.required]],
    reglas: [initial?.reglas || ''],
    equipos: fb.array((initial?.equipos || []).map(e => fb.control(e))) as FormArray,
  });

  group.get('fechaFin')?.valueChanges.subscribe(() => validateDates(group));
  group.get('fechaInicio')?.valueChanges.subscribe(() => validateDates(group));

  return group;
}

function validateDates(group: FormGroup) {
  const inicio = group.get('fechaInicio')?.value;
  const fin = group.get('fechaFin')?.value;
  if (inicio && fin) {
    const ok = new Date(fin) >= new Date(inicio);
    if (!ok) {
      group.get('fechaFin')?.setErrors({ beforeStart: true });
    } else {
      const errors = group.get('fechaFin')?.errors;
      if (errors) {
        delete errors['beforeStart'];
        if (Object.keys(errors).length === 0) group.get('fechaFin')?.setErrors(null);
        else group.get('fechaFin')?.setErrors(errors);
      }
    }
  }
}

export function addEquipo(form: FormGroup, nombreEquipo: string) {
  const arr = form.get('equipos') as FormArray;
  arr.push(new FormBuilder().control(nombreEquipo || ''));
}

export function removeEquipo(form: FormGroup, index: number) {
  const arr = form.get('equipos') as FormArray;
  if (index >= 0 && index < arr.length) arr.removeAt(index);
}
