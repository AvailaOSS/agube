import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss', '../manager-page.component.scss'],
})
export class TagsComponent implements OnInit {
  public loadSave: boolean = false;
  public parametersForm: FormGroup;
  public tags = new FormControl();
  public autocomplete: any[] = [];
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]> = new Observable();
  constructor(private formBuilder: FormBuilder) {
    this.parametersForm = this.formBuilder.group({
      tags: this.tags,
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.tags.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  saveParameters() {
    this.loadSave = true;
    let config = {
      hook_price: this.tags.value,
    };
  }
}
