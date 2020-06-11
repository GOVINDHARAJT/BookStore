import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from 'src/app/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

@Input()
user: User;

@Output()
userDeletedEvent = new EventEmitter();
  constructor(private httpClientService: HttpClientService, private router :Router) { }

  ngOnInit(): void {
  }
  deleteUser(){
    this.httpClientService.deleteUser(this.user.id).subscribe(
      (user)=>{
        this.userDeletedEvent.emit();
        this.router.navigate(['admin','users']);
    }
    );
  }

}
