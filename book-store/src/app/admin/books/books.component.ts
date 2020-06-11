import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  books: Array<Book>
  action: string;
  selectedBook: Book;
  constructor(private httpClientService: HttpClientService, private router :Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(){
    this.refreshData();
  }
  refreshData(){ 
    this.httpClientService.getBooks().subscribe(
      Response => this.handleSuccessfulResponse(Response) 
    );
    this.activatedRoute.queryParams.subscribe(
      (params) =>{
        this.action=params['action'];
      }
    )
  }
    handleSuccessfulResponse(response){
    this.books = response;   
    }

    addBook(){
      this.selectedBook=new Book();
      this.router.navigate(['admin','books'],{queryParams:{action:'add'}});
    }

}
