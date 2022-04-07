import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem
  listaPostagem: Postagem[]

  listaTemas: Tema[]
  tema: Tema = new Tema()
  idTema: number

  user: User = new User()
  idUser = environment.id



  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(["/entrar"])
    }
    this.auth.refreshToken()

    this.buscarTemas()
    this.getAllPostagens()
    this.findByIdUser()
  }
  

  buscarTemas(){
    this.temaService.getTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getTemaId(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp
    })
  }

  findByIdUser(){
    this.auth.getByIdUser(this.idUser).subscribe((resp: User)=>{
      this.user = resp
    })
  }



  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    
    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe({
      next: (resp: Postagem)=>{
      this.postagem = resp
      alert("Postagem realizada com sucesso meu patrão!")
      this.postagem = new Postagem()
      this.getAllPostagens()
      this.findByIdUser()
    },
    error: erro =>{
      if(erro.status == 400){
        alert("Preenche os campos primeiro né >:")
        this.postagem = new Postagem()
      }
    },
  })
  }
}
