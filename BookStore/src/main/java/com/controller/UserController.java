package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dao.UserRepository;
import com.model.User;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path="users")

public class UserController {
	@Autowired
	private UserRepository userRepository;
	
	@GetMapping("/get")
	public List<User> getUsers(){
		System.out.println("My list "+userRepository.findAll());
		return userRepository.findAll();
	}
	
	@PostMapping("/add")
	public void createUser(@RequestBody User user){
		System.out.println(user.getName());
		System.out.println(user.getPassword());
		System.out.println(user.getType());
		userRepository.save(user);
	}
	
	@DeleteMapping(path= {"/{id}"})
	public User deleteUser(@PathVariable("id") Long id) {
		User user = userRepository.getOne(id);
		userRepository.deleteById(id);
		return user;
	}
}