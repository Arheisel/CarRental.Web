import Swal, { SweetAlertResult } from "sweetalert2";

export default class Popup {

  public static html(html: string, title?: string) : Promise<SweetAlertResult<void>>{
    return Swal.fire({
      title: title,
      html: html,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0081c9',
      width: 'auto'
    });
  }

  public static success(message?: string, title: string = 'Success!', autoClose = true) : Promise<SweetAlertResult<void>> {
    return Swal.fire({
      title: title,
      html: message,
      icon: 'success',
      confirmButtonColor: '#0081c9',
      timer: autoClose ? 2000 : undefined
    });
  }

  public static error(message: string, title?: string, footer?: string) : Promise<SweetAlertResult<void>>{
    return Swal.fire({
      title: title,
      html: message,
      footer: footer,
      icon: 'error',
      confirmButtonColor: '#0081c9',
    });
  }

  public static info(message: string, title?: string) : Promise<SweetAlertResult<void>>{
    return Swal.fire({
      title: title,
      html: message,
      icon: 'info',
      confirmButtonColor: '#0081c9',
    });
  }

  public static warning(message: string, title?: string, confirmButtonText = 'Continue', cancelButtonText = 'Cancel') : Promise<SweetAlertResult<void>>{
    return Swal.fire({
      title: title,
      html: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonColor: '#db2912',
    });
  }

  public static question(message: string, title?: string, confirmButtonText = 'Yes', cancelButtonText = 'No') : Promise<SweetAlertResult<void>>{
    return Swal.fire({
      title: title,
      html: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonColor: '#0081c9',
    });
  }

}
