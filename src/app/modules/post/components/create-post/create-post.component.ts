import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '@app/auth/state';
import { UntilDestroy, untilDestroyed } from '@shared';
import { Store } from '@ngxs/store';
import { Posts } from '../../state';

@UntilDestroy()
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

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const profile = this.store.selectSnapshot(AuthState.user).profile;

    this.store
      .dispatch(new Posts.Add({ city: profile.city?._id, ...this.form.value }))
      .pipe(untilDestroyed(this))
      .subscribe(() => this.form.setValue({ type: 'want', body: '' }));
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
