import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  public form!: FormGroup;

  get typeControl(): AbstractControl {
    return this.form.controls['type'];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    console.log(this.form.value);
  }

  setType(type: string): void {
    this.typeControl.setValue(type);
  }

  private createForm(): void {
    this.form = this.fb.group({
      type: ['want'],
      body: ['', [Validators.required, Validators.maxLength(500)]],
    });
  }
}
