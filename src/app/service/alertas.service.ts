import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertaComponent } from '../alerta/alerta.component';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private bsModalService: BsModalService
  ) { }

    private showAlert(message: string, type: string){
      const bsModalRef: BsModalRef = this.bsModalService.show(AlertaComponent)
      bsModalRef.content.type = type
      bsModalRef.content.message = message
    }

    showAlertDanger(message: string){
      this.showAlert(message, "danger")
    }

    showAlertSuccess(message: string){
      this.showAlert(message, "success")
    }

    showAlertInfo(message: string){
      this.showAlert(message, "info")
    }

    showAlertLight(message: string){
      this.showAlert(message, "light")
    }

    showAlertDark(message: string){
      this.showAlert(message, "dark")
    }

    showAlertWarning(message: string){
      this.showAlert(message, "warning")
    }

    showAlertPrimary(message: string){
      this.showAlert(message, "primary")
    }

    showAlertSecondary(message: string){
      this.showAlert(message, "secondary")
    }

    










}
