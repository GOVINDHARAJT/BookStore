import { Component, OnInit, Input, Output } from '@angular/core';
import {User} from 'src/app/model/User';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router,OutletContext } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {

  @Input()
  user : User

  
  @Output()
  userAddedEvent = new EventEmitter();

  newUser: User;
  constructor(private httpClientService: HttpClientService,private router:Router) { }

  ngOnInit(){
    this.newUser = this.user;
  }


  addUser(){
    this.httpClientService.addUser(this.newUser).subscribe((user) => {
      this.userAddedEvent.emit(null);
      this.router.navigate(['admin','users']);}
    );
  }

}