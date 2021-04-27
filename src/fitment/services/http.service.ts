import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getVehicles(url: string) {
    return this.http.get(url);
  }
  getVehiclesByMultipleParams(url: string, obj: any) {
    let params: string = "";
    Object.keys(obj).forEach((key,index) => {
       if(index === 0) params+=`${key}=${obj[key]}`;
       else params = `&${key}=${obj[key]}`;
    })
    return this.http.get(url + "?" + params);
  }
}
