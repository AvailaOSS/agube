import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { FullAddress } from '@availa/agube-rest-api';

function callback(results: any, status: any) {
  console.log(results, status);
}

@Component({
  selector: 'app-street-view-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() public id: number | undefined;
  @Input() public address: FullAddress | undefined;

  @ViewChild(GoogleMap) map!: GoogleMap;

  constructor() {}

  ngOnInit(): void {
    var request = {
      query: 'Museum of Contemporary Art Australia',
      fields: [
        'photos',
        'formatted_address',
        'name',
        'rating',
        'opening_hours',
        'geometry',
      ],
    };

    let svcPlaces = new google.maps.places.PlacesService(this.map.googleMap!);
    svcPlaces.findPlaceFromQuery(request, callback);
  }
}
