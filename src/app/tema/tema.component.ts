import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[]
 
  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(["/entrar"])
    }

    this.buscarTemas()
  }

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  cadastrarTema(){
    this.temaService.postTema(this.tema).subscribe({
      next: (resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess("Tema cadastrado!")
      this.tema = new Tema()
      this.buscarTemas()
    },
    error: erro =>{
      if(erro.status == 400){
        this.alertas.showAlertWarning("Preencha o campo de tema")
      }
    },
  });
  }


}
