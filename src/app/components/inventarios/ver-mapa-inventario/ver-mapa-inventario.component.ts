import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MapasService } from 'src/app/services/mapas.service';

declare var google: any;

@Component({
  selector: 'app-ver-mapa-inventario',
  templateUrl: './ver-mapa-inventario.component.html',
  styleUrls: ['./ver-mapa-inventario.component.scss'],
})
export class VerMapaInventarioComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  isLoading: boolean = true;

  constructor(private mapasService: MapasService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    const mexico = { lat: 23.6345, lng: -102.5528 };
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: mexico,
      zoom: 5,
    });

    this.mapasService.getMapasCoordenadas().subscribe((mapas: any[]) => {
      mapas.forEach((mapa) => {
        if (mapa.coordLat && mapa.coordLng) {
          const marker = new google.maps.Marker({
            position: {
              lat: Number(mapa.coordLat),
              lng: Number(mapa.coordLng),
            },
            map: this.map,
            title: mapa.nombreMapa,
          });

          const contentString = `
  <div style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
    min-width: 250px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: white;
  ">
    <div style="
      background: #c50610;
      padding: 16px 20px;
      margin: 0;
    ">
      <h2 style="
        color: #ecf0f1;
        margin: 0;
        font-size: 1.4em;
        font-weight: 600;
        letter-spacing: -0.5px;
      ">${mapa.nombreMapa}</h2>
    </div>
    <div style="padding: 20px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <span style="
          font-weight: 600;
          color: #34495e;
          font-size: 0.9em;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        ">Coordenadas:</span>
        <span style="
          color: #7f8c8d;
          font-family: 'Monaco', 'Consolas', monospace;
          font-size: 0.95em;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        ">${mapa.coordLat}, ${mapa.coordLng}</span>
      </div>
    </div>
  </div>
`;

          const infowindow = new google.maps.InfoWindow({
            content: contentString,
            ariaLabel: mapa.nombreMapa,
          });

          marker.addListener('click', () => {
            infowindow.open({
              anchor: marker,
              map: this.map,
            });
          });
        }
      });
      this.isLoading = false;
    });
  }
}
