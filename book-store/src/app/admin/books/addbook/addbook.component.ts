import { Component, OnInit, Input, Output } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  @Input()
  book: Book;

  @Output()
  bookAddEvent = new EventEmitter;
  private selectedFile;
  imgURL: any;
  constructor(private httpClientService: HttpClientService, private router :Router, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }
public onFileChanged(event){
  console.log(event);
  this.selectedFile = event.target.files[0];

  let reader=new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  reader.onload=(event2)=>{
    this.imgURL=reader.result;
  }
 }
 saveBook(){
   const uploadData = new FormData();
   uploadData.append('imageFile',this.selectedFile, this.selectedFile.name);
   this.selectedFile.imageName=this.selectedFile.name;
   this.httpClient.post('http://localhost:8080/books/upload',uploadData,{observe: 'response'})
   .subscribe((response)=>{
     if(response.status===200){
       this.httpClientService.addBook(this.book).subscribe((book)=>{
         this.bookAddEvent.emit();
         this.router.navigate(['admin','books']);
       });
       console.log("image uploaded succesfully");
     }
     else{
       console.log("image upload failed");
     }
   });
 }
}
