import { Component } from '@angular/core';
import { WeatherForecastsClient, WeatherForecast } from '../web-api-client';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: WeatherForecast[] = [];

  public filters = {
    weather: "",
    temperature: "",
  };

  constructor(private client: WeatherForecastsClient) {
    this.refresh();
  }

  public filterChanged() {
    this.refresh();
  }

  private refresh() {
    this.validateTemperature();
    this.client.getWeatherForecasts(this.filters.weather, this.filters.temperature).subscribe({
      next: result => this.forecasts = result,
      error: error => console.error(error)
    });
  }

  private validateTemperature(){
    if(this.filters.temperature){
      //Accept negative and positive numbers in a comma separated list
      const regex = /((-\d+|\d+)(,(-\d+|\d+))+)|(-\d+|\d+)/g;
      const valid = this.filters.temperature.match(regex);

      if(!valid){
        this.filters.temperature = "";
      }
    }
  }
}
