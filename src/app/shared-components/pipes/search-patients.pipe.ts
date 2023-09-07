import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPatients'
})
export class SearchPatientsPipe implements PipeTransform {

  transform(value: any, arg: any, filter:string): any {
    const resultRegister = [];
    let i = 0;
    for (const temp of value) {
      if (String(temp['patient'][filter]).toLowerCase().indexOf(String(arg).toLocaleLowerCase()) > -1) {
        resultRegister.push(temp);
      }
      i++;
    };
    return resultRegister;
  }
}