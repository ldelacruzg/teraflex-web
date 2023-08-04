import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchRegisters'
})
export class SearchRegistersPipe implements PipeTransform {

  transform(value: any, arg: any, filter:string): any {
    const resultRegistro = [];
    let i = 0;
    for (const temp of value) {
      if (temp[filter].indexOf(arg) > -1) {
        resultRegistro.push(temp);
      }
      i++;
    };
    return resultRegistro;
  }
}