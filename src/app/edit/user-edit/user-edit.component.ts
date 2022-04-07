import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number

  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(){
    
    window.scroll(0,0)

    if(environment.token == ''){
      this.router.navigate(["/entrar"])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario


    if (this.user.senha != this.confirmarSenha) {
      alert("As senhas estão diferentes...")

    } else {
      this.authService.atualizar(this.user).subscribe({
        next: (resp: User) => {
          this.user = resp
          environment.nome = ""
          environment.foto = ""
          environment.token = ""
          environment.id = 0
          this.router.navigate(["/entrar"])
          alert("Usuario atualizado com sucesso!")
        },
        error: erro => {
          if (erro.status == 400) {
            alert("Favor preencher os campos caso queira atualizar.")
          }
        },
      });
    }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User)=>{
      this.user = resp
    })
  }
}
