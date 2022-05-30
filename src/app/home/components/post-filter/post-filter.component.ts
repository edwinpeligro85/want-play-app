import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { City } from '@app/api/models';
import { LocationService } from '@app/api/services';
import { Posts, PostsState } from '@app/modules/post/state';
import { Store } from '@ngxs/store';
import { capitalCase } from 'change-case';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StateReset } from 'ngxs-reset-plugin';

@Component({
  selector: 'home-post-filter',
  templateUrl: './post-filter.component.html',
  styleUrls: ['./post-filter.component.scss'],
})
export class PostFilterComponent implements OnInit {
  @Input() city!: City;

  public form: FormGroup;

  public cities: City[] = [];
  public dropdownTypeList: { key: string; value: string }[];
  public selectedTypeItems: any[] = [];
  public dropdownCitySettings: IDropdownSettings;
  public dropdownTypeSettings: IDropdownSettings;

  constructor(private _location: LocationService, private fb: FormBuilder, private store: Store) {
    this.dropdownCitySettings = {
      idField: '_id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
    };
    this.dropdownTypeSettings = {
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      allowSearchFilter: false,
    };
    this.dropdownTypeList = [
      { key: 'want', value: 'Quiero Jugar' },
      { key: 'need', value: 'Necesito Jugador´s' },
    ];
    this.form = this.fb.group({
      type: [this.dropdownTypeList],
      city: [],
    });
  }

  ngOnInit(): void {
    this._location
      .locationControllerFindAllStateCities({ id: this.city.state._id })
      .subscribe((cities) => (this.cities = cities.map((c) => ({ ...c, name: capitalCase(c.name) }))));

    this.form.get('city')?.setValue([{ _id: this.city._id, name: capitalCase(this.city.name) }]);
  }

  onSubmit(): void {
    const form = this.form.value;
    const types: string[] = form.type.map((type: any) => type.key);
    const cities: string[] = form.city.map((type: any) => type._id);
    const filter = {
      type: { $in: types },
      city: { $in: cities },
    };

    this.store.dispatch(new StateReset(PostsState));
    this.store.dispatch(
      new Posts.FetchAll({
        sort: '-created_at',
        filter: JSON.stringify(filter),
      })
    );
  }
}
