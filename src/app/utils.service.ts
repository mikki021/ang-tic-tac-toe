import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  delay(timeout: number) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
}
