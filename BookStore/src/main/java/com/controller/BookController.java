package com.controller;
import java.io.IOException;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dao.BookRepository;
import com.model.Book;

@RestController
@CrossOrigin(origins="http:localhost/4200")
@RequestMapping(path="books")
public class BookController {
	@Autowired
	private BookRepository bookRepository;
	private byte[] bytes;
	
	@GetMapping("/get")
	public List<Book> getBooks(){
		return bookRepository.findAll();
		}
	@PostMapping("/upload")
	public void uploadImage(@RequestParam("imagefile") MultipartFile file) throws IOException {
		this.bytes = file.getBytes();
	}
	@PostMapping("/add")
	public void createBook(@RequestBody Book book) {
		book.setPicByte(this.bytes);
		bookRepository.save(book);
		this.bytes=null;
	}
}
