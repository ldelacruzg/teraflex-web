export class TimeConversion {
  static convertToTime(time: number): string {
    const minutes = Math.floor(time);
    const seconds = (time - minutes) * 60;

    // si hay minutos y segundos mostrar X minutos y X segundos
    if (minutes > 0 && seconds > 0) {
      return `${minutes} minuto${minutes === 1 ? '': 's'} y ${seconds} segundos`;
    }

    // si solo hay minutos mostrar X minutos
    if (minutes > 0) {
      return `${minutes} minuto${minutes === 1 ? '': 's'}`;
    }

    // si solo hay segundos mostrar X segundos
    if (seconds > 0) {
      return `${seconds} segundos`;
    }

    // si no hay minutos ni segundos mostrar 0 minutos
    return '--';
  }

  static formatDate(date: string, withHour: boolean = true) {
    //console.log({ date, withHour });
    let dateObj = new Date(date);
    
    if (!withHour) {
      const [year, month, day] = date.split('-');
      dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    }

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    if (withHour) {
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.hour12 = true;
    }

    return dateObj.toLocaleString('es-ES', options);
  }
}